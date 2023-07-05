import { Injectable } from '@nestjs/common';
import {
  CreateProductInputDto,
  DefaultProductOutputDto,
  GetProductOutputDto,
  UpdateProductInputDto,
} from './product.dto';
import { Product } from './domain/Product';
import { Repository } from 'typeorm';
import { ProductDB } from 'src/database/schema/ProductDB';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDBBuilder } from 'src/database/schema/builders/ProductDB.builder';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductDB)
    private productsRepository: Repository<ProductDB>,
  ) {}

  async create(dto: CreateProductInputDto): Promise<DefaultProductOutputDto> {
    const { description, value } = dto;
    const product = new Product({
      saved: false,
      notSavedProps: {
        description,
        value,
      },
    });
    const productDB = new ProductDB();
    ProductDBBuilder.hydrate(productDB, product.get());
    await this.productsRepository.save(productDB);
    return {
      id: product.get().id,
    };
  }

  async get(id: string): Promise<GetProductOutputDto> {
    const productDB = await this.productsRepository.findOneBy({ id });
    if (!productDB) throw new Error('not found');
    return productDB.get();
  }

  async getAll(): Promise<GetProductOutputDto[]> {
    const productsDB = await this.productsRepository.find();
    return productsDB.map((p) => {
      return p.get();
    });
  }

  async update(
    id: string,
    input: UpdateProductInputDto,
  ): Promise<DefaultProductOutputDto> {
    const productDB = await this.productsRepository.findOneBy({ id });
    if (!productDB) throw new Error('not found');
    const product = new Product({
      saved: true,
      savedProps: productDB.get(),
    });
    if (input.description) product.setDescription(input.description);
    if (input.value) product.setValue(input.value);
    ProductDBBuilder.hydrate(productDB, product.get());
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
