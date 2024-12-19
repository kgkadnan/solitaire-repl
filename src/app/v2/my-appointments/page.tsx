import { Metadata } from 'next';
import MyAppointments from '.';

export const metadata: Metadata = {
  title: 'KGK - My Appointments'
};
export default function MainMyAppointments() {
  return (
    <>
      <MyAppointments />
    </>
  );
}
