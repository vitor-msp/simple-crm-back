import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultBudgetOutputDto } from './budget.dto';
import { BudgetDB } from 'src/database/schema/BudgetDB';
import { BudgetBuilder } from './builders/BudgetBuilder';
import { ProductDB } from 'src/database/schema/ProductDB';
import { Product } from '../product/domain/Product';
import { CreateBudgetItemInputDto } from './budget-item.dto';
import { BudgetItemBuilder } from './builders/BudgetItemBuilder';

@Injectable()
export class BudgetItemService {
  constructor(
    @InjectRepository(BudgetDB)
    private budgetsRepository: Repository<BudgetDB>,
    @InjectRepository(ProductDB)
    private productsRepository: Repository<ProductDB>,
  ) {}

  async createItem(
    budgetId: string,
    dto: CreateBudgetItemInputDto,
  ): Promise<DefaultBudgetOutputDto> {
    const budgetDB = await this.budgetsRepository.findOne({
      where: { id: budgetId },
      relations: { customer: true, items: { product: true } },
    });
    if (!budgetDB) throw new Error('budget not found');
    const productDB = await this.productsRepository.findOneBy({
      id: dto.product.id,
    });
    if (!productDB) throw new Error('product not found');
    const budget = BudgetBuilder.hydrateDomain(budgetDB);
    const product = new Product(productDB.get());
    const { discount, quantity } = dto;
    const itemId = budget.createItem({ discount, quantity, product });
    BudgetItemBuilder.hydrateAndCreateItem(budgetDB, budget, productDB, itemId);
    await this.budgetsRepository.save(budgetDB);
    return {
      id: itemId,
    };
  }

  // async updateItem(
  //   id: string,
  //   input: UpdateBudgetInputDto,
  // ): Promise<DefaultBudgetOutputDto> {
  //   const budgetDB = await this.budgetsRepository.findOne({
  //     where: { id },
  //     relations: { customer: true, items: true },
  //   });
  //   if (!budgetDB) throw new Error('budget not found');
  //   let customerDB: CustomerDB = budgetDB.customer;
  //   const customer = new Customer(customerDB.get());
  //   const budget = new Budget(budgetDB.get());
  //   budget.setCustomer(customer);
  //   if (input.customer) {
  //     customerDB = await this.productsRepository.findOneBy({
  //       id: input.customer.id,
  //     });
  //     if (!customerDB) throw new Error('customer not found');
  //     budget.setCustomer(new Customer(customerDB.get()));
  //   }
  //   BudgetBuilder.hydrateDB(budgetDB, budget.get(), customerDB);
  //   await this.budgetsRepository.save(budgetDB);
  //   return {
  //     id: budgetDB.id,
  //   };
  // }

  // async deleteItem(id: string): Promise<DefaultBudgetOutputDto> {
  //   const result = await this.budgetsRepository.delete({ id });
  //   if (result.affected < 1) throw new Error('not found');
  //   return {
  //     id,
  //   };
  // }
}
