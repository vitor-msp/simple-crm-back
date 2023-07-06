import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BudgetItemService } from './budget-item.service';
import { CreateBudgetItemInputDto } from './budget-item.dto';

@Controller('/budget/:budgetId/item')
export class BudgetItemController {
  constructor(private readonly budgetItemService: BudgetItemService) {}

  @Post()
  async post(
    @Param('budgetId') budgetId: string,
    @Body() input: CreateBudgetItemInputDto,
    @Res() res: Response,
  ) {
    try {
      const output = await this.budgetItemService.createItem(budgetId, input);
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
  //     const output = await this.budgetItemService.update(id, input);
  //     res.status(HttpStatus.OK).json(output);
  //   } catch (error) {
  //     res.status(HttpStatus.BAD_REQUEST).send();
  //   }
  // }

  // @Delete('/:id')
  // async delete(@Param('id') id: string, @Res() res: Response) {
  //   try {
  //     const output = await this.budgetItemService.delete(id);
  //     res.status(HttpStatus.OK).json(output);
  //   } catch (error) {
  //     res.status(HttpStatus.BAD_REQUEST).send();
  //   }
  // }
}
