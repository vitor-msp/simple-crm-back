import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ProductDB } from './ProductDB';
import { BudgetDB } from './BudgetDB';

@Entity()
export class BudgetItemDB {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ type: 'text', nullable: false, unique: true })
  id: string;

  @OneToOne(() => ProductDB)
  @JoinColumn()
  @Column({ nullable: false })
  product: ProductDB;

  @Column({ type: 'decimal', nullable: false })
  value: number;

  @Column({ type: 'integer', nullable: false })
  quantity: number;

  @Column({ type: 'decimal', nullable: false })
  discount: number;

  @ManyToOne(() => BudgetDB, (budget) => budget.items)
  budget: BudgetDB;

  constructor(
    id: string,
    product: ProductDB,
    quantity: number,
    discount?: number,
  ) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
    this.discount = discount ?? 0;
  }
}
