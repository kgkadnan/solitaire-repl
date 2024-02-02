import {
  ICheckboxSetState,
  ICheckboxState
} from '@/components/common/checkbox/interface';
import {
  IErrorSetState,
  IErrorState,
  IModalSetState,
  IProduct,
  ITableColumn
} from '../../search/result/result-interface';

export interface IProductItem {
  id: string;
  created_at: string;
  updated_at: string;
  cart_id: string;
  order_id: string | null;
  variant_id: string;
  product: IProduct;
}

export interface ICart {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  items: IProductItem[];
}

export interface ICartData {
  cart: ICart;
}

interface IBaseMyCartProps {
  tableColumns: ITableColumn[];
  checkboxState: ICheckboxState;
  checkboxSetState: ICheckboxSetState;
  errorSetState: IErrorSetState;
  modalSetState: IModalSetState;
}

export interface IActiveMyCart extends IBaseMyCartProps {
  refetch: any;
  activeRows: any;
  modalState: any;
  downloadExcelFunction: () => void;
  errorState: IErrorState;
}

export interface IHoldProps extends IBaseMyCartProps {
  holdRows: any;
  downloadExcelFunction: () => void;
  errorState: IErrorState;
}

export interface IMemoOut extends IBaseMyCartProps {
  memoRows: any;
  downloadExcelFunction: () => void;
  errorState: IErrorState;
}

export interface IOutOfStock extends IBaseMyCartProps {
  soldOutRows: any;
}
