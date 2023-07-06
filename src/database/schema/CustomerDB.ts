import { CustomerDto } from 'src/modules/customer/domain/contract/Customer.contract';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerDB {
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
