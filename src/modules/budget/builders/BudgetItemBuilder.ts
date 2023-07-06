import { BudgetDB } from '../../../database/schema/BudgetDB';
import { IBudget } from '../domain/contract/Budget.contract';
import { BudgetItemDB } from 'src/database/schema/BudgetItemDB';
import { BudgetItemDto } from '../domain/contract/BudgetItem.contract';
import { ProductDB } from 'src/database/schema/ProductDB';

export abstract class BudgetItemBuilder {
  private static buildDB(
    budgetItemDB: BudgetItemDB,
    props: BudgetItemDto,
    productDB: ProductDB,
  ): BudgetItemDB {
    const { discount, id, quantity, value } = props;
    budgetItemDB.discount = discount;
    budgetItemDB.id = id;
    budgetItemDB.quantity = quantity;
    budgetItemDB.value = value;
    budgetItemDB.product = productDB;
    return budgetItemDB;
  }

  static hydrateAndCreateItem(
    budgetDB: BudgetDB,
    budget: IBudget,
    productDB: ProductDB,
    itemId: string,
  ): void {
    budgetDB.id = budget.get().id;
    const item = budget.getItems().find((i) => i.get().id === itemId);
    if (!item) throw new Error('item not found');
    const budgetItemDB = new BudgetItemDB();
    BudgetItemBuilder.buildDB(budgetItemDB, item.get(), productDB);
    budgetDB.items.push(budgetItemDB);
  }
}
