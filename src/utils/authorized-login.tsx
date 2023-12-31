import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for useRouter
import useUser from '../lib/useAuth';
import CustomLoader from '@/components/common/loader';

const authorizedLogin = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC<any> = props => {
    const { authToken, isTokenChecked, userLoggedOut } = useUser();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // New loading state

    useEffect(() => {
      setIsLoading(true);
      if (authToken === null && isTokenChecked) {
        router.push('/login');
        return;
      }

      setIsAuthorized(true);
      setIsLoading(false);
    }, [authToken, userLoggedOut, router]);

    if (isLoading) {
      return <CustomLoader />; // Or any other loading indicator
    }
    return isAuthorized ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default authorizedLogin;
