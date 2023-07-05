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

  @Column({ type: 'text', nullable: false, unique: true })
  id: string;

  @OneToOne(() => CustomerDB)
  @JoinColumn()
  @Column({ nullable: false })
  customer: CustomerDB;

  @Column({ nullable: false })
  @OneToMany(() => BudgetItemDB, (item) => item.budget)
  items: BudgetItemDB[];

  constructor(id: string, customer: CustomerDB, items: BudgetItemDB[]) {
    this.id = id;
    this.customer = customer;
    this.items = items;
  }
}
