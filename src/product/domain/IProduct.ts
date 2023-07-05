export interface IProduct {
  readonly id: string;
  setDescription(description: string): void;
  setValue(value: number): void;
  getDescription(): string;
  getValue(): number;
}
