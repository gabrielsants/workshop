import { Department } from './department.model';
import { Role } from './role.model';

export interface User {
  id: number;
  email: string;
  password: string;
  full_name: string;
  role: Role;
  department: Department;
  isActive: boolean;
}
