import Search from '.'; // Check that this import path is correct

export async function generateMetadata({
  searchParams
}: {
  searchParams?: { keyword?: string };
}) {
  const keyword = searchParams?.keyword || '';
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
