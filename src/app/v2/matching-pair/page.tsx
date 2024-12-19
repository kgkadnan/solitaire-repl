import { Metadata } from 'next';
import MatchingPair from '.';

export const metadata: Metadata = {
  title: 'KGK - Matching Pair'
};
export default function MainMatchingPair() {
  return (
    <>
      <MatchingPair />
    </>
  );
}
