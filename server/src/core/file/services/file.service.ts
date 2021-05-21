import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { File } from '../models/file.entity';
import { IsNull } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
    private connection: Connection,
  ) {}

  async findAllFilesNotLinked(): Promise<File[]> {
    return await this.fileRepository.find({
      relations: ['productModel'],
      select: ['id', 'filename'],
      where: { productModel: IsNull() },
    });
  }

  async findAllWithRelations(): Promise<File[]> {
    return await this.fileRepository.find({
      relations: ['productModel'],
    });
  }

  findAll(): Promise<File[]> {
    return this.fileRepository.find();
  }

  findOne(id: string): Promise<File> {
    return this.fileRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.fileRepository.delete(id);
  }

  async save(file: File): Promise<File> {
    return await this.fileRepository.save(file);
  }

  async update(file: File): Promise<File> {
    return await this.fileRepository.save(file);
  }

  async updateEntity(entity: File): Promise<any> {
    return this.update(entity)
      .then(async () => await this.findOne(entity.id.toString()))
      .catch((error) => Promise.reject(error));
  }

  async getFileByKind(kind: number): Promise<File[]> {
    return await this.fileRepository.find({
      relations: ['productModel'],
      where: { kind: kind },
    });
  }
}
