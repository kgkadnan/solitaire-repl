import { Metadata } from 'next';
import Dashboard from './v2/page';

export const metadata: Metadata = {
  title: 'KGK - Dashboard'
};
export default function MainDashboard() {
  return (
    <>
      <Dashboard />
    </>
  );
}
