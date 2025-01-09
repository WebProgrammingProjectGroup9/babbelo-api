import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { AuthModule } from '../../auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Account } from '../account/entities/account.entity';

@Module({
  imports: [
    AuthModule,
    JwtModule,
    TypeOrmModule.forFeature([Event, Account]), 

  ],
  controllers: [EventController],
  providers: [EventService],

})
export class EventModule {}
