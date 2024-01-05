import { useEffect, useState } from 'react';

const useUser = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isTokenChecked, setIsTokenChecked] = useState(false); // New state

  useEffect(() => {
    const storedUser = localStorage.getItem('auth');

    if (storedUser) {
      setAuthToken(JSON.parse(storedUser));
    }
    setIsTokenChecked(true); // Set to true after checking localStorage
  }, []);

  const userLoggedIn = (userData: any) => {
    setAuthToken(userData);
    localStorage.setItem('auth', JSON.stringify(userData));
  };

  const userLoggedOut = () => {
    setAuthToken(null);
    localStorage.removeItem('auth');
  };

  return { authToken, isTokenChecked, userLoggedIn, userLoggedOut };
};

export default useUser;
