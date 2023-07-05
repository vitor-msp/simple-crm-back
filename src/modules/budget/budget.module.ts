import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { BudgetDB } from 'src/database/schema/BudgetDB';
import { BudgetItemDB } from 'src/database/schema/BudgetItemDB';
import { CustomerDB } from 'src/database/schema/CustomerDB';

@Module({
  imports: [TypeOrmModule.forFeature([BudgetDB, BudgetItemDB, CustomerDB])],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
