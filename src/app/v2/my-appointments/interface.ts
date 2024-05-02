export interface ITabsData {
  [key: string]: {
    keys: { label: string; accessor: string }[];
    data: {
      address: string;
      appointment_at: string;
      appointment_type: string;
      created_at: string;
      customer_id: string;
      id: string;
      reason: string | null;
      status: string;
      stones: any[]; // You can replace 'any[]' with a more specific type if possible
      updated_at: string;
    }[];
  };
}
