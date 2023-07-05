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
import { CustomerService } from './customer.service';
import { CreateCustomerInputDto, PutCustomerInputDto } from './customer.dto';
import { Response } from 'express';

@Controller('/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async post(@Body() input: CreateCustomerInputDto, @Res() res: Response) {
    try {
      const output = await this.customerService.create(input);
      res.status(HttpStatus.CREATED).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get('/:id')
  async get(@Param('id') id: string, @Res() res: Response) {
    try {
      const output = await this.customerService.get(id);
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const output = await this.customerService.getAll();
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Put('/:id')
  async put(
    @Param('id') id: string,
    @Body() input: PutCustomerInputDto,
    @Res() res: Response,
  ) {
    try {
      const output = await this.customerService.update(id, input);
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const output = await this.customerService.delete(id);
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
