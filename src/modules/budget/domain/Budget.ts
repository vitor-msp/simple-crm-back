import { v4 as uuid } from 'uuid';
import { BudgetDto, IBudget } from './contract/IBudget';
import { ICustomer } from 'src/modules/customer/domain/contract/ICustomer';
import { BudgetItemBuildDto, IBudgetItem } from './contract/IBudgetItem';
import { BudgetItem } from './BudgetItem';

export type BudgetBuildDto = {
  id?: string;
};

export class Budget implements IBudget {
  private id: string;
  private items: IBudgetItem[] = [];
  private customer: ICustomer;

  constructor(props: BudgetBuildDto) {
    this.id = props.id ?? uuid();
  }

  setCustomer(customer: ICustomer): void {
    this.customer = customer;
  }

  createItem(item: BudgetItemBuildDto): { itemId: string } {
    const budgetItem = new BudgetItem(item);
    this.items.push(budgetItem);
    return { itemId: budgetItem.get().id };
  }

  // updateItem(id: string, item: UpdateBudgetItemDto): void {
  //   const index = this.findItem(id);
  //   const savedItem = this.items.at(index);
  //   if (item.discount) savedItem.setDiscount(item.discount);
  //   if (item.product) savedItem.setProduct(item.product);
  //   if (item.quantity) savedItem.setQuantity(item.quantity);
  // }

  deleteItem(id: string): void {
    const index = this.findItem(id);
    this.items.splice(index, 1);
  }

  private findItem(id: string): number {
    const index = this.items.findIndex((i) => i.get().id === id);
    if (index === -1) throw new Error('not found');
    return index;
  }

  get(): BudgetDto {
    return {
      id: this.id,
    };
  }

  getCustomer(): ICustomer {
    return this.customer;
  }

  getItems(): IBudgetItem[] {
    return this.items;
  }
}

// getTotalValue(): number {
//   return this.items.reduce((prev: number, curr: IBudgetItem) => {
//     return curr.getFinalValue() + prev;
//   }, 0);
// }
