import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductController } from './controllers/ProductController';
import { ProductDB } from 'src/database/schema/ProductDB';
import { ProductUsecase } from './use-cases/ProductUsecase';
import { ProductsRepository } from './repositories/ProductsRepository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductDB])],
  controllers: [ProductController],
  providers: [ProductUsecase, ProductsRepository],
})
export class ProductModule {}
