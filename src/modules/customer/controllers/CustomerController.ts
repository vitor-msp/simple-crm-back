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
import { Response } from 'express';
import {
  CreateCustomerInputDto,
  ICustomerUsecase,
  UpdateCustomerInputDto,
} from '../use-cases/contract/ICustomerUsecase';
import { CustomerUsecase } from '../use-cases/CustomerUsecase';

@Controller('/customer')
export class CustomerController {
  constructor(
    @Inject(CustomerUsecase) private readonly customerUsecase: ICustomerUsecase,
  ) {}

  @Post()
  async post(@Body() input: CreateCustomerInputDto, @Res() res: Response) {
    try {
      const output = await this.customerUsecase.create(input);
      res.status(HttpStatus.CREATED).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get('/:id')
  async get(@Param('id') id: string, @Res() res: Response) {
    try {
      const output = await this.customerUsecase.get(id);
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const output = await this.customerUsecase.getAll();
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Put('/:id')
  async put(
    @Param('id') id: string,
    @Body() input: UpdateCustomerInputDto,
    @Res() res: Response,
  ) {
    try {
      const output = await this.customerUsecase.update(id, input);
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const output = await this.customerUsecase.delete(id);
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
