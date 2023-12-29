import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../../decorators';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';
import { passwordCriteria } from '../../utils';

export class SignUpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsStrongPassword(passwordCriteria)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @Match(SignUpDto, (s) => s.password, {
    message: "password's doesn't matches",
  })
  confirmPassword: string;
}
