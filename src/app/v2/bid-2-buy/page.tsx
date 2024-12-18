import { Metadata } from 'next';
import BidToBuy from '.';

export const metadata: Metadata = {
  title: 'KGK - Bid to Buy'
};
export default function MainBidToBuy() {
  return (
    <>
      <BidToBuy />
    </>
  );
}
