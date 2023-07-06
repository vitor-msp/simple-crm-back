import { CustomerDto } from './domain/contract/Customer.contract';

export type CreateCustomerInputDto = {
  name: string;
  cpf: string;
};

export type DefaultCustomerOutputDto = {
  id: string;
};

export type GetCustomerOutputDto = CustomerDto;

export type UpdateCustomerInputDto = {
  name?: string;
  cpf?: string;
};
