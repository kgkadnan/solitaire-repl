import Search from '.';
import { Metadata } from 'next';

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
  return <Search />;
}
