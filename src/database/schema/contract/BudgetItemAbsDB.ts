import { BudgetItemDto } from 'src/modules/budget/domain/contract/IBudgetItem';

export abstract class BudgetItemAbsDB {
  abstract get(): BudgetItemDto;
}
