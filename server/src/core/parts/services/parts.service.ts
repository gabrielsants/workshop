import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parts } from '../models/parts.entity';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Parts) private partsRepository: Repository<Parts>,
  ) {}

  async findAll(): Promise<Parts[]> {
    return await this.partsRepository.find({
      relations: ['productModel'],
    });
  }

  async findOne(id: string): Promise<Parts> {
    return await this.findOne(id);
  }

  async save(parts: Parts): Promise<Parts> {
    return await this.partsRepository.save(parts);
  }

  async update(pats: Parts): Promise<Parts> {
    return await this.partsRepository.save(pats);
  }

  async updateEntity(entity: Parts): Promise<any> {
    return this.update(entity)
      .then(async () => await this.findOne(entity.id.toString()))
      .catch((error) => Promise.reject(error));
  }
}
