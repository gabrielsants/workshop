import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductModel } from '../../models/product-model.entity';

@Injectable()
export class ProductLineService {
  constructor(
    @InjectRepository(ProductModel)
    private productLRepository: Repository<ProductModel>,
  ) {}

  findAll(): Promise<ProductModel[]> {
    return this.productLRepository.find();
  }

  findOne(id: string): Promise<ProductModel> {
    return this.productLRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productLRepository.delete(id);
  }

  async getProductAndModels(): Promise<ProductModel[]> {
    return await this.productLRepository.find({
      relations: ['product'],
    });
  }

  async save(productLine: ProductModel): Promise<ProductModel> {
    return this.productLRepository.save(productLine);
  }

  async update(productLine: ProductModel): Promise<ProductModel> {
    return await this.productLRepository.save(productLine);
  }

  async updateEntity(entity: ProductModel): Promise<any> {
    return this.update(entity)
      .then(async () => await this.findOne(entity.id.toString()))
      .catch((error) => Promise.reject(error));
  }
}
