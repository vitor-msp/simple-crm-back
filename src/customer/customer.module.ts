import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CustomerDB } from 'src/database/schema/CustomerDB';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerDB])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [TypeOrmModule],
})
export class CustomerModule {}
