import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';
import { UserExistsException } from './exceptions/user-exists.exception';
import { UserNotFoundException } from './exceptions/user-not-found.exeption';
import { IncorrectPasswordException } from './exceptions/incorrect-password.exception';
import argon2 from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly tokenService: TokenService
  ) {}
  async signIn(dto: SignInDto) {
    const user = await this.usersService.findOneByEmail(dto.email);
    if (!user) throw new UserNotFoundException();

    const isPasswordMatches = await argon2.verify(user.password, dto.password);
    if (!isPasswordMatches) throw new IncorrectPasswordException();

    return await this.tokenService.generateTokens({
      userId: user.id,
      email: user.email,
    });
  }

  async signUp(dto: SignUpDto) {
    const findByEmail = await this.usersService.findOneByEmail(dto.email);
    if (findByEmail) throw new UserExistsException();

    const newUser = await this.usersService.create(dto);

    return await this.tokenService.generateTokens({
      userId: newUser.id,
      email: newUser.email,
    });
  }
}
