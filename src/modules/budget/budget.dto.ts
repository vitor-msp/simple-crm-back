import { CustomerDto } from '../customer/domain/contract/ICustomer';

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
  product: { id: string };
};

export type GetBudgetOutputDto = {
  id: string;
  customer: CustomerDto;
  items: GetBudgetItemOutputDto[];
};

export type UpdateBudgetInputDto = {
  customer?: { id: string };
};
