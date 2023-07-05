export type CreateCustomerInputDto = {
  name: string;
  cpf: string;
};
export type DefaultCustomerOutputDto = {
  id: string;
};

export type GetCustomerOutputDto = {
  id: string;
  name: string;
  cpf: string;
};

export type PutCustomerInputDto = {
  name?: string;
  cpf?: string;
};
