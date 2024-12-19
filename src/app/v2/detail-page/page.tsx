import { Metadata } from 'next';
import DetailPage from '.';

export const metadata: Metadata = {
  title: 'KGK - DNA'
};
export default function MainDetailPage() {
  return (
    <>
      <DetailPage />
    </>
  );
}
