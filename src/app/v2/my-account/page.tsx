import { Metadata } from 'next';
import MyAccount from '.';

export const metadata: Metadata = {
  title: 'KGK - My Account'
};
export default function MainMyAccount() {
  return (
    <>
      <MyAccount />
    </>
  );
}
