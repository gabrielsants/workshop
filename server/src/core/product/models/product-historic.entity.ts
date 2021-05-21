import { User } from 'src/core/users/models/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductModel } from './product-model.entity';

@Entity({ name: 'productHistoric' })
export class ProductHistoric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modifiedIn: Date;

  @Column()
  message: string;

  @OneToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne((type) => ProductModel)
  @JoinColumn({ name: 'productModel_id' })
  productModel: ProductModel;
}
