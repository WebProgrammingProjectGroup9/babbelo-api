import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { AuthModule } from '../../auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    AuthModule,
    JwtModule,
    TypeOrmModule.forFeature([Event]), 

  ],
  controllers: [EventController],
  providers: [EventService],

})
export class EventModule {}
