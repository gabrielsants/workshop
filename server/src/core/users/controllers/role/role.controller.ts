import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { Role } from '../../models/role.entity';
import { RolesService } from '../../services/roles/roles.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RolesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('save')
  async save(@Body() role: Role): Promise<string> {
    role = await this.roleService.save(role);
    return `A regra #${role.name} foi salva com sucesso!`;
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(@Body() role: Role): Promise<string> {
    role = await this.roleService.update(role);
    return `A regra #${role.name} foi atualizada com sucesso!`;
  }
}
