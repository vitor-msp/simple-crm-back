export type CreateBudgetItemInputDto = {
  product: { id: string };
  quantity: number;
  discount: number;
};

export type DefaultBudgetItemOutputDto = {
  id: string;
};

export type UpdateBudgetItemInputDto = {
  product?: { id: string };
  quantity?: number;
  discount?: number;
};

export interface IBudgetItemUsecase {
  createItem(
    budgetId: string,
    dto: CreateBudgetItemInputDto,
  ): Promise<DefaultBudgetItemOutputDto>;
  updateItem(
    budgetId: string,
    itemId: string,
    dto: UpdateBudgetItemInputDto,
  ): Promise<DefaultBudgetItemOutputDto>;
  deleteItem(
    budgetId: string,
    itemId: string,
  ): Promise<DefaultBudgetItemOutputDto>;
}
