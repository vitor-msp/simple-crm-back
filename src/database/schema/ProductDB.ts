import { ProductDto } from 'src/modules/product/domain/contract/IProduct';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { ProductAbsDB } from './contract/ProductAbsDB';
import { BudgetItemDB } from './BudgetItemDB';

@Entity()
export class ProductDB extends ProductAbsDB {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ nullable: false, unique: true, length: 36 })
  @Index()
  id: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', nullable: false })
  value: number;

  @OneToMany(() => BudgetItemDB, (budgetItem) => budgetItem.product)
  budgetItems: BudgetItemDB[];

  get(): ProductDto {
    return {
      id: this.id,
      description: this.description,
      value: this.value,
    };
  }
}
