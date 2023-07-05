import { v4 as uuid } from 'uuid';
import {
  CustomerProps,
  CustomerPropsCreate,
  CustomerPropsDB,
  ICustomer,
} from './contract/Customer.contract';

export class Customer implements ICustomer {
  private id: string;
  private name: string;
  private cpf: string;

  constructor(props: CustomerProps) {
    if (props.saved) {
      if (!props.savedProps) throw new Error('missing data');
      this.buildFromDB(props.savedProps);
      return;
    }
    if (!props.notSavedProps) throw new Error('missing data');
    this.initialBuild(props.notSavedProps);
  }

  private buildFromDB(props: CustomerPropsDB): void {
    this.id = props.id;
    this.setName(props.name);
    this.setCpf(props.cpf);
  }

  private initialBuild(props: CustomerPropsCreate): void {
    this.id = uuid();
    this.setName(props.name);
    this.setCpf(props.cpf);
  }

  setName(name: string): void {
    this.name = name;
  }

  setCpf(cpf: string): void {
    this.cpf = cpf;
  }

  get(): CustomerPropsDB {
    return {
      cpf: this.cpf,
      id: this.id,
      name: this.name,
    };
  }
}
