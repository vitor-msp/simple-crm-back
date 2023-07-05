import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { CustomerDB } from './CustomerDB';
import { BudgetItemDB } from './BudgetItemDB';
import { BudgetPropsDBOut } from 'src/modules/budget/domain/contract/Budget.contract';

@Entity()
export class BudgetDB {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ nullable: false, unique: true, length: 36 })
  id: string;

  @OneToOne(() => CustomerDB)
  @JoinColumn()
  customer: CustomerDB;

  @OneToMany(() => BudgetItemDB, (item) => item.budget)
  items: BudgetItemDB[];

  get(): BudgetPropsDBOut {
    return {
      id: this.id,
      customer: this.customer.get(),
      items: this.items.map((i) => {
        return i.get();
      }),
    };
  }
}
