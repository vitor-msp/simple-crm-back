import { BudgetAbsDB } from 'src/database/schema/contract/BudgetAbsDB';
import { IBudget } from '../../domain/contract/IBudget';
import { CustomerAbsDB } from 'src/database/schema/contract/CustomerAbsDB';
import { ProductAbsDB } from 'src/database/schema/contract/ProductAbsDB';

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
  getAll(): Promise<IBudget[]>;
  delete(id: string): Promise<void>;
  saveItem(
    budget: IBudget,
    budgetDB: BudgetAbsDB,
    itemId: string,
    productDB?: ProductAbsDB,
  ): Promise<void>;
}
