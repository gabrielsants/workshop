import { ProductModel } from 'src/core/product/models/product-model.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'parts' })
export class Parts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne((type) => ProductModel)
  @JoinColumn({ name: 'productModel_id' })
  productModel: ProductModel;
}
