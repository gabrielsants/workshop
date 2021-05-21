import { User } from 'src/core/users/models/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from './file.entity';

@Entity({ name: 'fileHistoric' })
export class FileHistoric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modifiedIn: Date;

  @Column()
  message: string;

  @OneToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne((type) => File)
  @JoinColumn({ name: 'file_id' })
  file: File;
}
