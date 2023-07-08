import { CustomerAbsDB } from 'src/database/schema/contract/CustomerAbsDB';
import { ICustomer } from '../domain/contract/ICustomer';
import { ICustomersRepository } from './contract/ICustomersRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerDB } from 'src/database/schema/CustomerDB';
import { Customer } from '../domain/Customer';

@Injectable()
export class CustomersRepository implements ICustomersRepository {
  constructor(
    @InjectRepository(CustomerDB)
    private readonly customersRepository: Repository<CustomerDB>,
  ) {}

  async save(customer: ICustomer, customerDB?: CustomerDB): Promise<void> {
    if (!customerDB) customerDB = new CustomerDB();
    const { cpf, id, name } = customer.get();
    customerDB.id = id;
    customerDB.cpf = cpf;
    customerDB.name = name;
    await this.customersRepository.save(customerDB);
  }

  async get(
    id: string,
  ): Promise<{ customer: ICustomer; customerDB: CustomerAbsDB }> {
    const customerDB = await this.customersRepository.findOneBy({ id });
    if (!customerDB) throw new Error('not found');
    const customer = new Customer(customerDB.get());
    return { customer, customerDB };
  }

  async getAll(): Promise<ICustomer[]> {
    const customersDB = await this.customersRepository.find();
    return customersDB.map((c) => {
      return new Customer(c.get());
    });
  }

  async delete(id: string): Promise<void> {
    const result = await this.customersRepository.delete({ id });
    if (result.affected < 1) throw new Error('not found');
  }
}
