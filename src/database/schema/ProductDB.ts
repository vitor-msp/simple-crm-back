import { ProductDto } from 'src/modules/product/domain/contract/IProduct';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ProductAbsDB } from './contract/ProductAbsDB';

@Entity()
export class ProductDB extends ProductAbsDB {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ nullable: false, unique: true, length: 36 })
  id: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', nullable: false })
  value: number;

  get(): ProductDto {
    return {
      id: this.id,
      description: this.description,
      value: this.value,
    };
  }
}
