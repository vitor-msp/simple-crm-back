import { IProduct } from 'src/modules/product/domain/contract/IProduct';

export type BudgetItemDto = {
  id: string;
  value: number;
  quantity: number;
  discount: number;
};

export type BudgetItemBuildDto = {
  id?: string;
  product: IProduct;
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
