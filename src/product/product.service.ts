import { Injectable } from '@nestjs/common';
import {
  CreateProductInputDto,
  DefaultProductOutputDto,
  GetProductOutputDto,
  PutProductInputDto,
} from './product.dto';
import { Product } from './domain/Product';

@Injectable()
export class ProductService {
  private readonly products: Product[] = [];

  create(dto: CreateProductInputDto): DefaultProductOutputDto {
    const { description, value } = dto;
    const product = new Product({
      description,
      value,
    });
    this.products.push(product);
    return {
      id: product.id,
    };
  }

  get(id: string): GetProductOutputDto {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new Error('not found');
    return {
      id: product.id,
      description: product.getDescription(),
      value: product.getValue(),
    };
  }

  getAll(): GetProductOutputDto[] {
    return this.products.map((p) => {
      return {
        id: p.id,
        description: p.getDescription(),
        value: p.getValue(),
      };
    });
  }

  update(id: string, input: PutProductInputDto): DefaultProductOutputDto {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('not found');
    const product = this.products[index];
    if (input.description) product.setDescription(input.description);
    if (input.value) product.setValue(input.value);
    return {
      id: product.id,
    };
  }

  delete(id: string): DefaultProductOutputDto {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('not found');
    const product = this.products.splice(index, 1);
    return {
      id: product[0].id,
    };
  }
}
