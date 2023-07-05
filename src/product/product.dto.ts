export type CreateProductInputDto = {
  description: string;
  value: number;
};
export type DefaultProductOutputDto = {
  id: string;
};

export type GetProductOutputDto = {
  id: string;
  description: string;
  value: number;
};

export type PutProductInputDto = {
  description?: string;
  value?: number;
};
