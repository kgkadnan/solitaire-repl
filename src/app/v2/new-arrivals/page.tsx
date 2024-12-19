import { Metadata } from 'next';
import NewArrivals from '.';

export const metadata: Metadata = {
  title: 'KGK - New Arrivals'
};
export default function MainNewArrivals() {
  return (
    <>
      <NewArrivals />
    </>
  );
}
