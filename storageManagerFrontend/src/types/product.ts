export const CATEGORY_VALUES = [
  "all",
  "electronics",
  "clothing",
  "homeAndGarden",
  "sports",
] as const;

export type CategoryValue = (typeof CATEGORY_VALUES)[number];

export type Option = {
  label: string;
  value: CategoryValue;
};

export type CategoryKey = Exclude<CategoryValue, "all">;

export type ProductForm = {
  id: number;
  name: string;
  category: CategoryKey;
  price: number;
  stock: number;
};

export type ProductCategory =
  | "Electronics"
  | "Clothing"
  | "Home & Garden"
  | "Sports";
export type StatusValue = "In Stock" | "Medium" | "Low Stock";

export type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status?: StatusValue;
  amount?: number;
};
