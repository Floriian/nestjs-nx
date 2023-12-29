import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserExistsException } from './exceptions/user-exists.exception';

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
      const returnedUserFromDatabase = {
        ...createUserDto,
        id: 1,
        hashFields: jest.fn(),
      };

      jest
        .spyOn(userRepository, 'save')
        .mockResolvedValueOnce(returnedUserFromDatabase);
      expect(await service.create(createUserDto)).toBe(
        returnedUserFromDatabase
      );
    });

    it('Should throw UserExistsException if the user already exists', async () => {
      const returnedUserFromDatabase = {
        ...createUserDto,
        id: 1,
        hashFields: jest.fn(),
      };

      jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValueOnce(returnedUserFromDatabase);

      await expect(service.create(createUserDto)).rejects.toThrow(
        UserExistsException
      );
    });
  });
});
