interface ICustomerData {
  cart_id: string;
  country_code: string;
  company_name: string;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  kyc: any;
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  email: string;
  first_name: string;
  last_name: string;
  billing_address_id: string | null;
  phone: string;
  has_account: boolean;
  metadata: any | null;
  orders: any[];
  shipping_addresses: any[];
}

export interface IAuthDataResponse {
  customer: ICustomerData;
}
