import { ProductPropsDB } from 'src/modules/product/domain/contract/Product.contract';
import { ProductDB } from '../ProductDB';

export abstract class ProductDBBuilder {
  static hydrate(entity: ProductDB, props: ProductPropsDB): void {
    const { description, id, value } = props;
    entity.id = id;
    entity.description = description;
    entity.value = value;
  }
}
