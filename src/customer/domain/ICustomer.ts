export interface ICustomer {
  readonly id: string;
  setName(name: string): void;
  setCpf(cpf: string): void;
  getName(): string;
  getCpf(): string;
}
