import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { Event } from './event/entities/event.entity';
import * as dotenv from 'dotenv';
import { Account } from './modules/account/entities/account.entity';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'development' ? `.env` : undefined,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Account],
      synchronize: true,
      logging: true,
    }),
    AccountModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log("app module", {
      type: "postgres",
      url: process.env.DATABASE_URL,
    });
  }
}
