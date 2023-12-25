import { useEffect, useState } from 'react';

const useUser = () => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setAuthToken(JSON.parse(storedUser));
    }
  }, []);

  const userLoggedIn = (userData: any) => {
    setAuthToken(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const userLoggedOut = () => {
    setAuthToken(null);
    localStorage.removeItem('user');
  };

  return { authToken, userLoggedIn, userLoggedOut };
};

export default useUser;
