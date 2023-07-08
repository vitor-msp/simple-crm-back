// import { CustomerDto } from '../customer/domain/contract/Customer.contract';

// export type CreateBudgetInputDto = {
//   customer: { id: string };
// };

// export type DefaultBudgetOutputDto = {
//   id: string;
// };

export type CreateBudgetItemInputDto = {
  product: { id: string };
  quantity: number;
  discount: number;
};

export type DefaultBudgetItemOutputDto = {
  id: string;
};

// export type GetBudgetOutputDto = {
//   id: string;
//   customer: CustomerDto;
//   items: GetBudgetItemOutputDto[];
// };

// export type UpdateBudgetInputDto = {
//   customer?: { id: string };
// };

export interface IBudgetItemUsecase {
  createItem(
    budgetId: string,
    dto: CreateBudgetItemInputDto,
  ): Promise<DefaultBudgetItemOutputDto>;
}
