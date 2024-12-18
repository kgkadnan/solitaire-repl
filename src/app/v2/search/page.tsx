import Search from '.';

export async function generateMetadata({
  searchParams
}: {
  searchParams: { [key: string]: string };
}) {
  const keyword = searchParams.keyword || '';
  return {
    title: keyword ? `KGK - Search Results for "${keyword}"` : 'KGK - Search'
  };
}

export default function MainSearch() {
  return (
    <>
      <Search />
    </>
  );
}
