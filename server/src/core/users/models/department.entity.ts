import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'department' })
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
