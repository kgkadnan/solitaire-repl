import { Metadata } from 'next';
import MyDiamonds from '.';

export const metadata: Metadata = {
  title: 'KGK - Your Orders'
};
export default function MainMyDiamonds() {
  return (
    <>
      <MyDiamonds />
    </>
  );
}
