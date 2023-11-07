export interface INotificationSetting {
  type: string;
  subscription: {
    category: string;
    is_subscribed: boolean;
  }[];
}
