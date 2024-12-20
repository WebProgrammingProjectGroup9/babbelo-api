import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';



async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') {
    config({ path: `.env.dev` });
  }

  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database Host: ${process.env.DB_HOST || 'Not Defined'}`);

  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {};
  app.enableCors(corsOptions);

  //app.useGlobalInterceptors(new ApiResponseInterceptor());
  const port = parseInt(process.env.PORT, 10) || 3100;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
