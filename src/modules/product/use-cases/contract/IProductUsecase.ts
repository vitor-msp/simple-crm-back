import { ProductDto } from '../../domain/contract/IProduct';

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

export interface IProductUsecase {
  create(dto: CreateProductInputDto): Promise<DefaultProductOutputDto>;
  get(id: string): Promise<GetProductOutputDto>;
  getAll(): Promise<GetProductOutputDto[]>;
  update(
    id: string,
    input: UpdateProductInputDto,
  ): Promise<DefaultProductOutputDto>;
  delete(id: string): Promise<DefaultProductOutputDto>;
}
