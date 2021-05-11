import { ProductModel } from './product-model.model';

export interface File {
  id: number;
  filename: string;
  productModel: ProductModel;
  kind : number;
}
