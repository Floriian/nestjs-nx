import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../../decorators';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsStrongPassword({ minSymbols: 0, minUppercase: 1 })
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @Match(SignUpDto, (s) => s.password)
  confirmPassword: string;
}
