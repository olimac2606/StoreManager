// NestJS core decorators and HTTP exception handling
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// DTOs for data validation and transfer
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

// TypeORM decorators and repository pattern
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

/**
 * Categories service handling business logic for category management
 * Provides CRUD operations and validation for product categories
 */
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
  ) {}

  // Create a new category with duplicate name validation
  async create(createCategoryDto: CreateCategoryDto) {
    // Check if a category with the same name already exists
    const categoryFound = await this.CategoryRepository.findOne({
      where: {
        name: createCategoryDto.name,
      },
    });

    if (categoryFound) {
      return new HttpException('Category already exists', HttpStatus.CONFLICT);
    }

    // Create and save the new category
    const newCategory = this.CategoryRepository.create(createCategoryDto);
    return this.CategoryRepository.save(newCategory);
  }

  // Retrieve all categories ordered by ID in descending order (newest first)
  findAll() {
    return this.CategoryRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  // Find a specific category by ID with existence validation
  async findOne(id: number) {
    const categoryFound = await this.CategoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!categoryFound) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return categoryFound;
  }

  // Update an existing category with existence validation
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    // Verify the category exists before updating
    const categoryFound = await this.CategoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!categoryFound) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return this.CategoryRepository.update(id, updateCategoryDto);
  }

  // Remove a category with existence and dependency validation
  async remove(id: number) {
    // Find the category with its associated products
    const categoryFound = await this.CategoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!categoryFound) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    // Prevent deletion if category has associated products
    if (categoryFound.products.length > 0) {
      return new HttpException(
        'The category cannot be deleted because it has associated products',
        HttpStatus.CONFLICT,
      );
    }

    return this.CategoryRepository.delete(id);
  }
}
