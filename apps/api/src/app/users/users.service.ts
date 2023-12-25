import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRepository } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from 'apps/api/src/app/auth/dto/sign-in.dto';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto | SignInDto) {
    try {
      await this.userRepository.create(createUserDto);
    } catch (e) {
      console.log(e);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
