import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BudgetController } from './controllers/BudgetController';
import { BudgetUsecase } from './use-cases/BudgetUsecase';
import { BudgetDB } from 'src/database/schema/BudgetDB';
import { BudgetItemDB } from 'src/database/schema/BudgetItemDB';
import { CustomerDB } from 'src/database/schema/CustomerDB';
import { ProductDB } from 'src/database/schema/ProductDB';
import { BudgetItemUsecase } from './use-cases/BudgetItemUsecase';
import { BudgetItemController } from './controllers/BudgetItemController';
import { BudgetsRepository } from './repositories/BudgetsRepository';
import { CustomerModule } from '../customer/customer.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    CustomerModule,
    ProductModule,
    TypeOrmModule.forFeature([BudgetDB, BudgetItemDB, CustomerDB, ProductDB]),
  ],
  controllers: [BudgetController, BudgetItemController],
  providers: [BudgetUsecase, BudgetItemUsecase, BudgetsRepository],
})
export class BudgetModule {}
