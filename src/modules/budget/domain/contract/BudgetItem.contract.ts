import { IProduct } from 'src/modules/product/domain/contract/Product.contract';

export type BudgetItemBuilderDto = {
  id?: string;
  product: IProduct;
  quantity: number;
  discount: number;
};

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
