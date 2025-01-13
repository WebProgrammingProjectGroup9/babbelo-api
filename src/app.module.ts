import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './modules/event/event.module';
import { Event } from './modules/event/entities/event.entity';
import { Account } from './modules/account/entities/account.entity';
import { Address } from './modules/address/entities/address.entity';
import { AddressModule } from './modules/address/address.module';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Neo4jModule } from './neo4j/neo4j.module';
import { Neo4jService } from './neo4j/neo4j.service';
import { Neo4jController } from './neo4j/neo4j.controller';
import * as dotenv from 'dotenv';

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
      entities: [Account, Event, Address],
      synchronize: true,
      logging: true,
    }),
    AccountModule,
    AuthModule,
    AddressModule,
    EventModule,
    Neo4jModule,
  ],
  controllers: [AppController, Neo4jController],
  providers: [AppService, Neo4jService],
})
export class AppModule {
  constructor() {
    console.log("app module", {
      type: "postgres",
      url: process.env.DATABASE_URL,
    });
  }
}
