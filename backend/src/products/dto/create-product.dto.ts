/**
 * Data Transfer Object for creating new products
 * Defines the required fields when adding a new product to the store inventory
 */
export class CreateProductDto {
  // Product name (must be unique)
  name: string;
  
  // Product price in decimal format
  price: number;
  
  // Initial stock quantity
  stock: number;
  
  // ID of the category this product belongs to
  categoryId: number;
  
  // Product status (e.g., "In Stock", "Low Stock", "Out of Stock")
  status: string;
}
