import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
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
  id: string;

  @ManyToOne(() => ProductDB, (product) => product.budgetItems)
  product: ProductDB;

  @Column({ type: 'decimal', nullable: false })
  value: number;

  @Column({ type: 'integer', nullable: false })
  quantity: number;

  @Column({ type: 'decimal', nullable: false })
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
