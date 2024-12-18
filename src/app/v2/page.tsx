import { Metadata } from 'next';
import Dashboard from './dashboard';

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
