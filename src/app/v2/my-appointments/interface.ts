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
      stones: any[];
      updated_at: string;
    }[];
  };
}

export interface IAppointmentData {
  appointment_type: string;
  customer_id: string;
  stones: string[];
  reason: string;
  address: string;
  appointment_at: string;
  status: string;
  id: string;
  created_at: string;
  updated_at: string;
}
