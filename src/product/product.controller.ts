import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductInputDto,
  DefaultProductOutputDto,
  GetProductOutputDto,
  PutProductInputDto,
} from './product.dto';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async post(
    @Body() input: CreateProductInputDto,
  ): Promise<DefaultProductOutputDto> {
    return this.productService.create(input);
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<GetProductOutputDto> {
    return this.productService.get(id);
  }

  @Get()
  async getAll(): Promise<GetProductOutputDto[]> {
    return this.productService.getAll();
  }

  @Put('/:id')
  async put(
    @Param('id') id: string,
    @Body() input: PutProductInputDto,
  ): Promise<DefaultProductOutputDto> {
    return this.productService.update(id, input);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<DefaultProductOutputDto> {
    return this.productService.delete(id);
  }
}
