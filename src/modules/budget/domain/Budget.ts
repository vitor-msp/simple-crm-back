import { v4 as uuid } from 'uuid';
import {
  BudgetProps,
  BudgetPropsCreate,
  BudgetPropsDBIn,
  BudgetPropsDBOut,
  IBudget,
} from './contract/Budget.contract';
import { ICustomer } from 'src/modules/customer/domain/contract/Customer.contract';
import { IBudgetItem } from './contract/BudgetItem.contract';

export class Budget implements IBudget {
  private id: string;
  private items: IBudgetItem[] = [];
  private customer: ICustomer;

  constructor(props: BudgetProps) {
    if (props.saved) {
      if (!props.savedProps) throw new Error('missing data');
      this.buildFromDB(props.savedProps);
      return;
    }
    if (!props.notSavedProps) throw new Error('missing data');
    this.initialBuild(props.notSavedProps);
  }

  private initialBuild(props: BudgetPropsCreate): void {
    const { customer } = props;
    this.id = uuid();
    this.setCustomer(customer);
  }

  private buildFromDB(props: BudgetPropsDBIn): void {
    const { customer, id } = props;
    this.id = id;
    this.setCustomer(customer);
  }

  setCustomer(customer: ICustomer): void {
    this.customer = customer;
  }

  get(): BudgetPropsDBOut {
    return {
      customer: this.customer.get(),
      id: this.id,
      items: this.items.map((i) => {
        return i.get();
      }),
    };
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
