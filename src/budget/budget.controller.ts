import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetInputDto } from './budget.dto';
import { Response } from 'express';

@Controller('/budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  async post(@Body() input: CreateBudgetInputDto, @Res() res: Response) {
    try {
      const output = await this.budgetService.create(input);
      res.status(HttpStatus.CREATED).json(output);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }
}
