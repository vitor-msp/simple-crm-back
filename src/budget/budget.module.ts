import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { BudgetDB } from 'src/database/schema/BudgetDB';
import { BudgetItemDB } from 'src/database/schema/BudgetItemDB';

@Module({
  imports: [TypeOrmModule.forFeature([BudgetDB, BudgetItemDB])],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
