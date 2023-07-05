export type ProductProps = {
  saved: boolean;
  notSavedProps?: ProductPropsCreate;
  savedProps?: ProductPropsDB;
};

export type ProductPropsCreate = {
  description: string;
  value: number;
};

export type ProductPropsDB = {
  id: string;
  description: string;
  value: number;
};

export interface IProduct {
  setDescription(description: string): void;
  setValue(value: number): void;
  get(): ProductPropsDB;
}
