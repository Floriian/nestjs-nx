import { Injectable } from '@nestjs/common';
import { Token } from './token';
import { UsersService } from '../users/users.service';
import argon2 from 'argon2';
import { UpdateResult } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from '../env/env.service';
@Injectable()
export class TokenService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly envService: EnvService
  ) {}
  async updateTokens(
    userId: number,
    refreshToken: string
  ): Promise<UpdateResult> {
    const hashedRefreshToken = await argon2.hash(refreshToken);
    return await this.userService.update(userId, {
      refresh_token: hashedRefreshToken,
    });
  }

  async generateTokens(payload: {
    userId: number;
    email: string;
  }): Promise<Token> {
    const tokenData = {
      sub: payload.userId,
      email: payload.email,
    };
    const access_token = await this.jwtService.signAsync(tokenData, {
      secret: this.envService.get('AT_SECRET'),
      expiresIn: '15m',
    });
    const refresh_token = await this.jwtService.signAsync(tokenData, {
      secret: this.envService.get('RT_SECRET'),
      expiresIn: '7d',
    });
    return { access_token, refresh_token };
  }
}
