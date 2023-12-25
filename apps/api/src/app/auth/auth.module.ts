import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TokenModule } from '../token/token.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategys/access-token.strategy';
import { RefreshTokenStrategy } from './strategys/refresh-token.strategy';

@Module({
  imports: [JwtModule.register({}), UsersModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
