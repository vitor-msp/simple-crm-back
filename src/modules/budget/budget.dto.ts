export type CreateBudgetInputDto = {
  customerId: string;
};

export type DefaultBudgetOutputDto = {
  id: string;
};

type GetBudgetItemOutputDto = {
  id: string;
  productId: string;
  value: number;
  quantity: number;
  discount: number;
};

export type GetBudgetOutputDto = {
  id: string;
  customerId: string;
  items: GetBudgetItemOutputDto[];
};

export type UpdateBudgetInputDto = {
  customerId?: string;
};
