import { Product } from './product.model';

export interface ProductModel {
  id: number;
  name: string;
  product: Product;
  isActive: boolean;
}
