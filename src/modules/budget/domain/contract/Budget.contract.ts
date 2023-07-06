import { ICustomer } from 'src/modules/customer/domain/contract/Customer.contract';
import { IBudgetItem } from './BudgetItem.contract';

export type BudgetDto = {
  id: string;
};

export interface IBudget {
  setCustomer(customer: ICustomer): void;
  // createItem(item: CreateBudgetItemProps): void;
  // updateItem(id: string, item: UpdateBudgetItemProps): void;
  // removeItem(id: string): void;
  get(): BudgetDto;
  getCustomer(): ICustomer;
  getItems(): IBudgetItem[];
}
