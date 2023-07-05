import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductDB } from 'src/database/schema/ProductDB';

@Module({
  imports: [TypeOrmModule.forFeature([ProductDB])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
