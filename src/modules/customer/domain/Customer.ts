import { v4 as uuid } from 'uuid';
import { ICustomer } from './ICustomer';

export type CustomerProps = {
  id?: string;
  name: string;
  cpf: string;
};

export class Customer implements ICustomer {
  id: string;
  private name: string;
  private cpf: string;

  constructor(props: CustomerProps) {
    this.id = props.id ?? uuid();
    this.setName(props.name);
    this.setCpf(props.cpf);
  }

  setName(name: string): void {
    this.name = name;
  }
  setCpf(cpf: string): void {
    this.cpf = cpf;
  }
  getName(): string {
    return this.name;
  }
  getCpf(): string {
    return this.cpf;
  }
}
