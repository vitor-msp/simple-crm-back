import {
  ProductPropsCreate,
  ProductPropsDB,
} from './domain/contract/Product.contract';

export type CreateProductInputDto = ProductPropsCreate;

export type DefaultProductOutputDto = {
  id: string;
};

export type GetProductOutputDto = ProductPropsDB;

export type UpdateProductInputDto = {
  description?: string;
  value?: number;
};
