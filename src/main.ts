import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

async function bootstrap() {
  const environment = process.env.NODE_ENV || 'development';
  config({ path: `${environment}.env` });

  console.log(`Running in ${process.env.NODE_ENV} mode`);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
