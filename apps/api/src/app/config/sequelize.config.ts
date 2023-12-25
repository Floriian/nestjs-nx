import { SequelizeModuleAsyncOptions } from '@nestjs/sequelize';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
export const sequelizeConfig: SequelizeModuleAsyncOptions = {
  imports: [EnvModule],
  inject: [EnvService],
  useFactory: (envService: EnvService) => ({
    host: envService.get('DATABASE_HOST'),
    port: envService.get('DATABASE_PORT'),
    username: envService.get('DATABASE_USER'),
    password: envService.get('DATABASE_PASSWORD'),
    database: envService.get('DATABASE_DB'),
    autoLoadModels: true,
    dialect: 'postgres',
  }),
};
