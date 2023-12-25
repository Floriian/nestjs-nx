import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('NestJS template')
  .setVersion('1.0')
  .build();
