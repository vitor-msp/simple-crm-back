import {
  IProduct,
  ProductPropsDB,
} from 'src/modules/product/domain/contract/Product.contract';

export type BudgetItemProps = {
  saved: boolean;
  notSavedProps?: BudgetItemPropsCreate;
  savedProps?: BudgetItemPropsDBIn;
};

export type BudgetItemPropsCreate = {
  product: IProduct;
  quantity: number;
  discount: number;
};

export type BudgetItemPropsDBIn = {
  id: string;
  product: IProduct;
  value: number;
  quantity: number;
  discount: number;
};

export type BudgetItemPropsDBOut = {
  id: string;
  product: ProductPropsDB;
  value: number;
  quantity: number;
  discount: number;
};

export interface IBudgetItem {
  setProduct(product: IProduct): void;
  setQuantity(quantity: number): void;
  setDiscount(discount: number): void;
  get(): BudgetItemPropsDBOut;
}
