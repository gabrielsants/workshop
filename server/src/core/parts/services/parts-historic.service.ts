import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartsHistoric } from '../models/parts-historic.entity';

@Injectable()
export class PartsHistoricService {
  constructor(
    @InjectRepository(PartsHistoric)
    private partsRepository: Repository<PartsHistoric>,
  ) {}

  async findAll(): Promise<PartsHistoric[]> {
    return await this.partsRepository.find({
      relations: ['parts', 'user'],
    });
  }

  async getHistoricsWithRelations(id: number): Promise<PartsHistoric[]> {
    return this.partsRepository.find({
      relations: ['parts', 'user'],
      where: {
        productModel: id,
      },
    });
  }

  async findOne(id: string): Promise<PartsHistoric> {
    return await this.findOne(id);
  }

  async save(historic: PartsHistoric): Promise<PartsHistoric> {
    return await this.partsRepository.save(historic);
  }

  async update(historic: PartsHistoric): Promise<PartsHistoric> {
    return await this.partsRepository.save(historic);
  }

  async updateEntity(entity: PartsHistoric): Promise<any> {
    return this.update(entity)
      .then(async () => await this.findOne(entity.id.toString()))
      .catch((error) => Promise.reject(error));
  }
}
