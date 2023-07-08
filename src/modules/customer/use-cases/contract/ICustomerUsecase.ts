import { CustomerDto } from '../../domain/contract/ICustomer';

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

export interface ICustomerUsecase {
  create(dto: CreateCustomerInputDto): Promise<DefaultCustomerOutputDto>;
  get(id: string): Promise<GetCustomerOutputDto>;
  getAll(): Promise<GetCustomerOutputDto[]>;
  update(
    id: string,
    input: UpdateCustomerInputDto,
  ): Promise<DefaultCustomerOutputDto>;
  delete(id: string): Promise<DefaultCustomerOutputDto>;
}
