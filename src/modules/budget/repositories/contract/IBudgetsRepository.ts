import { BudgetAbsDB } from 'src/database/schema/contract/BudgetAbsDB';
import { IBudget } from '../../domain/contract/IBudget';
import { CustomerAbsDB } from 'src/database/schema/contract/CustomerAbsDB';
import { ProductAbsDB } from 'src/database/schema/contract/ProductAbsDB';
import { GetManyQuery } from '../../use-cases/contract/IBudgetUsecase';

export interface IBudgetsRepository {
  save(
    budget: IBudget,
    budgetDB?: BudgetAbsDB,
    customerDB?: CustomerAbsDB,
    productDB?: ProductAbsDB,
    itemId?: string,
  ): Promise<void>;
  get(id: string): Promise<{
    budget: IBudget;
    budgetDB: BudgetAbsDB;
    customerDB: CustomerAbsDB;
  }>;
  getMany(query?: GetManyQuery): Promise<IBudget[]>;
  delete(id: string): Promise<void>;
  saveItem(
    budget: IBudget,
    budgetDB: BudgetAbsDB,
    itemId: string,
    productDB?: ProductAbsDB,
  ): Promise<void>;
  deleteItem(
    budget: IBudget,
    budgetDB: BudgetAbsDB,
    itemId: string,
  ): Promise<void>;
}
