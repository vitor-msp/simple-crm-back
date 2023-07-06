import { ProductDB } from '../../../database/schema/ProductDB';
import { ProductDto } from '../domain/contract/Product.contract';

export abstract class ProductBuilder {
  static hydrateDB(productDB: ProductDB, props: ProductDto): void {
    const { description, id, value } = props;
    productDB.id = id;
    productDB.description = description;
    productDB.value = value;
  }
}
