import { Controller, Get } from '@nestjs/common';

@Controller('/budget')
export class BudgetController {
  @Get()
  get() {
    return 'budget';
  }
}
