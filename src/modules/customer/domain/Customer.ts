import { v4 as uuid } from 'uuid';
import { CustomerBuildDto, CustomerDto, ICustomer } from './contract/ICustomer';

export class Customer implements ICustomer {
  private id: string;
  private name: string;
  private cpf: string;

  constructor(props: CustomerBuildDto) {
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

  get(): CustomerDto {
    return {
      cpf: this.cpf,
      id: this.id,
      name: this.name,
    };
  }
}
