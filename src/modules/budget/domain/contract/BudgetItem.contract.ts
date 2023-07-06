import { IProduct } from 'src/modules/product/domain/contract/Product.contract';

export type BudgetItemDto = {
  id: string;
  value: number;
  quantity: number;
  discount: number;
};

export interface IBudgetItem {
  setProduct(product: IProduct): void;
  setQuantity(quantity: number): void;
  setDiscount(discount: number): void;
  get(): BudgetItemDto;
  getProduct(): IProduct;
}
