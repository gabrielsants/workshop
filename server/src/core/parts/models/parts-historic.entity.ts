import { User } from 'src/core/users/models/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Parts } from './parts.entity';

@Entity({ name: 'partsHistoric' })
export class PartsHistoric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modifiedIn: Date;

  @Column()
  message: string;

  @OneToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne((type) => User)
  @JoinColumn({ name: 'parts_id' })
  part: Parts;
}
