import { BadRequestException, NotFoundException, Injectable, Logger } from '@nestjs/common';
import { CreateEventDto } from './dto/event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  private readonly logger: Logger = new Logger(EventService.name);

  constructor(
    @InjectRepository(Event) 
    private readonly eventRepository: Repository<Event>,
  ){
    this.logger.debug(this.eventRepository.metadata)
  }

  async create(req: any, createEventDto: CreateEventDto) {
    const userId = req.user.account_id;
    const { date } = createEventDto;

    if (new Date(date) < new Date()) {
      throw new BadRequestException('Date cannot be in the past');
    }
    console.log('userId', userId);  

    const newEvent = { ...createEventDto, organisator: userId };

    return await this.eventRepository.save(newEvent);
  }

  async findAll(): Promise<Event[]> {
    this.logger.debug('Finding all events');
    const events = await this.eventRepository.find();

    if (events.length === 0) {
      throw new BadRequestException('No events found');
    }

    return events;
  }

  async findOne(eventNumber: number) {
    const event = await this.eventRepository.findOne({ where: { eventNumber } });

    if (!event) {
      throw new BadRequestException('Event not found');
    }
    
    this.logger.debug(`Finding event with id ${eventNumber}`);

    return event;
   
  }

  async update(req: any, id: number, updateEventDto: CreateEventDto) {
    const event = await this.eventRepository.findOne({
      where: { eventNumber: id },
      relations: ['organisator'],
    });

    if(!event) {
      throw new BadRequestException('Event not found');
    }

    if (new Date(updateEventDto.date) < new Date()) {
      throw new BadRequestException('Date cannot be in the past');
    }

    if (event.eventNumber !== id) {
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
      where: { eventNumber: id },
      relations: ['organisator'],
    })

    if(event.eventNumber !== id) {
      throw new NotFoundException('Event does not exist');
    }

    if(!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.organisator.id !== req.user.account_id) {
      throw new BadRequestException('You are not allowed to delete this event');
    }

    const response = await this.eventRepository.delete(id); 

    return { deleted: response.affected}

  }
}
