import { CustomerDto } from 'src/modules/customer/domain/contract/ICustomer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerAbsDB } from './contract/CustomerAbsDB';

@Entity()
export class CustomerDB extends CustomerAbsDB {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ nullable: false, unique: true, length: 36 })
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ nullable: false, unique: true, length: 11 })
  cpf: string;

  get(): CustomerDto {
    return {
      id: this.id,
      cpf: this.cpf,
      name: this.name,
    };
  }
}
