import { Metadata } from 'next';
import KYC from '.';

export const metadata: Metadata = {
  title: 'KGK - KYC'
};
export default function MainKYC() {
  return (
    <>
      <KYC />
    </>
  );
}
