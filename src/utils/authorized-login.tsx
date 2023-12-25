import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import from 'next/router', not 'next/navigation'
import jwt, { Secret, GetPublicKeyOrSecret } from 'jsonwebtoken';
import useUser from '../lib/useAuth';

const authorizedLogin = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC<any> = props => {
    const { authToken, userLoggedOut } = useUser();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      if (authToken === null) {
        router.push('/login');
        return;
      }

      const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;
      if (!jwtSecret) {
        userLoggedOut();
        router.push('/login');
        return;
      }
      console.log('kkkkkkkkkk');
      try {
        jwt.verify(authToken, jwtSecret as Secret | GetPublicKeyOrSecret);
        setIsAuthorized(true); // Token is valid
      } catch (err) {
        console.log('pppppppp');

        userLoggedOut();
        router.push('/login');
      }
    }, [authToken, userLoggedOut, router]);

    // Render WrappedComponent only if authorized
    return isAuthorized ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default authorizedLogin;
