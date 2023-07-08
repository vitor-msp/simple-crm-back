import { CustomerAbsDB } from 'src/database/schema/contract/CustomerAbsDB';
import { ICustomer } from '../../domain/contract/ICustomer';

export interface ICustomersRepository {
  save(customer: ICustomer, customerDB?: CustomerAbsDB): Promise<void>;
  get(id: string): Promise<{ customer: ICustomer; customerDB: CustomerAbsDB }>;
  getAll(): Promise<ICustomer[]>;
  delete(id: string): Promise<void>;
}
