import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'; // Correct import for useRouter

import { v2Routes } from '@/constants/routes';
import SideNavigationBar from '@/components/v2/common/side-navigation-bar';
import V2TopNavigationBar from '@/components/v2/common/top-navigation-bar';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import useUser from '@/lib/use-auth';

const authorizedLogin = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC<any> = props => {
    const { authToken, isTokenChecked } = useUser();

    const router = useRouter();
    const currentPath = usePathname();
    const searchParams = useSearchParams().get('active-tab');
    const isV2Route = v2Routes.includes(currentPath);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // New loading state

    useEffect(() => {
      setIsLoading(true);

      console.log('isTokenChecked', isTokenChecked, authToken);
      if (authToken === null && isTokenChecked) {
        router.push('/v2/scanner');
        return;
      }

      setIsAuthorized(true);
      setIsLoading(false);
    }, [authToken, router, isTokenChecked]);
    if (
      isLoading &&
      currentPath !== '/v2' &&
      currentPath !== '/v2/bid-2-buy' &&
      currentPath !== '/v2/new-arrivals' &&
      currentPath !== '/v2/my-cart' &&
      !(currentPath === '/v2/search' && searchParams !== 'new-search') &&
      currentPath !== '/v2/your-orders' &&
      currentPath !== '/v2/my-appointments' &&
      currentPath !== 'v2/matching-pair' &&
      currentPath !== '/v2/detail-page' &&
      currentPath !== '/v2/stock-search'
    ) {
      return <CustomKGKLoader />; // Or any other loading indicator
    }

    return isAuthorized ? (
      isV2Route ? (
        <div>
          <div className="flex w-full">
            <SideNavigationBar isInMaintenanceMode={false} />

            <div className="flex-1 flex flex-col w-[calc(100%-84px)]">
              <V2TopNavigationBar isInMaintenanceMode={false} />
              <main className="flex-1 px-[16px] ml-[84px] bg-neutral25">
                <WrappedComponent {...props} />
              </main>
            </div>
          </div>
        </div>
      ) : (
        <WrappedComponent {...props} />
      )
    ) : null;
  };

  return Wrapper;
};

export default authorizedLogin;
