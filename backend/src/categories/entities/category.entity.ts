// Import related entity for database relationships
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Category entity for organizing products into logical groups
 * Represents product categories that help organize store inventory
 */
@Entity()
export class Category {
  // Auto-generated primary key
  @PrimaryGeneratedColumn()
  id: number;

  // Category name (e.g., "Electronics", "Clothing", "Home & Garden")
  @Column()
  name: string;

  // One-to-many relationship: one category can have many products
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
