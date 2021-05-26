import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { ProductHistoric } from '../../models/product-historic.entity';

@Injectable()
export class ProductHistoricService {
  constructor(
    @InjectRepository(ProductHistoric)
    private productHRepository: Repository<ProductHistoric>,
  ) {}

  findAll(): Promise<ProductHistoric[]> {
    return this.productHRepository.find();
  }

  findOne(id: string): Promise<ProductHistoric> {
    return this.productHRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productHRepository.delete(id);
  }

  async getHistoricsWithRelations(id: number): Promise<ProductHistoric[]> {
    return this.productHRepository.find({
      relations: ['productModel', 'user'],
      where: {
        productModel: id,
      },
    });
  }

  save(historic: ProductHistoric): Promise<ProductHistoric> {
    return this.productHRepository.save(historic);
  }
}
