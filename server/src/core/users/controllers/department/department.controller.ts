import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { Department } from '../../models/department.entity';
import { DepartmentsService } from '../../services/departments/departments.service';

@Controller('api/departments')
export class DepartmentController {
  constructor(private departmentService: DepartmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getDepartments(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('save')
  async save(@Body() department: Department): Promise<string> {
    department = await this.departmentService.save(department);
    return `O departamento #${department.name} foi salvo com sucesso!`;
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(@Body() department: Department): Promise<string> {
    department = await this.departmentService.update(department);
    return `O departamento #${department.name} foi atualizado com sucesso!`;
  }
}
