import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for useRouter
import useUser from '../lib/useAuth';

const authorizedLogin = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC<any> = props => {
    const { authToken, isTokenChecked, userLoggedOut } = useUser();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const handleRedirect = () => {
        userLoggedOut();
        router.push('/login');
      };

      if (authToken === null && isTokenChecked) {
        handleRedirect();
        return;
      }

      const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;
      if (!jwtSecret) {
        handleRedirect();
        return;
      }
    

      setIsAuthorized(true);
    }, [authToken, userLoggedOut, router]);

    return isAuthorized ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default authorizedLogin;
