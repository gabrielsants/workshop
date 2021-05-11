import { File } from './file.model';
import { User } from './user.model';

export interface FileHistoric {
  id: number;
  modifiedIn: Date;
  file: File;
  user: User;
  message: string;
}
