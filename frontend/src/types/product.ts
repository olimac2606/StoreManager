/**
 * Type definitions for store management system
 * Defines data structures for products, categories, and related entities
 */

// Category type representing product categories
export type Category = {
  id: number;
  name: string;
};

// New category type for creating categories (without auto-generated ID)
export type NewCategory = Omit<Category, "id">;

// Product form type for creating/editing products
export type ProductFormType = {
  id?: number;
  name: string;
  categoryId: number;
  price: number;
  stock: number;
};

// Product status enumeration for inventory management
export type StatusValue = "In Stock" | "Medium" | "Low Stock";

// Product type representing store inventory items
export type Product = {
  id?: number;
  name: string;
  categoryId: number;
  price: number;
  stock: number;
  status?: StatusValue;
  amount?: number; // Optional amount field for sales/cart functionality
};
