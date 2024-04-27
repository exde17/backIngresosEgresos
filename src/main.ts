import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './utils/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Boostrap');
  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configura las opciones de CORS
app.enableCors({
  origin: ['http://localhost:3000', 'http://localhost:3001','https://serveringresosegresos.azurewebsites.net'], 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});

  await app.listen(process.env.PORT || 3000);
  logger.log(`Application is running on: ${process.env.PORT || 3000}`);
}
bootstrap();

//https://serveringresosegresos.azurewebsites.net