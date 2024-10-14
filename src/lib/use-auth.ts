import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { util as saveSearchUtil } from '@/features/api/saved-searches';
import { util as dashboardUtil } from '@/features/api/dashboard';

const useUser = () => {
  const dispatch = useDispatch();
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
    dispatch(saveSearchUtil.resetApiState());
    dispatch(dashboardUtil.resetApiState());
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    localStorage.removeItem('Search');
    localStorage.removeItem('MatchingPair');
    localStorage.removeItem('entryPoint');
    localStorage.removeItem('kyc_entryPoint');
    localStorage.removeItem('country');

    dispatch({ type: 'LOGOUT' });
  };

  return { authToken, isTokenChecked, userLoggedIn, userLoggedOut };
};

export default useUser;
