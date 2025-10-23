// NestJS utility for creating partial DTOs
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

/**
 * Data Transfer Object for updating existing categories
 * Makes all fields from CreateCategoryDto optional for partial updates
 */
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
