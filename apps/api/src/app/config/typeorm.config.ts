import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
export const typeormConfig: TypeOrmModuleAsyncOptions = {
  imports: [EnvModule],
  inject: [EnvService],
  useFactory: (envService: EnvService) => ({
    host: envService.get('DATABASE_HOST'),
    port: envService.get('DATABASE_PORT'),
    username: envService.get('DATABASE_USER'),
    password: envService.get('DATABASE_PASSWORD'),
    database: envService.get('DATABASE_DB'),
    type: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
  }),
};
