import { ProductModel } from 'src/core/product/models/product-model.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'file' })
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  kind: number;

  @OneToOne((type) => ProductModel)
  @JoinColumn({ name: 'productModel_id' })
  productModel: ProductModel;
}
