import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProductInputDto,
  DefaultProductOutputDto,
  GetProductOutputDto,
  IProductUsecase,
  UpdateProductInputDto,
} from './contract/IProductUsecase';
import { Product } from '../domain/Product';
import { IProductsRepository } from '../repositories/contract/IProductsRepository';
import { ProductsRepository } from '../repositories/ProductsRepository';

@Injectable()
export class ProductUsecase implements IProductUsecase {
  constructor(
    @Inject(ProductsRepository)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async create(dto: CreateProductInputDto): Promise<DefaultProductOutputDto> {
    const { description, value } = dto;
    const product = new Product({
      description,
      value,
    });
    await this.productsRepository.save(product);
    return {
      id: product.get().id,
    };
  }

  async get(id: string): Promise<GetProductOutputDto> {
    const product = (await this.productsRepository.get(id)).product;
    return product.get();
  }

  async getAll(): Promise<GetProductOutputDto[]> {
    const products = await this.productsRepository.getAll();
    return products.map((p) => {
      return p.get();
    });
  }

  async update(
    id: string,
    input: UpdateProductInputDto,
  ): Promise<DefaultProductOutputDto> {
    const { product, productDB } = await this.productsRepository.get(id);
    if (input.description) product.setDescription(input.description);
    if (input.value) product.setValue(input.value);
    await this.productsRepository.save(product, productDB);
    return {
      id: product.get().id,
    };
  }

  async delete(id: string): Promise<DefaultProductOutputDto> {
    await this.productsRepository.delete(id);
    return {
      id,
    };
  }
}
