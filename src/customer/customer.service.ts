import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerDB } from 'src/database/schema/CustomerDB';
import { Repository } from 'typeorm';
import {
  CreateCustomerInputDto,
  DefaultCustomerOutputDto,
  GetCustomerOutputDto,
  PutCustomerInputDto,
} from './customer.dto';
import { Customer } from './domain/Customer';

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
    const customerDB = new CustomerDB(
      customer.id,
      customer.getName(),
      customer.getCpf(),
    );
    await this.customersRepository.save(customerDB);
    return {
      id: customer.id,
    };
  }

  async get(id: string): Promise<GetCustomerOutputDto> {
    const customer = await this.customersRepository.findOneBy({ id });
    if (!customer) throw new Error('not found');
    const { cpf, name } = customer;
    return { cpf, id: customer.id, name };
  }

  async getAll(): Promise<GetCustomerOutputDto[]> {
    const customers = await this.customersRepository.find();
    return customers.map(({ id, cpf, name }) => {
      return {
        id,
        cpf,
        name,
      };
    });
  }

  async update(
    id: string,
    input: PutCustomerInputDto,
  ): Promise<DefaultCustomerOutputDto> {
    const customerDB = await this.customersRepository.findOneBy({ id });
    if (!customerDB) throw new Error('not found');
    const { cpf, name } = customerDB;
    const editedCustomer = new Customer({
      id: customerDB.id,
      name: input.name ?? name,
      cpf: input.cpf ?? cpf,
    });
    customerDB.name = editedCustomer.getName();
    customerDB.cpf = editedCustomer.getCpf();
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
