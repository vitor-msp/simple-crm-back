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
  post(@Body() input: CreateProductInputDto): DefaultProductOutputDto {
    return this.productService.create(input);
  }

  @Get('/:id')
  get(@Param('id') id: string): GetProductOutputDto {
    return this.productService.get(id);
  }

  @Get()
  getAll(): GetProductOutputDto[] {
    return this.productService.getAll();
  }

  @Put('/:id')
  put(
    @Param('id') id: string,
    @Body() input: PutProductInputDto,
  ): DefaultProductOutputDto {
    return this.productService.update(id, input);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): DefaultProductOutputDto {
    return this.productService.delete(id);
  }
}
