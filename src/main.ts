import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';


async function bootstrap() {
  const environment = process.env.NODE_ENV || 'development';
  config({ path: `.env` });
  console.log(process.env);
  console.log(`Running in ${process.env.NODE_ENV} mode`);
  console.log(`Running in ${process.env.DB_HOST} datbase`);



  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
