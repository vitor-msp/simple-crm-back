import { v4 as uuid } from 'uuid';
import { CreateBudgetItemProps, IBudgetItem } from './IBudgetItem';
import { IProduct } from 'src/product/domain/IProduct';

export class BudgetItem implements IBudgetItem {
  readonly id: string;
  private product: IProduct;
  private value: number;
  private quantity: number;
  private discount: number;

  constructor(props: CreateBudgetItemProps) {
    this.id = props.id ?? uuid();
    this.setProduct(props.product);
    this.setQuantity(props.quantity);
    this.setDistount(props.discount);
  }

  setProduct(product: IProduct): void {
    this.product = product;
    const value = product.getValue();
    this.value = value < 0 ? 0 : value;
  }
  setQuantity(quantity: number): void {
    this.quantity = quantity <= 0 ? 1 : quantity;
  }
  setDistount(discount?: number): void {
    if (!discount) discount = 0;
    this.discount = discount < 0 ? 0 : discount;
  }
  getProduct(): IProduct {
    return this.product;
  }
  getQuantity(): number {
    return this.quantity;
  }
  getDistount(): number {
    return this.discount;
  }
  getFinalValue(): number {
    return (1 - this.discount) * this.value;
  }
}
