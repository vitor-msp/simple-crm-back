import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();

import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from './database/config/DBConfig';
import { CustomerModule } from './customer/customer.module';
import { BudgetModule } from './modules/budget/budget.module';

@Module({
  imports: [
    ProductModule,
    CustomerModule,
    BudgetModule,
    TypeOrmModule.forRoot(DBConfig.getInfo()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
