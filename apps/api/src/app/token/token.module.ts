import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from '../env/env.module';

@Module({
  imports: [UsersModule, JwtModule.register({}), EnvModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
