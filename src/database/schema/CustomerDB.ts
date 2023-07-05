import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerDB {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ unique: true })
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'decimal', nullable: false, unique: true })
  cpf: string;

  constructor(id: string, name: string, cpf: string) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
  }
}
