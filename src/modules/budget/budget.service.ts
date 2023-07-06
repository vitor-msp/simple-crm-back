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
import { BudgetDBBuilder } from 'src/database/schema/builders/BudgetDB.builder';
import { BudgetDB } from 'src/database/schema/BudgetDB';
import { ICustomer } from '../customer/domain/contract/Customer.contract';

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
      id: dto.customerId,
    });
    if (!customerDB) throw new Error('customer not found');
    const customer = new Customer({
      saved: true,
      savedProps: customerDB.get(),
    });
    const budget = new Budget({ saved: false, notSavedProps: { customer } });
    const budgetDB = new BudgetDB();
    BudgetDBBuilder.hydrate(budgetDB, budget.get(), customerDB);
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
      id: budgetDB.id,
      customerId: budgetDB.customer.id,
      items: budgetDB.items
        ? budgetDB.items.map(({ discount, id, quantity, value, product }) => {
            return {
              discount,
              id,
              quantity,
              value,
              productId: product.id,
            };
          })
        : [],
    };
  }

  async getAll(): Promise<GetBudgetOutputDto[]> {
    const budgetsDB = await this.budgetsRepository.find({
      relations: { customer: true, items: true },
    });
    return budgetsDB.map((budget) => {
      const { customer, id } = budget;
      return {
        id,
        customerId: customer.id,
        items: budget.items
          ? budget.items.map(({ discount, id, quantity, value, product }) => {
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

  async update(
    id: string,
    input: UpdateBudgetInputDto,
  ): Promise<DefaultBudgetOutputDto> {
    const budgetDB = await this.budgetsRepository.findOne({
      where: { id },
      relations: { customer: true },
    });
    if (!budgetDB) throw new Error('budget not found');
    let customerDB: CustomerDB = budgetDB.customer;
    const customer = new Customer({
      saved: true,
      savedProps: customerDB.get(),
    });
    const budget = new Budget({
      saved: true,
      savedProps: {
        id: budgetDB.id,
        customer,
      },
    });
    let newCustomer: ICustomer;
    if (input.customerId) {
      customerDB = await this.customersRepository.findOneBy({
        id: input.customerId,
      });
      if (!customerDB) throw new Error('customer not found');
      newCustomer = new Customer({
        saved: true,
        savedProps: customerDB.get(),
      });
      budget.setCustomer(newCustomer);
    }
    BudgetDBBuilder.hydrate(budgetDB, budget.get(), customerDB);
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
