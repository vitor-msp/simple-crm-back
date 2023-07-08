import { v4 as uuid } from 'uuid';
import { IProduct } from 'src/modules/product/domain/contract/IProduct';
import {
  BudgetItemBuildDto,
  BudgetItemDto,
  IBudgetItem,
} from './contract/IBudgetItem';

export class BudgetItem implements IBudgetItem {
  private id: string;
  private product: IProduct;
  private value: number;
  private quantity: number;
  private discount: number;

  constructor(props: BudgetItemBuildDto) {
    const { discount, product, quantity } = props;
    this.id = props.id ?? uuid();
    this.setProduct(product);
    this.setQuantity(quantity);
    this.setDiscount(discount);
  }

  setProduct(product: IProduct): void {
    this.product = product;
    const value = product.get().value;
    this.value = value < 0 ? 0 : value;
  }

  setQuantity(quantity: number): void {
    this.quantity = quantity <= 0 ? 1 : quantity;
  }

  setDiscount(discount?: number): void {
    if (!discount) discount = 0;
    this.discount = discount < 0 ? 0 : discount;
  }

  get(): BudgetItemDto {
    return {
      id: this.id,
      discount: this.discount,
      quantity: this.quantity,
      value: this.value,
    };
  }

  getProduct(): IProduct {
    return this.product;
  }
}
