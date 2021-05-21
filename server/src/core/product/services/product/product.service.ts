import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../models/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  save(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async update(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async updateEntity(entity: Product): Promise<any> {
    return this.update(entity)
      .then(async () => await this.findOne(entity.id.toString()))
      .catch((error) => Promise.reject(error));
  }
}
