import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRepository } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from '../auth/dto/sign-in.dto';
import { QueryFailedError } from 'typeorm';
import { UserExistsException } from './exceptions/user-exists.exception';
import { UserNotFoundException } from './exceptions/user-not-found.exeption';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}
  async create(dto: SignInDto | CreateUserDto) {
    try {
      return await this.userRepository.save(dto);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new UserExistsException();
      }
      console.log(e);
      throw e;
    }
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    return await this.userRepository.update({ id }, dto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
