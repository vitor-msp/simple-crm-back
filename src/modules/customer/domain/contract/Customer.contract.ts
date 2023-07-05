export type CustomerProps = {
  saved: boolean;
  notSavedProps?: CustomerPropsCreate;
  savedProps?: CustomerPropsDB;
};

export type CustomerPropsCreate = {
  name: string;
  cpf: string;
};

export type CustomerPropsDB = {
  id: string;
  name: string;
  cpf: string;
};

export interface ICustomer {
  setName(name: string): void;
  setCpf(cpf: string): void;
  get(): CustomerPropsDB;
}
