import { ProductDto } from 'src/modules/product/domain/contract/IProduct';

export abstract class ProductAbsDB {
  abstract get(): ProductDto;
}
