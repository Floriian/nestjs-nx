import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  Model,
  Table,
} from 'sequelize-typescript';
import argon2 from 'argon2';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class User extends Model {
  @ApiProperty()
  @Column
  email: string;

  @ApiProperty()
  @Column
  password: string;

  @ApiProperty()
  @Column
  token: string;

  @BeforeCreate
  @BeforeUpdate
  static async hashFields(user: User) {
    user.password = await argon2.hash(user.password);
    user.token = await argon2.hash(user.token);
  }
}

export type UserModel = typeof User;
