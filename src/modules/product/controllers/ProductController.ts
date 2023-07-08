import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  CreateProductInputDto,
  IProductUsecase,
  UpdateProductInputDto,
} from '../use-cases/contract/IProductUsecase';
import { Response } from 'express';
import { ProductUsecase } from '../use-cases/ProductUsecase';

@Controller('/product')
export class ProductController {
  constructor(
    @Inject(ProductUsecase) private readonly productUsecase: IProductUsecase,
  ) {}

  @Post()
  async post(@Body() input: CreateProductInputDto, @Res() res: Response) {
    try {
      const output = await this.productUsecase.create(input);
      res.status(HttpStatus.CREATED).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get('/:id')
  async get(@Param('id') id: string, @Res() res: Response) {
    try {
      const output = await this.productUsecase.get(id);
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const output = await this.productUsecase.getAll();
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Put('/:id')
  async put(
    @Param('id') id: string,
    @Body() input: UpdateProductInputDto,
    @Res() res: Response,
  ) {
    try {
      const output = await this.productUsecase.update(id, input);
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const output = await this.productUsecase.delete(id);
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
