'use client';
import { useRouter } from 'next/navigation';

const SearchPage = () => {
  const router = useRouter();

  const handleSearchParamClick = (searchParam: any) => {
    // Update URL with search parameter

    router.push(`/test2?param=${searchParam}`);

    // Store search parameter in history state
    window.history.pushState({ searchParam }, '');
  };

  return (
    <div>
      <button onClick={() => handleSearchParamClick('param1')}>
        Search Param 1
      </button>
      <button onClick={() => handleSearchParamClick('param2')}>
        Search Param 2
      </button>
      {/* Other UI elements */}
    </div>
  );
};

export default SearchPage;
