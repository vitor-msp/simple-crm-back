import { InjectRepository } from '@nestjs/typeorm';
import { IProduct } from '../domain/contract/IProduct';
import { IProductsRepository } from './contract/IProductsRepository';
import { ProductDB } from 'src/database/schema/ProductDB';
import { Repository } from 'typeorm';
import { Product } from '../domain/Product';
import { Injectable } from '@nestjs/common';
import { ProductAbsDB } from 'src/database/schema/contract/ProductAbsDB';

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(
    @InjectRepository(ProductDB)
    private readonly productsRepository: Repository<ProductDB>,
  ) {}

  async save(product: IProduct, productDB?: ProductDB): Promise<void> {
    if (!productDB) productDB = new ProductDB();
    const { description, id, value } = product.get();
    productDB.id = id;
    productDB.description = description;
    productDB.value = value;
    await this.productsRepository.save(productDB);
  }

  async get(
    id: string,
  ): Promise<{ product: IProduct; productDB: ProductAbsDB }> {
    const productDB = await this.productsRepository.findOneBy({ id });
    if (!productDB) throw new Error('not found');
    const product = new Product(productDB.get());
    return { product, productDB };
  }

  async getAll(): Promise<IProduct[]> {
    const productsDB = await this.productsRepository.find();
    return productsDB.map((p) => {
      return new Product(p.get());
    });
  }

  async delete(id: string): Promise<void> {
    const result = await this.productsRepository.delete({ id });
    if (result.affected < 1) throw new Error('not found');
  }
}
