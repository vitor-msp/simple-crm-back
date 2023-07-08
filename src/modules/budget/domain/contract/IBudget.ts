import { ICustomer } from 'src/modules/customer/domain/contract/ICustomer';
import { BudgetItemBuildDto, IBudgetItem } from './IBudgetItem';

export type BudgetDto = {
  id: string;
};

// export type UpdateBudgetItemDto = {
//   product?: IProduct;
//   quantity?: number;
//   discount?: number;
// };

export interface IBudget {
  setCustomer(customer: ICustomer): void;
  createItem(item: BudgetItemBuildDto): { itemId: string };
  // updateItem(id: string, item: UpdateBudgetItemDto): void;
  // removeItem(id: string): void;
  get(): BudgetDto;
  getCustomer(): ICustomer;
  getItems(): IBudgetItem[];
}
