import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Correct import for useRouter
import useUser from '../lib/use-auth';
import Loader from '@/components/v2/common/loader';
import KycNudgeModal from '@/components/v2/common/kyc-nudge';
import { kycStatus } from '@/constants/enums/kyc';

const authorizedLogin = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC<any> = props => {
    const { authToken, isTokenChecked, userLoggedOut } = useUser();
    const router = useRouter();
    const currentPath = usePathname();

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // New loading state
    const [showKycNudge, setShowKycNudge] = useState(false);

    useEffect(() => {
      // Check if the user is KYC verified
      const showNudge = localStorage.getItem('show-nudge') ?? 'FULL'; // Replace with actual check
      const isKycVerified = JSON.parse(localStorage.getItem('user')!);
      if (
        showNudge === 'FULL' &&
        (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
          isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED) &&
        currentPath !== '/v2/kyc'
      ) {
        setShowKycNudge(true);
      }
    }, []);
    useEffect(() => {
      setIsLoading(true);
      if (authToken === null && isTokenChecked) {
        router.push('/v2/login');
        return;
      }

      setIsAuthorized(true);
      setIsLoading(false);
    }, [authToken, userLoggedOut, router]);

    if (isLoading) {
      return <Loader />; // Or any other loading indicator
    }
    const handleNudgeClose = () => {
      setShowKycNudge(false);
      localStorage.setItem('show-nudge', 'MINI');
    };
    return isAuthorized ? (
      <div>
        {showKycNudge && <KycNudgeModal onClose={() => handleNudgeClose()} />}
        <WrappedComponent {...props} />{' '}
      </div>
    ) : null;
  };

  return Wrapper;
};

export default authorizedLogin;
