import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';



async function bootstrap() {
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database Host: ${process.env.DB_HOST || 'Not Defined'}`);

  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {};
  app.enableCors(corsOptions);
  const config = new DocumentBuilder()
    .setTitle('Babbelo')
    .setDescription('Babbelo-api')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = parseInt(process.env.PORT, 10) || 3100;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
