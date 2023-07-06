import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { BudgetDB } from 'src/database/schema/BudgetDB';
import { BudgetItemDB } from 'src/database/schema/BudgetItemDB';
import { CustomerDB } from 'src/database/schema/CustomerDB';
import { ProductDB } from 'src/database/schema/ProductDB';
import { BudgetItemService } from './budget-item.service';
import { BudgetItemController } from './budget-item.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BudgetDB, BudgetItemDB, CustomerDB, ProductDB]),
  ],
  controllers: [BudgetController, BudgetItemController],
  providers: [BudgetService, BudgetItemService],
})
export class BudgetModule {}
