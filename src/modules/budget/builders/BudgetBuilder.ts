import { Customer } from 'src/modules/customer/domain/Customer';
import { BudgetDB } from '../../../database/schema/BudgetDB';
import { CustomerDB } from '../../../database/schema/CustomerDB';
import { Budget } from '../domain/Budget';
import { BudgetDto, IBudget } from '../domain/contract/Budget.contract';
import { Product } from 'src/modules/product/domain/Product';

export abstract class BudgetBuilder {
  static hydrateDB(
    budgetDB: BudgetDB,
    props: BudgetDto,
    customer: CustomerDB,
  ): void {
    budgetDB.id = props.id;
    budgetDB.customer = customer;
  }

  static hydrateDomain(budgetDB: BudgetDB): IBudget {
    const budget = new Budget(budgetDB.get());
    budget.setCustomer(new Customer(budgetDB.customer.get()));
    budgetDB.items.forEach((i) => {
      const product = new Product(i.product.get());
      const { discount, id, quantity } = i.get();
      budget.createItem({ discount, product, quantity, id });
    });
    return budget;
  }
}
