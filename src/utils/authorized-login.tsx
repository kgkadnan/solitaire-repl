import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwt, { Secret, GetPublicKeyOrSecret } from 'jsonwebtoken';
import useUser from '../lib/useAuth';

const authorizedLogin = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC<any> = (props) => {
    const { authToken, userLoggedOut } = useUser();
    const router = useRouter();

    useEffect(() => {
      const jwtSecret = process.env.JWT_SECRET;

      const handleInvalidToken = () => {
        userLoggedOut();
        router.push('/login');
      };

      if (!authToken || !jwtSecret) {
        handleInvalidToken();
        return;
      }

      jwt.verify(authToken, jwtSecret as Secret | GetPublicKeyOrSecret, (err: any, decoded: any) => {
        if (err || (decoded.exp && decoded.exp < Date.now())) {
          handleInvalidToken();
        }
      });
    }, [userLoggedOut, router]);

    return  <WrappedComponent {...props} /> ;
  };

  return Wrapper;
};

export default authorizedLogin;