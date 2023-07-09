import { CustomerDto } from 'src/modules/customer/domain/contract/ICustomer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { CustomerAbsDB } from './contract/CustomerAbsDB';
import { BudgetDB } from './BudgetDB';

@Entity()
export class CustomerDB extends CustomerAbsDB {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ nullable: false, unique: true, length: 36 })
  @Index('customer_index')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ nullable: false, unique: true, length: 11 })
  cpf: string;

  @OneToMany(() => BudgetDB, (budget) => budget.customer)
  budgets: BudgetDB[];

  get(): CustomerDto {
    return {
      id: this.id,
      cpf: this.cpf,
      name: this.name,
    };
  }
}
