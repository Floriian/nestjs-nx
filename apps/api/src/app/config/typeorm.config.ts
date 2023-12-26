import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import path from 'path';

export const typeormConfig: TypeOrmModuleAsyncOptions = {
  imports: [EnvModule],
  inject: [EnvService],
  useFactory: buildDataSourceOptions,
};

export function buildDataSourceOptions(
  envService: EnvService
): PostgresConnectionOptions {
  return {
    host: envService.get('DATABASE_HOST'),
    port: envService.get('DATABASE_PORT'),
    username: envService.get('DATABASE_USER'),
    password: envService.get('DATABASE_PASSWORD'),
    database: envService.get('DATABASE_DB'),
    type: 'postgres',
    migrations: [
      path.join(__dirname + './typeorm-migration/***/***/***/***/*.{ts,js}'),
    ],
    entities: [path.join(__dirname + '/***/***/***/*.entity.{js,ts}')],
  };
}

const dataSourceOptions = buildDataSourceOptions(
  new EnvService(new ConfigService())
);
export default new DataSource({
  ...dataSourceOptions,
});
