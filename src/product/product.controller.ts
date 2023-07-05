import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductInputDto, PutProductInputDto } from './product.dto';
import { Response } from 'express';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async post(@Body() input: CreateProductInputDto, @Res() res: Response) {
    try {
      const output = await this.productService.create(input);
      res.status(HttpStatus.CREATED).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get('/:id')
  async get(@Param('id') id: string, @Res() res: Response) {
    try {
      const output = await this.productService.get(id);
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const output = await this.productService.getAll();
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Put('/:id')
  async put(
    @Param('id') id: string,
    @Body() input: PutProductInputDto,
    @Res() res: Response,
  ) {
    try {
      const output = await this.productService.update(id, input);
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const output = await this.productService.delete(id);
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
