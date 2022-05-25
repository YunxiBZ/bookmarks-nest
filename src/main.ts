import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Middleware for validateionPipe
  app.useGlobalPipes(
    new ValidationPipe({
      // filter out properties that should not be received by the method handler
      whitelist: true,
    }),
  );

  await app.listen(3333);
}
bootstrap();
