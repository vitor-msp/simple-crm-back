import { CreateBudgetItemProps, IBudgetItem } from './IBudgetItem';
import { IProduct } from 'src/product/domain/IProduct';
import { ICustomer } from 'src/customer/domain/ICustomer';

export type BudgetProps = {
  id?: string;
  customer: ICustomer;
};

export type UpdateBudgetItemProps = {
  product?: IProduct;
  quantity?: number;
  discount?: number;
};

export interface IBudget {
  readonly id: string;
  readonly items: IBudgetItem[];
  setCustomer(customer: ICustomer): void;
  createItem(item: CreateBudgetItemProps): void;
  updateItem(id: string, item: UpdateBudgetItemProps): void;
  removeItem(id: string): void;
  getItems(): IBudgetItem[];
  getCustomer(): ICustomer;
  getTotalValue(): number;
}
