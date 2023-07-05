import { CustomerPropsDB } from 'src/modules/customer/domain/contract/Customer.contract';
import { CustomerDB } from '../CustomerDB';

export abstract class CustomerDBBuilder {
  static hydrate(entity: CustomerDB, props: CustomerPropsDB): void {
    const { cpf, id, name } = props;
    entity.id = id;
    entity.cpf = cpf;
    entity.name = name;
  }
}
