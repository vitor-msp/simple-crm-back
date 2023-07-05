import { IProduct } from 'src/product/domain/IProduct';

export type CreateBudgetItemProps = {
  id?: string;
  product: IProduct;
  quantity: number;
  discount?: number;
};

export interface IBudgetItem {
  readonly id: string;
  setProduct(product: IProduct): void;
  setQuantity(quantity: number): void;
  setDistount(discount: number): void;
  getProduct(): IProduct;
  getQuantity(): number;
  getDistount(): number;
  getFinalValue(): number;
}
