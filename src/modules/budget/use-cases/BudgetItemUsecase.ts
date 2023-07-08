import { Inject, Injectable } from '@nestjs/common';
import { DefaultBudgetOutputDto } from './contract/IBudgetUsecase';
import {
  CreateBudgetItemInputDto,
  DefaultBudgetItemOutputDto,
  IBudgetItemUsecase,
} from './contract/IBudgetItemUsecase';
import { BudgetsRepository } from '../repositories/BudgetsRepository';
import { IBudgetsRepository } from '../repositories/contract/IBudgetsRepository';
import { ProductsRepository } from 'src/modules/product/repositories/ProductsRepository';
import { IProductsRepository } from 'src/modules/product/repositories/contract/IProductsRepository';

@Injectable()
export class BudgetItemUsecase implements IBudgetItemUsecase {
  constructor(
    @Inject(BudgetsRepository)
    private readonly budgetsRepository: IBudgetsRepository,
    @Inject(ProductsRepository)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async createItem(
    budgetId: string,
    dto: CreateBudgetItemInputDto,
  ): Promise<DefaultBudgetOutputDto> {
    const { budget, budgetDB } = await this.budgetsRepository.get(budgetId);
    const { product, productDB } = await this.productsRepository.get(
      dto.product.id,
    );
    const { discount, quantity } = dto;
    const { itemId } = budget.createItem({ discount, quantity, product });
    await this.budgetsRepository.saveItem(budget, budgetDB, itemId, productDB);
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

  async deleteItem(
    budgetId: string,
    itemId: string,
  ): Promise<DefaultBudgetItemOutputDto> {
    const { budget, budgetDB } = await this.budgetsRepository.get(budgetId);
    budget.deleteItem(itemId);
    await this.budgetsRepository.deleteItem(budget, budgetDB, itemId);
    return {
      id: itemId,
    };
  }
}
