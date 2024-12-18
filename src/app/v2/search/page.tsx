import { Metadata } from 'next';
import Search from '.';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  searchParams
}: {
  searchParams: any;
}): Promise<Metadata> {
  return {
    title: `KGK - ${
      searchParams['active-tab'] == 'saved-search' ? 'Saved Search' : 'Search'
    }`
  };
}
export default function MainSearch() {
  return (
    <>
      <Search />
    </>
  );
}
