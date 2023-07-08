import { Inject, Injectable } from '@nestjs/common';
import { DefaultBudgetOutputDto } from './contract/IBudgetUsecase';
import {
  CreateBudgetItemInputDto,
  DefaultBudgetItemOutputDto,
  IBudgetItemUsecase,
  UpdateBudgetItemInputDto,
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

  async updateItem(
    budgetId: string,
    itemId: string,
    dto: UpdateBudgetItemInputDto,
  ): Promise<DefaultBudgetItemOutputDto> {
    const { budget, budgetDB } = await this.budgetsRepository.get(budgetId);
    let product, productDB;
    if (dto.product) {
      const entities = await this.productsRepository.get(dto.product.id);
      product = entities.product;
      productDB = entities.productDB;
    }
    budget.updateItem(itemId, {
      discount: dto.discount,
      product: product,
      quantity: dto.quantity,
    });
    await this.budgetsRepository.saveItem(budget, budgetDB, itemId, productDB);
    return {
      id: itemId,
    };
  }

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
