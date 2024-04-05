import { Metadata } from 'next';
import Dashboard from './dashboard';

export const metadata: Metadata = {
  title: 'Buy Diamonds in Few Clicks | KGK Diamonds',
  description:
    'Simplify your diamond buying with KGK Diamonds. where you can manage your diamonds, orders, and preferences seamlessly.'
};
export default function MainDashboard() {
  return (
    <>
      <Dashboard />
    </>
  );
}
