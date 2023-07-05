import { Injectable } from '@nestjs/common';
import {
  CreateProductInputDto,
  DefaultProductOutputDto,
  GetProductOutputDto,
  PutProductInputDto,
} from './product.dto';
import { Product } from './domain/Product';
import { Repository } from 'typeorm';
import { ProductDB } from 'src/database/schema/ProductDB';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductDB)
    private productsRepository: Repository<ProductDB>,
  ) {}

  async create(dto: CreateProductInputDto): Promise<DefaultProductOutputDto> {
    const { description, value } = dto;
    const product = new Product({
      description,
      value,
    });
    const productDB = new ProductDB(
      product.id,
      product.getDescription(),
      product.getValue(),
    );
    await this.productsRepository.save(productDB);
    return {
      id: product.id,
    };
  }

  async get(id: string): Promise<GetProductOutputDto> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) throw new Error('not found');
    const { description, value } = product;
    return { description, id: product.id, value };
  }

  async getAll(): Promise<GetProductOutputDto[]> {
    const products = await this.productsRepository.find();
    return products.map(({ id, description, value }) => {
      return {
        id,
        description,
        value,
      };
    });
  }

  async update(
    id: string,
    input: PutProductInputDto,
  ): Promise<DefaultProductOutputDto> {
    const productDB = await this.productsRepository.findOneBy({ id });
    if (!productDB) throw new Error('not found');
    const { description, value } = productDB;
    const editedProduct = new Product({
      id: productDB.id,
      description: input.description ?? description,
      value: input.value ?? value,
    });
    productDB.description = editedProduct.getDescription();
    productDB.value = editedProduct.getValue();
    await this.productsRepository.save(productDB);
    return {
      id: productDB.id,
    };
  }

  async delete(id: string): Promise<DefaultProductOutputDto> {
    const result = await this.productsRepository.delete({ id });
    if (result.affected < 1) throw new Error('not found');
    return {
      id,
    };
  }
}
