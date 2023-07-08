import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CustomerDB } from 'src/database/schema/CustomerDB';
import { CustomerController } from './controllers/CustomerController';
import { CustomerUsecase } from './use-cases/CustomerUsecase';
import { CustomersRepository } from './repositories/CustomersRepository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerDB])],
  controllers: [CustomerController],
  providers: [CustomerUsecase, CustomersRepository],
})
export class CustomerModule {}
