export const CATEGORY_VALUES = [
  "all",
  "electronics",
  "clothing",
  "homeAndGarden",
  "sports",
] as const;
export type CategoryValue = (typeof CATEGORY_VALUES)[number];
export type CategoryKey = Exclude<CategoryValue, "all">;

export type ProductCategory =
  | "Electronics"
  | "Clothing"
  | "Home & Garden"
  | "Sports";

export const categoryMap = {
  Electronics: "electronics",
  Clothing: "clothing",
  "Home & Garden": "homeAndGarden",
  Sports: "sports",
} as const;

export const reverseCategoryMap = {
  electronics: "Electronics",
  clothing: "Clothing",
  homeAndGarden: "Home & Garden",
  sports: "Sports",
} as const;

export function isCategoryLabel(x: unknown): x is ProductCategory {
  return typeof x === "string" && x in categoryMap;
}
export function isCategoryKey(x: unknown): x is CategoryKey {
  return typeof x === "string" && x in reverseCategoryMap;
}

export function labelToValue(label: ProductCategory): CategoryKey {
  return categoryMap[label];
}
export function valueToLabel(value: CategoryKey): ProductCategory {
  return reverseCategoryMap[value];
}
