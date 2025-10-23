// NestJS utility for creating partial DTOs
import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';

/**
 * Data Transfer Object for updating existing suppliers
 * Makes all fields from CreateSupplierDto optional for partial updates
 */
export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {}
