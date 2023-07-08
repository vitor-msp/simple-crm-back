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
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  // @Put('/:id')
  // async put(
  //   @Param('id') id: string,
  //   @Body() input: UpdateBudgetInputDto,
  //   @Res() res: Response,
  // ) {
  //   try {
  //     const output = await this.budgetItemUsecase.update(id, input);
  //     res.status(HttpStatus.OK).json(output);
  //   } catch (error) {
  //     res.status(HttpStatus.BAD_REQUEST).send();
  //   }
  // }

  // @Delete('/:id')
  // async delete(@Param('id') id: string, @Res() res: Response) {
  //   try {
  //     const output = await this.budgetItemUsecase.delete(id);
  //     res.status(HttpStatus.OK).json(output);
  //   } catch (error) {
  //     res.status(HttpStatus.BAD_REQUEST).send();
  //   }
  // }
}