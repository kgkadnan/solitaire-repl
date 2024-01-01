export interface INotificationItem {
  customer_id: string;
  template: string;
  parameter: {
    stoneId: string;
  };
  status: 'unread' | 'read' | 'unseen';
  external_link: string | null;
  redirect_identifier: string[];
  has_cta: boolean;
  category: string;
  sub_category: string;
  id: string;
  created_at: Date;
  updated_at: Date;
}

interface INotificationData {
  data: INotificationItem[];
}

export interface INotificationProps {
  notificationData: INotificationData | null;
  setOffset: (offset: number) => void;
  offset: number;
  limit: number;
}

export interface INotificationParameter {
  stoneId: string;
}

export interface INotificationUpdate {
  id: string;
  status: 'read' | 'unread';
}
