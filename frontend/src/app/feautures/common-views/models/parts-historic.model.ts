import { Parts } from './parts.model';
import { User } from './user.model';

export interface PartsHisotic {
  id: number;
  user: User;
  parts: Parts;
  message: string;
  modifiedIn: Date;
}
