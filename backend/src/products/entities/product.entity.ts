// Import related entity for database relationships
import { Category } from 'src/categories/entities/category.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

/**
 * Product entity representing store inventory items
 * Defines the database schema for products with pricing, stock, and category relationships
 */
@Entity()
export class Product {
  // Auto-generated primary key
  @PrimaryGeneratedColumn()
  id: number;

  // Product name with unique constraint to prevent duplicates
  @Column({ unique: true })
  name: string;

  // Product price with decimal precision for accurate financial calculations
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  // Current stock quantity available for sale
  @Column()
  stock: number;

  // Product status (e.g., "In Stock", "Low Stock", "Out of Stock")
  @Column()
  status: string;

  // Foreign key reference to the category this product belongs to
  @Column()
  categoryId: number;

  // Many-to-one relationship: many products can belong to one category
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  // Automatically set when the product is created
  @CreateDateColumn()
  createdAt: Date;

  // Automatically updated when the product is modified
  @UpdateDateColumn()
  updatedAt: Date;
}
