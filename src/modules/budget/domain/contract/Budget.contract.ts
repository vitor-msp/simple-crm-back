import { ICustomer } from 'src/modules/customer/domain/contract/Customer.contract';
import { BudgetItemBuilderDto, IBudgetItem } from './BudgetItem.contract';
import { IProduct } from 'src/modules/product/domain/contract/IProduct';

export type BudgetDto = {
  id: string;
};

export type UpdateBudgetItemDto = {
  product?: IProduct;
  quantity?: number;
  discount?: number;
};

export interface IBudget {
  setCustomer(customer: ICustomer): void;
  createItem(item: BudgetItemBuilderDto): string;
  updateItem(id: string, item: UpdateBudgetItemDto): void;
  removeItem(id: string): void;
  get(): BudgetDto;
  getCustomer(): ICustomer;
  getItems(): IBudgetItem[];
}
