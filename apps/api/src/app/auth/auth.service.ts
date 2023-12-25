import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  async signIn(dto: SignInDto) {
    return 'This action adds a new auth';
  }

  async signUp(dto: SignUpDto) {
    return 'sign up';
  }
}
