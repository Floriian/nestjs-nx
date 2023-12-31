import { BadRequestException } from '@nestjs/common';

export class UserExistsException extends BadRequestException {
  constructor() {
    super('User already exists.');
  }
}
