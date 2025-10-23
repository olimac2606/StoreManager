// NestJS core decorators and HTTP exception handling
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// DTOs for data validation and transfer
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

// TypeORM decorators and repository pattern
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';

/**
 * Suppliers service handling business logic for supplier management
 * Provides CRUD operations and validation for vendor/supplier information
 */
@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private SupplierRepository: Repository<Supplier>,
  ) {}

  // Create a new supplier with duplicate validation
  async create(createSupplierDto: CreateSupplierDto) {
    // Check if a supplier with the same contact and company already exists
    const supplierFound = await this.SupplierRepository.findOne({
      where: {
        contactName: createSupplierDto.contactName,
        companyName: createSupplierDto.companyName,
      },
    });

    if (supplierFound) {
      return new HttpException('Supplier already exists', HttpStatus.CONFLICT);
    }
    
    // Create and save the new supplier
    const newSupplier = this.SupplierRepository.create(createSupplierDto);
    return this.SupplierRepository.save(newSupplier);
  }

  // Retrieve all suppliers ordered by ID in descending order (newest first)
  findAll() {
    return this.SupplierRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  // Find a specific supplier by ID with existence validation
  async findOne(id: number) {
    const supplierFound = await this.SupplierRepository.findOne({
      where: {
        id,
      },
    });
    
    if (!supplierFound) {
      return new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
    }

    return supplierFound;
  }

  // Update an existing supplier with existence validation
  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    // Verify the supplier exists before updating
    const supplierFound = await this.SupplierRepository.findOne({
      where: {
        id,
      },
    });

    if (!supplierFound) {
      return new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
    }

    return this.SupplierRepository.update(id, updateSupplierDto);
  }

  // Remove a supplier with existence validation
  async remove(id: number) {
    const result = await this.SupplierRepository.delete(id);

    // Check if any records were affected by the deletion
    if (result.affected === 0) {
      return new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
    }
    
    return result;
  }
}
