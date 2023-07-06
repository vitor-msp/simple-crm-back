import { CustomerDB } from '../../../database/schema/CustomerDB';
import { CustomerDto } from '../domain/contract/Customer.contract';

export abstract class CustomerBuilder {
  static hydrateDB(customerDB: CustomerDB, props: CustomerDto): void {
    const { cpf, id, name } = props;
    customerDB.id = id;
    customerDB.cpf = cpf;
    customerDB.name = name;
  }
}
