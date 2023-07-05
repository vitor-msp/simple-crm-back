import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductDB {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ unique: true })
  id: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', nullable: false })
  value: number;

  constructor(id: string, description: string, value: number) {
    this.id = id;
    this.description = description;
    this.value = value;
  }
}
