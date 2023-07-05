import { v4 as uuid } from 'uuid';

export type ProductProps = {
  id?: string;
  description: string;
  value: number;
};

export class Product {
  readonly id: string;
  private description: string;
  private value: number;

  constructor(props: ProductProps) {
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

  getDescription(): string {
    return this.description;
  }
  getValue(): number {
    return this.value;
  }
}
