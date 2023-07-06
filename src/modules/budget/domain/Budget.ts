import { v4 as uuid } from 'uuid';
import { BudgetDto, IBudget } from './contract/Budget.contract';
import { ICustomer } from 'src/modules/customer/domain/contract/Customer.contract';
import { IBudgetItem } from './contract/BudgetItem.contract';

export type BudgetBuilderDto = {
  id?: string;
};

export class Budget implements IBudget {
  private id: string;
  private items: IBudgetItem[] = [];
  private customer: ICustomer;

  constructor(props: BudgetBuilderDto) {
    this.id = props.id ?? uuid();
  }

  setCustomer(customer: ICustomer): void {
    this.customer = customer;
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
// createItem(item: CreateBudgetItemProps): void {
//   const { product, quantity } = item;
//   const budgetItem = new BudgetItem({
//     product,
//     quantity,
//     discount: item.discount,
//     id: item.id,
//   });
//   this.items.push(budgetItem);
// }
// updateItem(id: string, item: UpdateBudgetItemProps): void {
//   const index = this.findItem(id);
//   const savedItem = this.items.at(index);
//   if (item.discount) savedItem.setDistount(item.discount);
//   if (item.product) savedItem.setProduct(item.product);
//   if (item.quantity) savedItem.setQuantity(item.quantity);
// }
// removeItem(id: string): void {
//   const index = this.findItem(id);
//   this.items.splice(index, 1);
// }
// private findItem(id: string): number {
//   const index = this.items.findIndex((i) => i.id === id);
//   if (index === -1) throw new Error('not found');
//   return index;
// }
