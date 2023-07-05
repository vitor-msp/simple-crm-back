import { v4 as uuid } from 'uuid';
import { BudgetProps, IBudget, UpdateBudgetItemProps } from './IBudget';
import { Customer } from 'src/customer/domain/Customer';
import { IBudgetItem, CreateBudgetItemProps } from './IBudgetItem';
import { ICustomer } from 'src/customer/domain/ICustomer';
import { BudgetItem } from './BudgetItem';

export class Budget implements IBudget {
  readonly id: string;
  readonly items: IBudgetItem[];
  private customer: ICustomer;

  constructor(props: BudgetProps) {
    this.id = props.id ?? uuid();
    this.items = [];
    this.customer = props.customer;
  }

  setCustomer(customer: Customer): void {
    this.customer = customer;
  }
  createItem(item: CreateBudgetItemProps): void {
    const { product, quantity } = item;
    const budgetItem = new BudgetItem({
      product,
      quantity,
      discount: item.discount,
      id: item.id,
    });
    this.items.push(budgetItem);
  }
  updateItem(id: string, item: UpdateBudgetItemProps): void {
    const index = this.findItem(id);
    const savedItem = this.items.at(index);
    if (item.discount) savedItem.setDistount(item.discount);
    if (item.product) savedItem.setProduct(item.product);
    if (item.quantity) savedItem.setQuantity(item.quantity);
  }
  removeItem(id: string): void {
    const index = this.findItem(id);
    this.items.splice(index, 1);
  }
  private findItem(id: string): number {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) throw new Error('not found');
    return index;
  }
  getItems(): IBudgetItem[] {
    return this.items;
  }
  getCustomer(): ICustomer {
    return this.customer;
  }
  getTotalValue(): number {
    return this.items.reduce((prev: number, curr: IBudgetItem) => {
      return curr.getFinalValue() + prev;
    }, 0);
  }
}
