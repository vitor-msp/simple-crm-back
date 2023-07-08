import { ProductAbsDB } from 'src/database/schema/contract/ProductAbsDB';
import { IProduct } from '../../domain/contract/IProduct';

export interface IProductsRepository {
  save(product: IProduct, productDB?: ProductAbsDB): Promise<void>;
  get(id: string): Promise<{ product: IProduct; productDB: ProductAbsDB }>;
  getAll(): Promise<IProduct[]>;
  delete(id: string): Promise<void>;
}
