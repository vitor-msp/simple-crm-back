import { Inject, Injectable } from '@nestjs/common';
import {
  CreateBudgetInputDto,
  DefaultBudgetOutputDto,
  GetBudgetOutputDto,
  IBudgetUsecase,
  UpdateBudgetInputDto,
} from './contract/IBudgetUsecase';
import { Budget } from '../domain/Budget';
import { BudgetsRepository } from '../repositories/BudgetsRepository';
import { CustomersRepository } from 'src/modules/customer/repositories/CustomersRepository';
import { IBudgetsRepository } from '../repositories/contract/IBudgetsRepository';
import { ICustomersRepository } from 'src/modules/customer/repositories/contract/ICustomersRepository';

@Injectable()
export class BudgetUsecase implements IBudgetUsecase {
  constructor(
    @Inject(BudgetsRepository)
    private readonly budgetsRepository: IBudgetsRepository,
    @Inject(CustomersRepository)
    private readonly customersRepository: ICustomersRepository,
  ) {}

  async create(dto: CreateBudgetInputDto): Promise<DefaultBudgetOutputDto> {
    const { customer, customerDB } = await this.customersRepository.get(
      dto.customer.id,
    );
    const budget = new Budget({});
    budget.setCustomer(customer);
    await this.budgetsRepository.save(budget, null, customerDB);
    return {
      id: budget.get().id,
    };
  }

  async get(id: string): Promise<GetBudgetOutputDto> {
    const budget = (await this.budgetsRepository.get(id)).budget;
    return {
      ...budget.get(),
      customer: budget.getCustomer().get(),
      items: [],
    };
  }

  async getAll(): Promise<GetBudgetOutputDto[]> {
    const budgets = await this.budgetsRepository.getAll();
    return budgets.map((b) => {
      return {
        ...b.get(),
        customer: b.getCustomer().get(),
        items: [],
      };
    });
  }

  async update(
    id: string,
    input: UpdateBudgetInputDto,
  ): Promise<DefaultBudgetOutputDto> {
    const entities = await this.budgetsRepository.get(id);
    const { budget, budgetDB } = entities;
    let { customerDB } = entities;
    if (input.customer) {
      const entities = await this.customersRepository.get(input.customer.id);
      budget.setCustomer(entities.customer);
      customerDB = entities.customerDB;
    }
    await this.budgetsRepository.save(budget, budgetDB, customerDB);
    return {
      id: budget.get().id,
    };
  }

  async delete(id: string): Promise<DefaultBudgetOutputDto> {
    await this.budgetsRepository.delete(id);
    return {
      id,
    };
  }
}
