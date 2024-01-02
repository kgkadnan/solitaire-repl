interface IInvoice {
  cin: string;
  currency: string;
  Invoice_id: string;
  Reference_no: number;
  total_amount: number;
  discount_amount: number;
}

interface IDelivery {
  link: string;
  tracking_id: string;
  partner_name: string;
}

export interface ICustomer {
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
  metadata: any; // You might want to define a more specific type for metadata
}

export interface IPayment {
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
  data: any; // You might want to define a more specific type for data
  captured_at: string | null;
  canceled_at: string | null;
  metadata: any; // You might want to define a more specific type for metadata
  idempotency_key: string | null;
}

export interface IMyInvoice {
  object: string;
  deal_no: string;
  comments: string;
  payment_term: number;
  invoice_id: string;
  invoice: IInvoice;
  delivery: IDelivery;
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
  shipping_address: any; // You might want to define a more specific type for shipping_address
  subtotal: number;
  discount_total: number;
  total: number;
}
