import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private ProductRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const productFound = await this.ProductRepository.findOne({
      where: {
        name: createProductDto.name,
      },
    });

    if (productFound) {
      return new HttpException('Product already exists', HttpStatus.CONFLICT);
    }

    const newProduct = this.ProductRepository.create(createProductDto);
    return this.ProductRepository.save(newProduct);
  }

  findAll() {
    return this.ProductRepository.find({
      order: { id: 'DESC' },
    });
  }

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

  async update(id: number, updateProductDto: UpdateProductDto) {
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

  async remove(id: number) {
    const result = await this.ProductRepository.delete(id);

    if (result.affected === 0) {
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
