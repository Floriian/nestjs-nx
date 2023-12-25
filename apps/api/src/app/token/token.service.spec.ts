import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { EnvService } from '../env/env.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import argon2 from 'argon2';
import { UpdateResult } from 'typeorm';

const mockedJwtService = () => ({
  signAsync: jest.fn(),
});

const mockedEnvService = () => ({
  get: jest.fn(),
});

const mockedUsersService = () => ({
  update: jest.fn(),
});

describe('TokenService', () => {
  let service: TokenService;
  let envService: EnvService;
  let jwtService: JwtService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        { provide: JwtService, useFactory: mockedJwtService },
        { provide: EnvService, useFactory: mockedEnvService },
        { provide: UsersService, useFactory: mockedUsersService },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
    envService = module.get<EnvService>(EnvService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should generate tokens', async () => {
    const payload = { userId: 1, email: 'test@example.com' };
    const tokens = {
      access_token: 'access_token',
      refresh_token: 'refresh_token',
    };

    jest
      .spyOn(jwtService, 'signAsync')
      .mockResolvedValueOnce(tokens.access_token)
      .mockResolvedValueOnce(tokens.refresh_token);
    jest
      .spyOn(envService, 'get')
      .mockResolvedValueOnce('AT_SECRET' as unknown as never)
      .mockResolvedValueOnce('RT_SECRET' as unknown as never);

    expect(await service.generateTokens(payload)).toEqual(tokens);
  });

  it('Should return an UpdateResult when tokens are updated successfully', async () => {
    const userId = 1;
    const refreshToken = 'refresh_token';
    const updateResult: UpdateResult = {
      affected: 1,
      raw: jest.fn(),
      generatedMaps: [],
    };

    jest.spyOn(usersService, 'update').mockResolvedValue(updateResult);

    expect(await service.updateTokens(userId, refreshToken)).toEqual(
      updateResult
    );
  });
});
