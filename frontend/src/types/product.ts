export type Category = {
  id: number;
  name: string;
};

export type NewCategory = Omit<Category, "id">;

export type ProductFormType = {
  id?: number;
  name: string;
  categoryId: number;
  price: number;
  stock: number;
};

export type StatusValue = "In Stock" | "Medium" | "Low Stock";

export type Product = {
  id?: number;
  name: string;
  categoryId: number;
  price: number;
  stock: number;
  status?: StatusValue;
  amount?: number;
};
