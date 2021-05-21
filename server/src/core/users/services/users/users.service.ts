import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUserWithRelations(id: string): Promise<User> {
    return this.userRepository.findOne({
      relations: ['role', 'department'],
      where: [{ id: id }],
    });
  }

  save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async updateEntity(entity: User): Promise<any> {
    return this.update(entity)
      .then(async () => await this.findOne(entity.id.toString()))
      .catch((error) => Promise.reject(error));
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findAllWithRelationship(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['role', 'department'],
    });
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      relations: ['role', 'department'],
      where: [{ email: email }],
    });
  }

  async getUser(_id: number): Promise<User[]> {
    return await this.userRepository.find({
      select: ['full_name', 'email'],
      where: [{ id: _id }],
    });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
