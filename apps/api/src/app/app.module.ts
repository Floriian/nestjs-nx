import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { envSchema } from './env/env.schema';
import { EnvModule } from './env/env.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
    }),
    EnvModule,
  ],
})
export class AppModule {}
