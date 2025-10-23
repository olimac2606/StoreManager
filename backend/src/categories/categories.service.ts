import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryFound = await this.CategoryRepository.findOne({
      where: {
        name: createCategoryDto.name,
      },
    });

    if (categoryFound) {
      return new HttpException('Category already exists', HttpStatus.CONFLICT);
    }

    const newCategory = this.CategoryRepository.create(createCategoryDto);
    return this.CategoryRepository.save(newCategory);
  }

  findAll() {
    return this.CategoryRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

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

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
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

  async remove(id: number) {
    const categoryFound = await this.CategoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!categoryFound) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    if (categoryFound.products.length > 0) {
      return new HttpException(
        'The category cannot be deleted because it has associated products',
        HttpStatus.CONFLICT,
      );
    }

    return this.CategoryRepository.delete(id);
  }
}
