import { Inject, Injectable } from '@nestjs/common';
import {
  CreateCustomerInputDto,
  DefaultCustomerOutputDto,
  GetCustomerOutputDto,
  ICustomerUsecase,
  UpdateCustomerInputDto,
} from './contract/ICustomerUsecase';
import { CustomersRepository } from '../repositories/CustomersRepository';
import { ICustomersRepository } from '../repositories/contract/ICustomersRepository';
import { Customer } from '../domain/Customer';

@Injectable()
export class CustomerUsecase implements ICustomerUsecase {
  constructor(
    @Inject(CustomersRepository)
    private readonly customersRepository: ICustomersRepository,
  ) {}

  async create(dto: CreateCustomerInputDto): Promise<DefaultCustomerOutputDto> {
    const { cpf, name } = dto;
    const customer = new Customer({
      cpf,
      name,
    });
    await this.customersRepository.save(customer);
    return {
      id: customer.get().id,
    };
  }

  async get(id: string): Promise<GetCustomerOutputDto> {
    const customer = (await this.customersRepository.get(id)).customer;
    return customer.get();
  }

  async getAll(): Promise<GetCustomerOutputDto[]> {
    const customers = await this.customersRepository.getAll();
    return customers.map((c) => {
      return c.get();
    });
  }

  async update(
    id: string,
    input: UpdateCustomerInputDto,
  ): Promise<DefaultCustomerOutputDto> {
    const { customer, customerDB } = await this.customersRepository.get(id);
    if (input.cpf) customer.setCpf(input.cpf);
    if (input.name) customer.setName(input.name);
    await this.customersRepository.save(customer, customerDB);
    return {
      id: customer.get().id,
    };
  }

  async delete(id: string): Promise<DefaultCustomerOutputDto> {
    await this.customersRepository.delete(id);
    return {
      id,
    };
  }
}
