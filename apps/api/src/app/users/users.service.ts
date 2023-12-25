import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRepository } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from '../auth/dto/sign-in.dto';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto | SignInDto) {
    try {
      return await this.userRepository.create(createUserDto);
    } catch (e) {
      console.log(e);
    }
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
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
