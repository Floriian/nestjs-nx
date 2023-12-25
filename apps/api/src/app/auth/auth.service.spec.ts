import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';
import { SignInDto } from './dto/sign-in.dto';
import argon2 from 'argon2';
import { UserNotFoundException } from './exceptions/user-not-found.exeption';
import { IncorrectPasswordException } from './exceptions/incorrect-password.exception';
import { SignUpDto } from './dto/sign-up.dto';
import { UserExistsException } from './exceptions/user-exists.exception';

const mockedRepostory = () => ({
  findOneBy: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

const mockedUsersService = () => ({
  findOneByEmail: jest.fn(),
  create: jest.fn(),
});

const mockedTokenService = () => ({
  generateTokens: jest.fn(),
});

const dto: SignInDto = {
  email: 'test@example.com',
  password: 'password',
};

const signUpDto: SignUpDto = {
  confirmPassword: 'asdasd',
  email: 'test@example.com',
  password: 'asdasd',
};

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useFactory: mockedUsersService },
        { provide: TokenService, useFactory: mockedTokenService },
        { provide: 'UserRepository', useFactory: mockedRepostory },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    tokenService = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Sign in', () => {
    it('Should return access token and refresh token, when credentials are valid', async () => {
      const password = await argon2.hash(dto.password);
      const user = { id: 1, email: dto.email, password, hashFields: jest.fn() };
      const tokens = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      };

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValueOnce(user);
      jest.spyOn(tokenService, 'generateTokens').mockResolvedValueOnce(tokens);

      expect(await service.signIn(dto)).toBe(tokens);
    });

    it('Should throw UserNotFoundException when user does not exist', async () => {
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValueOnce(null);

      await expect(service.signIn(dto)).rejects.toThrow(UserNotFoundException);
    });

    it('Should throw IncorrectPasswordException if password is incorrect', async () => {
      const dto: SignInDto = {
        email: 'test@example.com',
        password: 'incorrect_password',
      };

      const hashedPassword = await argon2.hash('correct_password');
      const user = {
        id: 1,
        email: dto.email,
        password: hashedPassword,
        hashFields: jest.fn(),
      };

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValueOnce(user);

      await expect(service.signIn(dto)).rejects.toThrow(
        IncorrectPasswordException
      );
    });
  });

  describe('Sign up', () => {
    it('Should throw UserExistsException if the user already exists', async () => {
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValueOnce({
        ...signUpDto,
        hashFields: jest.fn(),
        password: 'asdhjaskdhaskjd',
        email: dto.email,
        id: 1,
      });

      await expect(service.signUp(signUpDto)).rejects.toThrow(
        UserExistsException
      );
    });

    it('Should return a token when sign up is successful', async () => {
      const user = {
        id: 1,
        email: signUpDto.email,
        password: signUpDto.password,
        hashFields: jest.fn(),
      };

      const tokens = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      };

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValueOnce(null);
      jest.spyOn(usersService, 'create').mockResolvedValueOnce(user);
      jest.spyOn(tokenService, 'generateTokens').mockResolvedValueOnce(tokens);

      expect(await service.signUp(signUpDto)).toBe(tokens);
    });
  });
});
