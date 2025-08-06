import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // Habilitar CORS
  app.enableCors();
  
  const port = process.env.PORT ?? 3002;
  await app.listen(port);
  console.log(`🚀 GraphQL API ejecutándose en: http://localhost:${port}/graphql`);
}
bootstrap();
