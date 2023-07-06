import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateBudgetInputDto,
  DefaultBudgetOutputDto,
  GetBudgetOutputDto,
  UpdateBudgetInputDto,
} from './budget.dto';
import { CustomerDB } from 'src/database/schema/CustomerDB';
import { Customer } from 'src/modules/customer/domain/Customer';
import { Budget } from './domain/Budget';
import { BudgetDB } from 'src/database/schema/BudgetDB';
import { BudgetBuilder } from './builders/BudgetBuilder';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(BudgetDB)
    private budgetsRepository: Repository<BudgetDB>,
    @InjectRepository(CustomerDB)
    private customersRepository: Repository<CustomerDB>,
  ) {}

  async create(dto: CreateBudgetInputDto): Promise<DefaultBudgetOutputDto> {
    const customerDB = await this.customersRepository.findOneBy({
      id: dto.customer.id,
    });
    if (!customerDB) throw new Error('customer not found');
    const customer = new Customer(customerDB.get());
    const budget = new Budget({});
    budget.setCustomer(customer);
    const budgetDB = new BudgetDB();
    BudgetBuilder.hydrateDB(budgetDB, budget.get(), customerDB);
    await this.budgetsRepository.save(budgetDB);
    return {
      id: budget.get().id,
    };
  }

  async get(id: string): Promise<GetBudgetOutputDto> {
    const budgetDB = await this.budgetsRepository.findOne({
      where: { id },
      relations: { customer: true, items: true },
    });
    if (!budgetDB) throw new Error('not found');
    return {
      ...budgetDB.get(),
      customer: budgetDB.customer.get(),
      items: [],
    };
  }

  async getAll(): Promise<GetBudgetOutputDto[]> {
    const budgetsDB = await this.budgetsRepository.find({
      relations: { customer: true, items: true },
    });
    return budgetsDB.map((budget) => {
      return {
        ...budget.get(),
        customer: budget.customer.get(),
        items: [],
      };
    });
  }

  async update(
    id: string,
    input: UpdateBudgetInputDto,
  ): Promise<DefaultBudgetOutputDto> {
    const budgetDB = await this.budgetsRepository.findOne({
      where: { id },
      relations: { customer: true, items: true },
    });
    if (!budgetDB) throw new Error('budget not found');
    let customerDB: CustomerDB = budgetDB.customer;
    const customer = new Customer(customerDB.get());
    const budget = new Budget(budgetDB.get());
    budget.setCustomer(customer);
    if (input.customer) {
      customerDB = await this.customersRepository.findOneBy({
        id: input.customer.id,
      });
      if (!customerDB) throw new Error('customer not found');
      budget.setCustomer(new Customer(customerDB.get()));
    }
    BudgetBuilder.hydrateDB(budgetDB, budget.get(), customerDB);
    await this.budgetsRepository.save(budgetDB);
    return {
      id: budgetDB.id,
    };
  }

  async delete(id: string): Promise<DefaultBudgetOutputDto> {
    const result = await this.budgetsRepository.delete({ id });
    if (result.affected < 1) throw new Error('not found');
    return {
      id,
    };
  }
}
