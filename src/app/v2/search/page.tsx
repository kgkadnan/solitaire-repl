import { Metadata } from 'next';
import Search from '.';

export const metadata: Metadata = {
  title: 'KGK - Search'
};
export default function MainSearch() {
  return (
    <>
      <Search />
    </>
  );
}
