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
  Query,
  Res,
} from '@nestjs/common';
import { BudgetUsecase } from '../use-cases/BudgetUsecase';
import {
  CreateBudgetInputDto,
  IBudgetUsecase,
  UpdateBudgetInputDto,
} from '../use-cases/contract/IBudgetUsecase';
import { Response } from 'express';

@Controller('/budget')
export class BudgetController {
  constructor(
    @Inject(BudgetUsecase) private readonly budgetUsecase: IBudgetUsecase,
  ) {}

  @Post()
  async post(@Body() input: CreateBudgetInputDto, @Res() res: Response) {
    try {
      const output = await this.budgetUsecase.create(input);
      res.status(HttpStatus.CREATED).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get('/:id')
  async get(@Param('id') id: string, @Res() res: Response) {
    try {
      const output = await this.budgetUsecase.get(id);
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get()
  async getMany(@Query('customerId') customerId: string, @Res() res: Response) {
    try {
      const output = await this.budgetUsecase.getMany({ customerId });
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Put('/:id')
  async put(
    @Param('id') id: string,
    @Body() input: UpdateBudgetInputDto,
    @Res() res: Response,
  ) {
    try {
      const output = await this.budgetUsecase.update(id, input);
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const output = await this.budgetUsecase.delete(id);
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
