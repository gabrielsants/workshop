import { ProductModel } from './product-model.model';
import { User } from './user.model';

export interface ProductHistoric {
  id: number;
  modifiedIn: Date;
  productModel: ProductModel;
  message: string;
  user: User;
}
