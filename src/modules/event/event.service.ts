import {
  BadRequestException,
  NotFoundException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { EventDto, UpdateEventDto } from './dto/event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { Account } from '../account/entities/account.entity';
import { util } from 'src/util/util';

@Injectable()
export class EventService {
  private readonly logger: Logger = new Logger(EventService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {
    this.logger.debug(this.eventRepository.metadata);
  }

  async create(req: any, createEventDto: EventDto) {
    const userId = req.user.account_id;
    const { date } = createEventDto;

    if (new Date(date) < new Date()) {
      throw new BadRequestException('Date cannot be in the past');
    }
    let photoBuffer = null;
    if (createEventDto.photo) {
      const base64Data = createEventDto.photo.replace(/^data:image\/jpeg;base64,/, '');
       photoBuffer = Buffer.from(base64Data, 'base64');
    }
  
    const newEvent = { ...createEventDto, photo: photoBuffer, organisator: userId };
    const savedEvent = await this.eventRepository.save(newEvent);
    return savedEvent;
  }

  async findAll(): Promise<Event[]> {
    this.logger.debug('Finding all events');

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
    this.logger.debug(`Finding event with id ${id}`);
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

  async update(req: any, id: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['organisator'],
    });

    if (!event) {
      throw new BadRequestException('Event not found');
    }

    if (new Date(updateEventDto.date) < new Date()) {
      throw new BadRequestException('Date cannot be in the past');
    }

    if (event.id !== id) {
      throw new NotFoundException('Event does not exist');
    }

    if (event.organisator.id !== req.user.account_id) {
      throw new BadRequestException('You are not allowed to update this event');
    }

    const updatedEvent = { ...event, ...updateEventDto };

    return await this.eventRepository.save(updatedEvent);
  }

  async remove(req: any, id: number) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['organisator'],
    });

    if (event.id !== id) {
      throw new NotFoundException('Event does not exist');
    }

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.organisator.id !== req.user.account_id) {
      throw new BadRequestException('You are not allowed to delete this event');
    }

    const response = await this.eventRepository.delete(id);

    return { deleted: response.affected };
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

  return uniqueEvents.map((event) => ({
      ...event,
      participants: event.participants?.map((participant) => ({
        _id: participant.id,
        firstName: participant.firstName,
        lastName: participant.lastName,
        emailAddress: participant.emailAddress,
        profileImgUrl: util.getPhoto(participant.profileImgUrl),
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

      return swipeableEvents.map((event) => ({
        ...event = util.transformPhotos(event),
  
        participants: event.participants?.map((participant) => ({
          _id: participant.id,
          firstName: participant.firstName,
          lastName: participant.lastName,
          emailAddress: participant.emailAddress,
          profileImgUrl: util.getPhoto(participant.profileImgUrl),
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
