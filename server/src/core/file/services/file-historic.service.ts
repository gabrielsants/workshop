import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileHistoric } from '../models/file-historic.entity';

@Injectable()
export class FileHistoricService {
  constructor(
    @InjectRepository(FileHistoric)
    private fileHRepository: Repository<FileHistoric>,
  ) {}

  findAll(): Promise<FileHistoric[]> {
    return this.fileHRepository.find();
  }

  findOne(id: string): Promise<FileHistoric> {
    return this.fileHRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.fileHRepository.delete(id);
  }

  async save(fileHistoric: FileHistoric): Promise<void> {
    await this.fileHRepository.save(fileHistoric);
  }
}
