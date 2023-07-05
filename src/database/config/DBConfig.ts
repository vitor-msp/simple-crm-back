import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductDB } from '../schema/ProductDB';
import { CustomerDB } from '../schema/CustomerDB';
import { BudgetDB } from '../schema/BudgetDB';
import { BudgetItemDB } from '../schema/BudgetItemDB';

export abstract class DBConfig {
  static getInfo(): TypeOrmModuleOptions {
    const type = 'mysql';
    const entities = [ProductDB, CustomerDB, BudgetDB, BudgetItemDB];
    const production: TypeOrmModuleOptions = {
      type,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities,
      synchronize: false,
    };
    const test: TypeOrmModuleOptions = {
      type,
      host: process.env.DB_HOST_TEST,
      port: +process.env.DB_PORT_TEST,
      username: process.env.DB_USER_TEST,
      password: process.env.DB_PASSWORD_TEST,
      database: process.env.DB_NAME_TEST,
      entities,
      synchronize: true,
    };
    return process.env.PRODUCTION == 'true' ? production : test;
  }
}
