import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar validación global con configuración más permisiva para debug
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: false, // Temporalmente más permisivo
    transform: true,
    disableErrorMessages: false,
    validateCustomDecorators: true,
  }));
  
  await app.listen(process.env.PORT ?? 3000);
  console.log('🚀 Servidor iniciado en http://localhost:3000');
}
bootstrap();
