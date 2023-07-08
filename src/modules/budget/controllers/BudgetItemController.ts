import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  CreateBudgetItemInputDto,
  IBudgetItemUsecase,
  UpdateBudgetItemInputDto,
} from '../use-cases/contract/IBudgetItemUsecase';
import { BudgetItemUsecase } from '../use-cases/BudgetItemUsecase';

@Controller('/budget/:budgetId/item')
export class BudgetItemController {
  constructor(
    @Inject(BudgetItemUsecase)
    private readonly budgetItemUsecase: IBudgetItemUsecase,
  ) {}

  @Post()
  async post(
    @Param('budgetId') budgetId: string,
    @Body() input: CreateBudgetItemInputDto,
    @Res() res: Response,
  ) {
    try {
      const output = await this.budgetItemUsecase.createItem(budgetId, input);
      res.status(HttpStatus.CREATED).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Put('/:itemId')
  async put(
    @Param('budgetId') budgetId: string,
    @Param('itemId') itemId: string,
    @Body() input: UpdateBudgetItemInputDto,
    @Res() res: Response,
  ) {
    try {
      const output = await this.budgetItemUsecase.updateItem(
        budgetId,
        itemId,
        input,
      );
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Delete('/:itemId')
  async delete(
    @Param('budgetId') budgetId: string,
    @Param('itemId') itemId: string,
    @Res() res: Response,
  ) {
    try {
      const output = await this.budgetItemUsecase.deleteItem(budgetId, itemId);
      res.status(HttpStatus.OK).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
