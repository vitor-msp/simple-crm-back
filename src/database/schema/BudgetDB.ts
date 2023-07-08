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
import { BudgetDto } from 'src/modules/budget/domain/contract/IBudget';
import { BudgetAbsDB } from './contract/BudgetAbsDB';

@Entity()
export class BudgetDB extends BudgetAbsDB {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ nullable: false, unique: true, length: 36 })
  id: string;

  @OneToOne(() => CustomerDB)
  @JoinColumn()
  customer: CustomerDB;

  @OneToMany(() => BudgetItemDB, (item) => item.budget, {
    cascade: ['insert', 'update', 'remove'],
  })
  items: BudgetItemDB[];

  get(): BudgetDto {
    return {
      id: this.id,
    };
  }
}
