import { BadRequestException } from '@nestjs/common';

export class IncorrectPasswordException extends BadRequestException {
  constructor() {
    super();
    this.message = 'Invalid password';
  }
}
