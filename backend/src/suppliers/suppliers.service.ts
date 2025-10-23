import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private SupplierRepository: Repository<Supplier>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    const supplierFound = await this.SupplierRepository.findOne({
      where: {
        contactName: createSupplierDto.contactName,
        companyName: createSupplierDto.companyName,
      },
    });

    if (supplierFound) {
      return new HttpException('Supplier already exists', HttpStatus.CONFLICT);
    }
    const newSupplier = this.SupplierRepository.create(createSupplierDto);
    return this.SupplierRepository.save(newSupplier);
  }
  findAll() {
    return this.SupplierRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

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

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
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

  async remove(id: number) {
    const result = await this.SupplierRepository.delete(id);

    if (result.affected === 0) {
      return new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
