import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerDB } from 'src/database/schema/CustomerDB';
import { Repository } from 'typeorm';
import {
  CreateCustomerInputDto,
  DefaultCustomerOutputDto,
  GetCustomerOutputDto,
  UpdateCustomerInputDto,
} from './customer.dto';
import { Customer } from './domain/Customer';
import { CustomerBuilder } from './builders/CustomerBuilder';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerDB)
    private customersRepository: Repository<CustomerDB>,
  ) {}

  async create(dto: CreateCustomerInputDto): Promise<DefaultCustomerOutputDto> {
    const { cpf, name } = dto;
    const customer = new Customer({
      cpf,
      name,
    });
    const customerDB = new CustomerDB();
    CustomerBuilder.hydrateDB(customerDB, customer.get());
    await this.customersRepository.save(customerDB);
    return {
      id: customer.get().id,
    };
  }

  async get(id: string): Promise<GetCustomerOutputDto> {
    const customerDB = await this.customersRepository.findOneBy({ id });
    if (!customerDB) throw new Error('not found');
    return customerDB.get();
  }

  async getAll(): Promise<GetCustomerOutputDto[]> {
    const customersDB = await this.customersRepository.find();
    return customersDB.map((c) => {
      return c.get();
    });
  }

  async update(
    id: string,
    input: UpdateCustomerInputDto,
  ): Promise<DefaultCustomerOutputDto> {
    const customerDB = await this.customersRepository.findOneBy({ id });
    if (!customerDB) throw new Error('not found');
    const customer = new Customer(customerDB.get());
    if (input.cpf) customer.setCpf(input.cpf);
    if (input.name) customer.setName(input.name);
    CustomerBuilder.hydrateDB(customerDB, customer.get());
    await this.customersRepository.save(customerDB);
    return {
      id: customerDB.id,
    };
  }

  async delete(id: string): Promise<DefaultCustomerOutputDto> {
    const result = await this.customersRepository.delete({ id });
    if (result.affected < 1) throw new Error('not found');
    return {
      id,
    };
  }
}
