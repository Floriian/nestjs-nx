import { BadRequestException } from '@nestjs/common';

export class UserExistsException extends BadRequestException {
  constructor() {
    super();
    this.message = 'User already exists.';
  }
}
