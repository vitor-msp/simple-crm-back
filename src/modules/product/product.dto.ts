import { ProductDto } from './domain/contract/Product.contract';

export type CreateProductInputDto = {
  description: string;
  value: number;
};

export type DefaultProductOutputDto = {
  id: string;
};

export type GetProductOutputDto = ProductDto;

export type UpdateProductInputDto = {
  description?: string;
  value?: number;
};
