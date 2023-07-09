import { ICustomer } from 'src/modules/customer/domain/contract/ICustomer';
import { BudgetItemBuildDto, IBudgetItem } from './IBudgetItem';
import { IProduct } from 'src/modules/product/domain/contract/IProduct';

export type BudgetDto = {
  id: string;
  createdAt: string;
};

export type BudgetItemUpdateDto = {
  product?: IProduct;
  quantity?: number;
  discount?: number;
};

export interface IBudget {
  setCustomer(customer: ICustomer): void;
  createItem(item: BudgetItemBuildDto): { itemId: string };
  updateItem(id: string, item: BudgetItemUpdateDto): void;
  deleteItem(id: string): void;
  get(): BudgetDto;
  getCustomer(): ICustomer;
  getItems(): IBudgetItem[];
}
