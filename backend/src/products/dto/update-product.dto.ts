// NestJS utility for creating partial DTOs
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

/**
 * Data Transfer Object for updating existing products
 * Makes all fields from CreateProductDto optional for partial updates
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
