import { Metadata } from 'next';
import Search from './v2/search';

export const metadata: Metadata = {
  title: 'KGK - Dashboard'
};
export default function MainDashboard() {
  return (
    <>
      <Search />
    </>
  );
}
