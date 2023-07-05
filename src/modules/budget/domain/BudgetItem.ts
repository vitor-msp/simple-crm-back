import { v4 as uuid } from 'uuid';
import { IProduct } from 'src/modules/product/domain/contract/Product.contract';
import {
  BudgetItemProps,
  BudgetItemPropsCreate,
  BudgetItemPropsDBIn,
  BudgetItemPropsDBOut,
  IBudgetItem,
} from './contract/BudgetItem.contract';

export class BudgetItem implements IBudgetItem {
  private id: string;
  private product: IProduct;
  private value: number;
  private quantity: number;
  private discount: number;

  constructor(props: BudgetItemProps) {
    if (props.saved) {
      if (!props.savedProps) throw new Error('missing data');
      this.buildFromDB(props.savedProps);
      return;
    }
    if (!props.notSavedProps) throw new Error('missing data');
    this.initialBuild(props.notSavedProps);
  }

  private initialBuild(props: BudgetItemPropsCreate): void {
    const { discount, product, quantity } = props;
    this.id = uuid();
    this.setProduct(product);
    this.setQuantity(quantity);
    this.setDiscount(discount);
  }

  private buildFromDB(props: BudgetItemPropsDBIn): void {
    const { discount, id, product, quantity } = props;
    this.id = id;
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

  get(): BudgetItemPropsDBOut {
    return {
      discount: this.discount,
      id: this.id,
      product: this.product.get(),
      quantity: this.quantity,
      value: this.value,
    };
  }
}
