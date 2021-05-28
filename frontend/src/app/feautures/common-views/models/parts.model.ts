import { ProductModel } from './product-model.model';

export interface Parts {
  id: number;
  name: string;
  productModel: ProductModel;
}
