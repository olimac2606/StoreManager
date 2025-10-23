// NestJS core decorators and HTTP exception handling
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// DTOs for data validation and transfer
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// TypeORM decorators and repository pattern
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

/**
 * Products service handling business logic for product management
 * Provides CRUD operations and validation for store inventory
 */
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private ProductRepository: Repository<Product>,
  ) {}

  // Create a new product with duplicate name validation
  async create(createProductDto: CreateProductDto) {
    // Check if a product with the same name already exists
    const productFound = await this.ProductRepository.findOne({
      where: {
        name: createProductDto.name,
      },
    });

    if (productFound) {
      return new HttpException('Product already exists', HttpStatus.CONFLICT);
    }

    // Create and save the new product
    const newProduct = this.ProductRepository.create(createProductDto);
    return this.ProductRepository.save(newProduct);
  }

  // Retrieve all products ordered by ID in descending order (newest first)
  findAll() {
    return this.ProductRepository.find({
      order: { id: 'DESC' },
    });
  }

  // Find a specific product by ID with existence validation
  async findOne(id: number) {
    const productFound = await this.ProductRepository.findOne({
      where: {
        id,
      },
    });

    if (!productFound) {
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return productFound;
  }

  // Update an existing product with existence validation
  async update(id: number, updateProductDto: UpdateProductDto) {
    // Verify the product exists before updating
    const productFound = await this.ProductRepository.findOne({
      where: {
        id,
      },
    });

    if (!productFound) {
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return this.ProductRepository.update(id, updateProductDto);
  }

  // Remove a product with existence validation
  async remove(id: number) {
    const result = await this.ProductRepository.delete(id);

    // Check if any records were affected by the deletion
    if (result.affected === 0) {
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
