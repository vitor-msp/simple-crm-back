import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BudgetDB } from 'src/database/schema/BudgetDB';
import { Repository } from 'typeorm';
import {
  CreateBudgetInputDto,
  DefaultBudgetOutputDto,
  GetBudgetOutputDto,
} from './budget.dto';
import { CustomerDB } from 'src/database/schema/CustomerDB';
import { Customer } from 'src/customer/domain/Customer';
import { Budget } from './domain/Budget';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(BudgetDB)
    private budgetsRepository: Repository<BudgetDB>,
    @InjectRepository(CustomerDB)
    private customersRepository: Repository<CustomerDB>,
  ) {}

  async create(dto: CreateBudgetInputDto): Promise<DefaultBudgetOutputDto> {
    const { customerId } = dto;
    const customerDB = await this.customersRepository.findOneBy({
      id: customerId,
    });
    if (!customerDB) throw new Error('customer not found');
    const { cpf, id, name } = customerDB;
    const customer = new Customer({ cpf, name, id });
    const budget = new Budget({ customer });
    const budgetDB = new BudgetDB(budget.id, customerDB, []);
    await this.budgetsRepository.save(budgetDB);
    return {
      id: budget.id,
    };
  }

  async get(id: string): Promise<GetBudgetOutputDto> {
    const budget = await this.budgetsRepository.findOne({
      where: { id },
      relations: { customer: true },
    });
    if (!budget) throw new Error('not found');
    return {
      id: budget.id,
      customerId: budget.customer.id,
      items: budget.items
        ? budget.items.map(({ discount, product, id, quantity, value }) => {
            return {
              discount,
              id,
              productId: product.id,
              quantity,
              value,
            };
          })
        : [],
    };
  }

  async getAll(): Promise<GetBudgetOutputDto[]> {
    const budgets = await this.budgetsRepository.find({
      relations: { customer: true },
    });
    return budgets.map((budget) => {
      const { customer, id } = budget;
      return {
        id,
        customerId: customer.id,
        items: budget.items
          ? budget.items.map(({ discount, product, id, quantity, value }) => {
              return {
                discount,
                id,
                productId: product.id,
                quantity,
                value,
              };
            })
          : [],
      };
    });
  }
}
