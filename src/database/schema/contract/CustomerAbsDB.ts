import { CustomerDto } from 'src/modules/customer/domain/contract/ICustomer';

export abstract class CustomerAbsDB {
  abstract get(): CustomerDto;
}
