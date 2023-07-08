import { BudgetDto } from 'src/modules/budget/domain/contract/IBudget';

export abstract class BudgetAbsDB {
  abstract get(): BudgetDto;
}
