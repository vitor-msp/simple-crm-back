import {
  CustomerPropsDB,
  ICustomer,
} from 'src/modules/customer/domain/contract/Customer.contract';
import { BudgetItemPropsDBOut, IBudgetItem } from './BudgetItem.contract';

export type BudgetProps = {
  saved: boolean;
  notSavedProps?: BudgetPropsCreate;
  savedProps?: BudgetPropsDBIn;
};

export type BudgetPropsCreate = {
  customer: ICustomer;
};

export type BudgetPropsDBIn = {
  id: string;
  customer: ICustomer;
};

export type BudgetPropsDBOut = {
  id: string;
  customer: CustomerPropsDB;
  items: BudgetItemPropsDBOut[];
};

export interface IBudget {
  setCustomer(customer: ICustomer): void;
  // createItem(item: CreateBudgetItemProps): void;
  // updateItem(id: string, item: UpdateBudgetItemProps): void;
  // removeItem(id: string): void;
  get(): BudgetPropsDBOut;
}
