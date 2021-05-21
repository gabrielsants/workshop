import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../models/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findOne(id: string): Promise<Role> {
    return this.roleRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }

  save(role: Role): Promise<Role> {
    return this.roleRepository.save(role);
  }

  async update(role: Role): Promise<Role> {
    const _role = await this.roleRepository.findOne(role.id);
    if (!_role) {
      throw new NotFoundException(`Role #${role.name} not found`);
    }
    return this.roleRepository.save(role);
  }
}
