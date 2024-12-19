import { Injectable, Logger } from '@nestjs/common';
import { EventDto } from './dto/event.dto';
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
  // create(createEventDto: CreateEventDto) {
  //   return 'This action adds a new event';
  // }

  findAll(): Promise<Event[]> {
    this.logger.debug('Finding all events');
    return this.eventRepository.find();
    
  }

  findOne(id: number) {
    this.logger.debug(`Finding event with id ${id}`);
    return this.eventRepository.findOne({ where: { id } });
  }

  // update(id: number, updateEventDto: UpdateEventDto) {
  //   return `This action updates a #${id} event`;
  // }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
