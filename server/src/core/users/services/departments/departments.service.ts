import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../../models/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  findAll(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  findOne(id: string): Promise<Department> {
    return this.departmentRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.departmentRepository.delete(id);
  }

  save(department: Department): Promise<Department> {
    return this.departmentRepository.save(department);
  }

  async update(department: Department): Promise<Department> {
    return await this.departmentRepository.save(department);
  }

  async updateEntity(entity: Department): Promise<any> {
    return this.update(entity)
      .then(async () => await this.findOne(entity.id.toString()))
      .catch((error) => Promise.reject(error));
  }
}
