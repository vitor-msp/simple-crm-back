import {
  CustomerPropsCreate,
  CustomerPropsDB,
} from './domain/contract/Customer.contract';

export type CreateCustomerInputDto = CustomerPropsCreate;

export type DefaultCustomerOutputDto = {
  id: string;
};

export type GetCustomerOutputDto = CustomerPropsDB;

export type UpdateCustomerInputDto = {
  name?: string;
  cpf?: string;
};
