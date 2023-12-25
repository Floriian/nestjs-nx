import argon2 from 'argon2';
import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ nullable: true })
  token?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashFields() {
    this.password = await argon2.hash(this.password);
    this.token = await argon2.hash(this.token);
  }
}

export type UserRepository = Repository<User>;
