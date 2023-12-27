import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export const typeormConfig: TypeOrmModuleAsyncOptions = {
  imports: [EnvModule],
  inject: [EnvService],
  useFactory: (envService: EnvService) => {
    const config = buildDataSourceOptions(envService);
    return {
      ...config,
      autoLoadEntities: true,
    };
  },
};

export function buildDataSourceOptions(
  envService: EnvService
): DataSourceOptions {
  return {
    host: envService.get('DATABASE_HOST'),
    port: envService.get('DATABASE_PORT'),
    username: envService.get('DATABASE_USER'),
    password: envService.get('DATABASE_PASSWORD'),
    database: envService.get('DATABASE_DB'),
    type: 'postgres',
    synchronize: false,
  };
}

const dataSourceOptions = buildDataSourceOptions(
  new EnvService(new ConfigService())
);

export default new DataSource({
  ...dataSourceOptions,
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
  entities: [join(__dirname, '../typeorm-migration', '../**/*.entity.{ts,js}')],
});
