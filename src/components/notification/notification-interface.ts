export interface NotificationItem {
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
  created_at: string;
  updated_at: string;
}

interface NotificationData {
  data: NotificationItem[];
}

export interface NotificationProps {
  notificationData: NotificationData | null;
  setOffset: (offset: number) => void;
  offset: number;
  limit: number;
}

export interface NotificationParameter {
  stoneId: string;
}

export interface NotificationUpdate {
  id: string;
  status: 'read' | 'unread';
}
