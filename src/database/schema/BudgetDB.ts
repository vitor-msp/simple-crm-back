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

  constructor(id: string, customer: CustomerDB, items: BudgetItemDB[]) {
    this.id = id;
    this.customer = customer;
    this.items = items;
  }
}
