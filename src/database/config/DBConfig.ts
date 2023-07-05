import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export abstract class DBConfig {
  static getInfo(): TypeOrmModuleOptions {
    const production: TypeOrmModuleOptions = {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      autoLoadEntities: true,
    };
    const test: TypeOrmModuleOptions = {
      type: 'mysql',
      host: process.env.DB_HOST_TEST,
      port: +process.env.DB_PORT_TEST,
      username: process.env.DB_USER_TEST,
      password: process.env.DB_PASSWORD_TEST,
      database: process.env.DB_NAME_TEST,
      autoLoadEntities: true,
      synchronize: true,
    };
    return process.env.PRODUCTION == 'true' ? production : test;
  }
}
