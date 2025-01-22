import {
  BadRequestException,
  NotFoundException,
  Injectable,
  
} from '@nestjs/common';
import { EventDto, UpdateEventDto } from './dto/event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { In, Repository } from 'typeorm';
import { Account } from '../account/entities/account.entity';
import { util } from 'src/util/util';
import { Address } from '../address/entities/address.entity';

@Injectable()
export class EventService {

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ){
  }

  async create(req: any, createEventDto: EventDto): Promise<Event> {
    const {
      date,
      zipCode,
      streetName,
      houseNumber,
      city,
      photo,
      ...eventDetails
    } = createEventDto;
  
    // Ensure the date is in the future
    if (new Date(date) < new Date()) {
      throw new BadRequestException('Date cannot be in the past');
    }
  
    let photoBuffer = null;
  
    // Process photo if provided
    if (photo) {
      try {
        const base64Data = photo.replace(/^data:image\/\w+;base64,/, '');
        photoBuffer = Buffer.from(base64Data, 'base64');
      } catch (error) {
        throw new BadRequestException('Invalid photo format');
      }
    }
  
    const userId = req.user.account_id;
  
    // Check if the address exists
    let savedAddress: Address;
    try {
      const addressCheck = await this.addressRepo.findOne({
        where: { zipCode, streetName, houseNumber: Number(houseNumber), city },
      });
  
      if (addressCheck) {
        savedAddress = addressCheck;
      } else {
        const address = new Address();
        address.zipCode = zipCode;
        address.streetName = streetName;
        address.houseNumber = Number(houseNumber);
        address.city = city;
  
        savedAddress = await this.addressRepo.save(address);
      }
    } catch (error) {
      throw new BadRequestException('Failed to handle the address');
    }
  
    // Create and save the event
    const event = new Event();
    event.date = date;
    event.address = savedAddress;
  
    const organisator = await this.accountRepository.findOne({ where: { id: userId } });
    if (!organisator) {
      throw new NotFoundException('Organisator not found');
    }
    event.organisator = organisator;
  
    // Assign additional details to the event
    Object.assign(event, eventDetails);
    if (photoBuffer) {
      event.photo = photoBuffer; // Assuming the `photo` field in Event entity can handle binary data
    }
  
    try {
      const savedEvent = await this.eventRepository.save(event);
      return savedEvent;
    } catch (error) {
      throw new BadRequestException('Failed to create the event');
    }
  }
  
  

  async findAll(): Promise<Event[]> {

    const events = await this.eventRepository.find({
      relations: ['participants', 'organisator', 'address'],
    });

    if (events.length === 0) {
      return [];
    }
    const transformedEvents = util.transformPhotos(events);

    return transformedEvents;
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['organisator', 'participants', 'address'],
    });


    if (!event) {
      throw new NotFoundException('Event does not exist');
    }

    const transformedEvent = util.transformPhotos(event);
    return transformedEvent;
  }

  async findParticipants(id: number) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['participants', 'organisator'],
    });
    const transformedEvent = util.transformPhotos(event);
    return { ...transformedEvent, organisator: event.organisator.id };
  }

  async joinEvent(userId: number, eventId: number) {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['participants'],
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const isAlreadyParticipant = event.participants.some(
      (participant) => participant.id === userId,
    );
    if (isAlreadyParticipant) {
      throw new BadRequestException('User is already a participant');
    }

    const user = await this.accountRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    event.participants.push(user);
    await this.eventRepository.save(event);

    return { message: 'Successfully joined the event', event };
}

async getTimeline(userId: number) {
  console.log('userId', userId);

  const user = await this.accountRepository.findOne({ where: { id: userId } });
  if (!user) {
      throw new NotFoundException('User not found');
  }

  const organizedEvents = await this.eventRepository.find({
    where: { organisator: { id: userId } },
    relations: ['organisator', 'participants', 'address'],
  });

  const participatedEvents = await this.eventRepository
    .createQueryBuilder('event')
    .leftJoinAndSelect('event.participants', 'participant')
    .leftJoinAndSelect('event.organisator', 'organisator')
    .leftJoinAndSelect('event.address', 'address')
    .where('participant.id = :userId', { userId })
    .getMany();
    const allParticipants = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.participants', 'participant')
      .leftJoinAndSelect('event.organisator', 'organisator')
      .leftJoinAndSelect('event.address', 'address')
      .getMany();

    const participatedEventsWithAllParticipants = participatedEvents.map(event => {
      const fullEvent = allParticipants.find(e => e.id === event.id);
      return fullEvent ? { ...event, participants: fullEvent.participants } : event;
    });

  const allEvents = [...organizedEvents, ...participatedEventsWithAllParticipants];
  
  const uniqueEvents = Array.from(
      new Map(allEvents.map((event) => [event.id, event])).values()
  );

  const transformedEvents = util.transformPhotos(uniqueEvents)

  return transformedEvents.map((event) => ({
      ...event,
      participants: event.participants?.map((participant) => ({
        _id: participant.id,
        firstName: participant.firstName,
        lastName: participant.lastName,
        emailAddress: participant.emailAddress,
        profileImgUrl: participant.profileImgUrl,
        dateOfBirth: participant.dateOfBirth,
        gender: participant.gender,
        phoneNumber: participant.phoneNumber,
        biography: participant.biography,
        organisationName: participant.organisationName,
        chamberOfCommerce: participant.chamberOfCommerce,
        website: participant.website,
        address: participant.address,
      })),
  }));
}


  async getSwipe(userId: number) {
    const user = await this.accountRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new NotFoundException('User not found');
  }

  const allEvents = await this.eventRepository
    .createQueryBuilder('event')
    .leftJoinAndSelect('event.participants', 'participant')
    .leftJoinAndSelect('event.organisator', 'organisator')
    .leftJoinAndSelect('event.address', 'address')
    .where('participant.id IS NULL OR participant.id != :userId', { userId })
    .andWhere('organisator.id != :userId', { userId })
    .getMany();

  const allParticipants = await this.eventRepository
    .createQueryBuilder('event')
    .leftJoinAndSelect('event.participants', 'participant')
    .leftJoinAndSelect('event.organisator', 'organisator')
    .leftJoinAndSelect('event.address', 'address')
    .getMany();

    const allEventsWithParticipants = allEvents.map(event => {
      const fullEvent = allParticipants.find(e => e.id === event.id);
      return fullEvent ? { ...event, participants: fullEvent.participants } : event;
    });

    const swipeableEvents = allEventsWithParticipants.filter((event) => {
      const isOrganizer = event.organisator?.id === userId;
      const isParticipant = event.participants?.some((participant) => participant.id === userId);
      return !isOrganizer && !isParticipant;
    });
    const transformedEvents = util.transformPhotos(swipeableEvents);

      return transformedEvents.map((event) => ({
        ...event,
        participants: event.participants?.map((participant) => ({
          _id: participant.id,
          firstName: participant.firstName,
          lastName: participant.lastName,
          emailAddress: participant.emailAddress,
          profileImgUrl: participant.profileImgUrl,
          dateOfBirth: participant.dateOfBirth,
          gender: participant.gender,
          phoneNumber: participant.phoneNumber,
          biography: participant.biography,
          organisationName: participant.organisationName,
          chamberOfCommerce: participant.chamberOfCommerce,
          website: participant.website,
          address: participant.address,
        })),
    }));
  }
}