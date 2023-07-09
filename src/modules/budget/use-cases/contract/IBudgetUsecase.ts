import { ProductDto } from 'src/modules/product/domain/contract/IProduct';
import { CustomerDto } from '../../../customer/domain/contract/ICustomer';

export type CreateBudgetInputDto = {
  customer: { id: string };
};

export type DefaultBudgetOutputDto = {
  id: string;
};

type GetBudgetItemOutputDto = {
  id: string;
  value: number;
  quantity: number;
  discount: number;
  product: ProductDto;
};

export type GetBudgetOutputDto = {
  id: string;
  customer: CustomerDto;
  items?: GetBudgetItemOutputDto[];
};

export type UpdateBudgetInputDto = {
  customer?: { id: string };
};

export type GetManyQuery = {
  customerId: string;
  productId: string;
};

export interface IBudgetUsecase {
  create(dto: CreateBudgetInputDto): Promise<DefaultBudgetOutputDto>;
  get(id: string): Promise<GetBudgetOutputDto>;
  getMany(query?: GetManyQuery): Promise<GetBudgetOutputDto[]>;
  update(
    id: string,
    input: UpdateBudgetInputDto,
  ): Promise<DefaultBudgetOutputDto>;
  delete(id: string): Promise<DefaultBudgetOutputDto>;
}
