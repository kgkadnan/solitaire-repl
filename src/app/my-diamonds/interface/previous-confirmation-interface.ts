import { IModalSetState } from '@/app/search/result/result-interface';
import { ICustomer, IPayment } from './my-invoice-interface';

interface IPreviousConfirmData {
  object: string;
  deal_no: string | null;
  comments: string;
  payment_term: number;
  invoice_id: string;
  invoice: any | null; // You might want to define a more specific type for invoice
  delivery: any | null; // You might want to define a more specific type for delivery
  id: string;
  created_at: string;
  status: string;
  fulfillment_status: string;
  payment_status: string;
  display_id: number;
  cart_id: string;
  customer_id: string;
  email: string;
  region_id: string;
  currency_code: string;
  tax_rate: number | null;
  customer: ICustomer;
  fulfillments: any[]; // You might want to define a more specific type for fulfillments
  payments: IPayment[];
  shipping_address: any | null; // You might want to define a more specific type for shipping_address
  subtotal: number;
  discount_total: number;
  total: number;
}

export interface IPreviousConfirmationProps {
  previousConfirmData: IPreviousConfirmData[]; // You might want to define a more specific type for this data
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
  limit: number;
  modalSetState: IModalSetState;
}
