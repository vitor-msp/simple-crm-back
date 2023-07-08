import { v4 as uuid } from 'uuid';
import { IProduct, ProductDto } from './contract/IProduct';

export type ProductBuildDto = {
  id?: string;
  description: string;
  value: number;
};

export class Product implements IProduct {
  private id: string;
  private description: string;
  private value: number;

  constructor(props: ProductBuildDto) {
    this.id = props.id ?? uuid();
    this.setDescription(props.description);
    this.setValue(props.value);
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setValue(value: number): void {
    this.value = value < 0 ? 0 : value;
  }

  get(): ProductDto {
    return { id: this.id, description: this.description, value: this.value };
  }
}
