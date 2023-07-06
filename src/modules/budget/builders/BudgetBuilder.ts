import { BudgetDB } from '../../../database/schema/BudgetDB';
import { CustomerDB } from '../../../database/schema/CustomerDB';
import { BudgetDto } from '../domain/contract/Budget.contract';

export abstract class BudgetBuilder {
  static hydrateDB(
    budgetDB: BudgetDB,
    props: BudgetDto,
    customer: CustomerDB,
  ): void {
    budgetDB.id = props.id;
    budgetDB.customer = customer;
  }
}
