import { Metadata } from 'next';
import Turkey from '.';

export const metadata: Metadata = {
  title: 'KGK - Turkey'
};
export default function MainTurkey() {
  return (
    <>
      <Turkey />
    </>
  );
}
