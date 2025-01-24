import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { AuthModule } from '../../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Account } from '../account/entities/account.entity';
import { Address } from '../address/entities/address.entity';

@Module({
  imports: [
    AuthModule,
    JwtModule,
    TypeOrmModule.forFeature([Event, Account, Address]), 

  ],
  controllers: [EventController],
  providers: [EventService],

})
export class EventModule {}
