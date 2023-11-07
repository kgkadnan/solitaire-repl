export interface INotificationData {
  id: string;
  customer_id: string;
  template: string;
  parameter: {
    stoneId: string;
    abc: string;
  };
  category: string;
  sub_category: string;
  status: string;
  created_at: string;
  has_cta: boolean;
  external_link: string;
  redirect_identifier: string[];
}
