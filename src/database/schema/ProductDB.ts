import { ProductPropsDB } from 'src/modules/product/domain/contract/Product.contract';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductDB {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ nullable: false, unique: true, length: 36 })
  id: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', nullable: false })
  value: number;

  get(): ProductPropsDB {
    return {
      id: this.id,
      description: this.description,
      value: this.value,
    };
  }
}
