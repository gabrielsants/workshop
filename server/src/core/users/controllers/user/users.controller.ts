import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { User } from '../../models/user.entity';
import { UsersService } from '../../services/users/users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.findAllWithRelationship();
  }

  @UseGuards(JwtAuthGuard)
  @Post('save')
  async save(@Body() user: User): Promise<string> {
    user.isActive = true;
    user = await this.usersService.save(user);
    return `O usuário #{${user.full_name}} foi salvo com sucesso!`;
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(@Body() user: User): Promise<string> {
    user = await this.usersService.updateEntity(user);
    return `O usuário #${user.full_name} foi atualizado com sucesso!`;
  }
}
