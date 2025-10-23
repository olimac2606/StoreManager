/**
 * Data Transfer Object for creating new product categories
 * Defines the required fields when adding a new category to organize products
 */
export class CreateCategoryDto {
  // Category ID (auto-generated, included for frontend compatibility)
  id: number;
  
  // Category display name (e.g., "Electronics", "Clothing")
  name: string;
  
  // Category value used for form handling and API communication
  value: string;
}
