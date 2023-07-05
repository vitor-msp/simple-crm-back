import { v4 as uuid } from 'uuid';
import {
  IProduct,
  ProductProps,
  ProductPropsCreate,
  ProductPropsDB,
} from './contract/Product.contract';

export class Product implements IProduct {
  private id: string;
  private description: string;
  private value: number;

  constructor(props: ProductProps) {
    if (props.saved) {
      if (!props.savedProps) throw new Error('missing data');
      this.buildFromDB(props.savedProps);
      return;
    }
    if (!props.notSavedProps) throw new Error('missing data');
    this.initialBuild(props.notSavedProps);
  }

  private buildFromDB(props: ProductPropsDB): void {
    const { description, id, value } = props;
    this.id = id;
    this.setDescription(description);
    this.setValue(value);
  }

  private initialBuild(props: ProductPropsCreate): void {
    const { description, value } = props;
    this.id = uuid();
    this.setDescription(description);
    this.setValue(value);
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setValue(value: number): void {
    this.value = value < 0 ? 0 : value;
  }

  get(): ProductPropsDB {
    return { id: this.id, description: this.description, value: this.value };
  }
}
