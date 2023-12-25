import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signIn(dto: SignInDto) {
    return 'This action adds a new auth';
  }

  async signUp(dto: SignUpDto) {
    return 'sign up';
  }
}
