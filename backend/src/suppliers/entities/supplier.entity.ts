// TypeORM decorators for entity definition and column management
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Supplier entity representing vendor/company information
 * Stores contact information for suppliers who provide products to the store
 */
@Entity()
export class Supplier {
  // Auto-generated primary key
  @PrimaryGeneratedColumn()
  id: number;

  // Official company or business name
  @Column()
  companyName: string;

  // Name of the primary contact person at the supplier
  @Column()
  contactName: string;

  // Email address for business communications
  @Column()
  email: string;

  // Phone number for direct contact
  @Column()
  phone: string;

  // Automatically set when the supplier record is created
  @CreateDateColumn()
  createdAt: Date;

  // Automatically updated when the supplier information is modified
  @UpdateDateColumn()
  updatedAt: Date;
}
