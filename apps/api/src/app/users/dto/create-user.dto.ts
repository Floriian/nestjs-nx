import { ApiProperty } from '@nestjs/swagger';
import { passwordCriteria } from '../../utils';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Match } from '../../decorators';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(passwordCriteria)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @Match(CreateUserDto, (s) => s.password)
  confirmPassword: string;
}
