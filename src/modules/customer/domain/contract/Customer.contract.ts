export type CustomerDto = {
  id: string;
  name: string;
  cpf: string;
};

export interface ICustomer {
  setName(name: string): void;
  setCpf(cpf: string): void;
  get(): CustomerDto;
}
