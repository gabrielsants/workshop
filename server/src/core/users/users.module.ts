import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentController } from './controllers/department/department.controller';
import { RoleController } from './controllers/role/role.controller';
import { UsersController } from './controllers/user/users.controller';
import { Department } from './models/department.entity';
import { Role } from './models/role.entity';
import { User } from './models/user.entity';
import { DepartmentsService } from './services/departments/departments.service';
import { RolesService } from './services/roles/roles.service';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Department])],
  providers: [UsersService, RolesService, DepartmentsService],
  controllers: [DepartmentController, UsersController, RoleController],
  exports: [DepartmentsService, UsersService, RolesService],
})
export class UsersModule {}
