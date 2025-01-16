import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put, Logger } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto, UpdateEventDto } from './dto/event.dto';
import { AuthGuard } from '../../auth/auth.guards';

@Controller('event')
export class EventController {
  private readonly logger: Logger = new Logger(EventController.name);

  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Request() req: any,@Body() createEventDto: EventDto) {
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

  @Get(':id/participants')
  @UseGuards(AuthGuard)
  findParticipants(@Param('id') id: string){
    return this.eventService.findParticipants(+id);
  }

  @Get('timeline/:id')
  @UseGuards(AuthGuard)
  async getTimeline(@Param('id') id: string) {
    return await this.eventService.getTimeline(+id);
  }


  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Request() req: any, @Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(req, id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Request() req: any, @Param('id') id: number) {
    return this.eventService.remove(req, id);
  }

  @Post(':id/join')
  @UseGuards(AuthGuard)
  async joinEvent(@Request() req: any, @Param('id') eventId: number) {
    const userId = req.user.account_id;
    return await this.eventService.joinEvent(userId, eventId);
  }
}
