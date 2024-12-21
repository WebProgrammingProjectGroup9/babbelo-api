import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/event.dto';
import { AuthGuard } from '../../auth/auth.guards';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Request() req: any,@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(req, createEventDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Request() req: any, @Param('id') id: number, @Body() updateEventDto: CreateEventDto) {
    return this.eventService.update(req, id, updateEventDto);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Request() req: any, @Param('id') id: number) {
    return this.eventService.remove(req, id);
  }
}
