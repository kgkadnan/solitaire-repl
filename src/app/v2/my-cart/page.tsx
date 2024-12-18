import { Metadata } from 'next';
import MyCart from '.';

export const metadata: Metadata = {
  title: 'KGK - My Cart'
};
export default function MainMyCart() {
  return (
    <>
      <MyCart />
    </>
  );
}
