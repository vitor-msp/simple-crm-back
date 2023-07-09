import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from './database/config/DBConfig';
import { CustomerModule } from './modules/customer/customer.module';
import { BudgetModule } from './modules/budget/budget.module';

@Module({
  imports: [
    ProductModule,
    CustomerModule,
    BudgetModule,
    TypeOrmModule.forRoot(DBConfig.getInfo()),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
