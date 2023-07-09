import { BudgetAbsDB } from 'src/database/schema/contract/BudgetAbsDB';
import { IBudget } from '../domain/contract/IBudget';
import { IBudgetsRepository } from './contract/IBudgetsRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BudgetDB } from 'src/database/schema/BudgetDB';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Budget } from '../domain/Budget';
import { CustomerDB } from 'src/database/schema/CustomerDB';
import { CustomerAbsDB } from 'src/database/schema/contract/CustomerAbsDB';
import { Customer } from 'src/modules/customer/domain/Customer';
import { ProductDB } from 'src/database/schema/ProductDB';
import { Product } from 'src/modules/product/domain/Product';
import { BudgetItemDB } from 'src/database/schema/BudgetItemDB';
import { IBudgetItem } from '../domain/contract/IBudgetItem';
import { GetManyQuery } from '../use-cases/contract/IBudgetUsecase';

@Injectable()
export class BudgetsRepository implements IBudgetsRepository {
  constructor(
    @InjectRepository(BudgetDB)
    private budgetsRepository: Repository<BudgetDB>,
  ) {}

  private copyPrimitiveData(budget: IBudget, budgetDB: BudgetDB): void {
    const { id } = budget.get();
    budgetDB.id = id;
  }

  async save(
    budget: IBudget,
    budgetDB?: BudgetDB,
    customerDB?: CustomerDB,
  ): Promise<void> {
    if (!budgetDB) budgetDB = new BudgetDB();
    this.copyPrimitiveData(budget, budgetDB);
    if (customerDB) budgetDB.customer = customerDB;
    await this.budgetsRepository.save(budgetDB);
  }

  async get(id: string): Promise<{
    budget: IBudget;
    budgetDB: BudgetAbsDB;
    customerDB: CustomerAbsDB;
  }> {
    const budgetDB = await this.budgetsRepository.findOne({
      where: { id },
      relations: { customer: true, items: { product: true } },
    });
    if (!budgetDB) throw new Error('not found');
    const budget = new Budget(budgetDB.get());
    budget.setCustomer(new Customer(budgetDB.customer.get()));
    budgetDB.items.forEach((i) => {
      const product = new Product(i.product.get());
      const { discount, id, quantity } = i.get();
      budget.createItem({ discount, product, quantity, id });
    });
    return { budget, budgetDB, customerDB: budgetDB.customer };
  }

  async getMany(query?: GetManyQuery): Promise<IBudget[]> {
    const where = this.getWhere(query);
    const budgetsDB = await this.budgetsRepository.find({
      where,
      relations: { customer: true, items: { product: true } },
    });
    return budgetsDB.map((b) => {
      const budget = new Budget(b.get());
      budget.setCustomer(new Customer(b.customer.get()));
      return budget;
    });
  }

  private getWhere(query?: GetManyQuery): FindOptionsWhere<BudgetDB> {
    let where: FindOptionsWhere<BudgetDB>;
    if (query.customerId)
      where = {
        ...where,
        customer: { id: query.customerId },
      };
    if (query.productId)
      where = {
        ...where,
        items: { product: { id: query.productId } },
      };
    return where;
  }

  async delete(id: string): Promise<void> {
    const result = await this.budgetsRepository.delete({ id });
    if (result.affected < 1) throw new Error('not found');
  }

  async saveItem(
    budget: IBudget,
    budgetDB: BudgetDB,
    itemId: string,
    productDB?: ProductDB,
  ): Promise<void> {
    let isCreate = false;
    this.copyPrimitiveData(budget, budgetDB);
    const budgetItem = budget.getItems().find((i) => i.get().id === itemId);
    if (!budgetItem) throw new Error('item not found');
    let budgetItemDB = budgetDB.items.find((i) => i.id === itemId);
    if (!budgetItemDB) {
      budgetItemDB = new BudgetItemDB();
      isCreate = true;
    }
    this.copyItemPrimitiveData(budgetItem, budgetItemDB);
    if (productDB) budgetItemDB.product = productDB;
    if (isCreate) budgetDB.items.push(budgetItemDB);
    await this.budgetsRepository.save(budgetDB);
  }

  private copyItemPrimitiveData(
    budgetItem: IBudgetItem,
    budgetItemDB: BudgetItemDB,
  ): void {
    const { discount, quantity, value, id } = budgetItem.get();
    budgetItemDB.discount = discount;
    budgetItemDB.id = id;
    budgetItemDB.quantity = quantity;
    budgetItemDB.value = value;
  }

  async deleteItem(
    budget: IBudget,
    budgetDB: BudgetDB,
    itemId: string,
  ): Promise<void> {
    this.copyPrimitiveData(budget, budgetDB);
    const index = budgetDB.items.findIndex((i) => i.id === itemId);
    budgetDB.items.splice(index, 1);
    await this.budgetsRepository.save(budgetDB);
  }
}
