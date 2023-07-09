export type ProductDto = {
  id: string;
  description: string;
  value: number;
};

export type ProductBuildDto = {
  id?: string;
  description: string;
  value: number;
};

export interface IProduct {
  setDescription(description: string): void;
  setValue(value: number): void;
  get(): ProductDto;
}
