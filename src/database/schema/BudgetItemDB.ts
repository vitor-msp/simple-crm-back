import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  Index,
} from 'typeorm';
import { ProductDB } from './ProductDB';
import { BudgetDB } from './BudgetDB';
import { BudgetItemDto } from 'src/modules/budget/domain/contract/IBudgetItem';
import { BudgetItemAbsDB } from './contract/BudgetItemAbsDB';

@Entity()
@Unique('unique_budget_product', ['budget', 'product'])
export class BudgetItemDB extends BudgetItemAbsDB {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ nullable: false, unique: true, length: 36 })
  @Index('budget_item_index')
  id: string;

  @ManyToOne(() => ProductDB, (product) => product.budgetItems)
  product: ProductDB;

  @Column('decimal', { precision: 11, scale: 2, nullable: false })
  value: number;

  @Column({ type: 'integer', nullable: false })
  quantity: number;

  @Column('decimal', { precision: 11, scale: 2, nullable: false })
  discount: number;

  @ManyToOne(() => BudgetDB, (budget) => budget.items, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  budget: BudgetDB;

  get(): BudgetItemDto {
    return {
      id: this.id,
      discount: this.discount,
      quantity: this.quantity,
      value: this.value,
    };
  }
}
