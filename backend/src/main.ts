import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
  origin: 'https://stockflow-otcfpsenj-vishnuvardhanreddy-ns-projects.vercel.app',
  credentials: true,
});

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log('StockFlow API running on http://localhost:3000/api');
}
bootstrap();
