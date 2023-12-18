import { IModalSetState } from '@/app/search/result/result-interface';

interface Customer {
  cart_id: string;
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  email: string;
  first_name: string;
  last_name: string;
  billing_address_id: string | null;
  phone: string | null;
  has_account: boolean;
  metadata: any | null; // You might want to define a more specific type for metadata
}

interface Payment {
  id: string;
  created_at: string;
  updated_at: string;
  swap_id: string | null;
  cart_id: string;
  order_id: string;
  amount: number;
  currency_code: string;
  amount_refunded: number;
  provider_id: string;
  data: any | null; // You might want to define a more specific type for data
  captured_at: string | null;
  canceled_at: string | null;
  metadata: any | null; // You might want to define a more specific type for metadata
  idempotency_key: string | null;
}

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
  customer: Customer;
  fulfillments: any[]; // You might want to define a more specific type for fulfillments
  payments: Payment[];
  shipping_address: any | null; // You might want to define a more specific type for shipping_address
  subtotal: number;
  discount_total: number;
  total: number;
}

export interface PreviousConfirmationProps {
  previousConfirmData: IPreviousConfirmData[]; // You might want to define a more specific type for this data
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
  limit: number;
  modalSetState: IModalSetState;
}
