import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User, UserRepository } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserExistsException } from './exceptions/user-exists.exception';
import { QueryFailedError } from 'typeorm';
import { UserNotFoundException } from './exceptions/user-not-found.exeption';

const mockedUserRepository = () => ({
  save: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
});

const createUserDto: CreateUserDto = {
  email: 'user@example.com',
  password: 'asdasd',
  confirmPassword: 'asdasd',
};

const returnedUserFromDatabase = {
  ...createUserDto,
  id: 1,
  hashFields: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'UserRepository', useFactory: mockedUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>('UserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('Should create a new user', async () => {
      jest
        .spyOn(userRepository, 'save')
        .mockResolvedValueOnce(returnedUserFromDatabase);
      expect(await service.create(createUserDto)).toBe(
        returnedUserFromDatabase
      );
    });

    it('Should throw UserExistsException if the user already exists', async () => {
      jest
        .spyOn(userRepository, 'save')
        .mockImplementationOnce(() =>
          Promise.reject(
            new QueryFailedError(
              '',
              [],
              'duplicate key value violates unique constraint'
            )
          )
        );

      await expect(service.create(createUserDto)).rejects.toThrow(
        UserExistsException
      );
    });
  });

  describe('findOneByEmail', () => {
    it('Should return user', async () => {
      const user: User = {
        email: 'test@example.com',
        id: 1,
        password: 'asdasd',
        token: '',
        hashFields: jest.fn(),
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(user);

      expect(await service.findOneByEmail(user.email)).toEqual(user);
    });

    it('Should return UserNotFoundException', async () => {
      const nonExistentEmail = 'nonexistent@example.com';

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null);

      await expect(service.findOneByEmail(nonExistentEmail)).rejects.toThrow(
        UserNotFoundException
      );
    });
  });

  describe('findOne', () => {
    it('Should return user', async () => {
      const user: User = {
        email: 'test@example.com',
        id: 1,
        password: 'asdasd',
        token: '',
        hashFields: jest.fn(),
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(user);

      expect(await service.findOneById(user.id)).toEqual(user);
    });

    it('Should return UserNotFoundException', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null);

      await expect(service.findOneById(0)).rejects.toThrow(
        UserNotFoundException
      );
    });
  });
});
