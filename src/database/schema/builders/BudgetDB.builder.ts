import { BudgetPropsDBOut } from 'src/modules/budget/domain/contract/Budget.contract';
import { BudgetDB } from '../BudgetDB';
import { CustomerDB } from '../CustomerDB';

export abstract class BudgetDBBuilder {
  static hydrate(
    budget: BudgetDB,
    props: BudgetPropsDBOut,
    customer: CustomerDB,
  ): void {
    budget.id = props.id;
    budget.customer = customer;
    budget.items = [];
  }
}
