import { IProduct } from '../../search/result/result-interface';

export interface IProductItem {
  id: string;
  created_at: string;
  updated_at: string;
  cart_id: string;
  order_id: string | null;
  variant_id: string;
  product: IProduct;
}

interface ICart {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  items: IProductItem[];
}

export interface ICartData {
  cart: ICart;
}
