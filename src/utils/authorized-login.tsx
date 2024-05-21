import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Correct import for useRouter
import useUser from '../lib/use-auth';
import KycNudgeModal from '@/components/v2/common/kyc-nudge';
import { kycStatus } from '@/constants/enums/kyc';
import { v2Routes } from '@/constants/routes';
import SideNavigationBar from '@/components/v2/common/side-navigation-bar';
import V2TopNavigationBar from '@/components/v2/common/top-navigation-bar';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { DialogComponent } from '@/components/v2/common/dialog';
import InvalidCreds from '@/app/v2/login/component/invalid-creds';
import { hide } from '@/features/logout/logout-slice';
import MaintenanceMode from '@/components/v2/common/maintenace';
import { useGetCustomerQuery } from '@/features/api/dashboard';

const authorizedLogin = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC<any> = props => {
    const { authToken, isTokenChecked, userLoggedOut } = useUser();
    const { data: customerData, refetch: refetchCustomerData } =
      useGetCustomerQuery({}, { refetchOnMountOrArgChange: true });

    const router = useRouter();
    const currentPath = usePathname();
    const isV2Route = v2Routes.includes(currentPath);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // New loading state
    const [showKycNudge, setShowKycNudge] = useState(false);
    const logoutFlag: any = useAppSelector(
      (store: any) => store.logoutAll.showModal
    );
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const isInMaintenanceMode: any =
      customerData?.customer?.maintenance_mode?.end_date;

    useEffect(() => {
      // Check if the user is KYC verified
      const showNudge = localStorage.getItem('show-nudge') ?? 'FULL'; // Replace with actual check
      const isKycVerified = JSON?.parse(localStorage?.getItem('user')!);
      if (
        showNudge !== 'MINI' &&
        (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
          isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED) &&
        currentPath !== '/v2/kyc' &&
        v2Routes.includes(currentPath)
      ) {
        setShowKycNudge(true);
      }
    }, []);

    useEffect(() => {
      // !customerData && setIsLoading(true);
      refetchCustomerData();
    }, []);

    useEffect(() => {
      dispatch(hide()), setOpen(false);
    }, []);
    useEffect(() => {
      setOpen(logoutFlag);
    }, [logoutFlag]);
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
      return <CustomKGKLoader />; // Or any other loading indicator
    }
    const handleNudgeClose = () => {
      setShowKycNudge(false);
      localStorage.setItem('show-nudge', 'MINI');
    };
    return isAuthorized ? (
      isV2Route ? (
        <div>
          <DialogComponent
            dialogContent={
              <InvalidCreds
                header="Session expired! You have been logged out of all devices. Please log in again."
                content={''}
                handleClick={() => {
                  dispatch(hide()),
                    userLoggedOut(),
                    router.push('/v2/login'),
                    setOpen(false);
                }}
                buttonText="Okay"
              />
            }
            isOpens={open}
            setIsOpen={setOpen}
          />
          <div className="flex w-full">
            <SideNavigationBar isInMaintenanceMode={isInMaintenanceMode} />

            <div className="flex-1 flex flex-col w-[calc(100%-84px)]">
              <V2TopNavigationBar isInMaintenanceMode={isInMaintenanceMode} />
              <main className="flex-1 px-[16px] ml-[84px] bg-neutral25">
                {isInMaintenanceMode ? (
                  <MaintenanceMode
                    name={customerData?.customer.kam?.kam_name ?? '-'}
                    role={
                      customerData?.customer.kam?.post ?? 'Key Account Manager'
                    }
                    phoneNumber={customerData?.customer.kam?.phone ?? '-'}
                    email={customerData?.customer.kam?.email ?? '-'}
                    maintenanceEndData={
                      customerData?.customer?.maintenance_mode?.end_date
                    }
                  />
                ) : (
                  <WrappedComponent {...props} />
                )}
              </main>
            </div>
          </div>
          {showKycNudge && <KycNudgeModal onClose={() => handleNudgeClose()} />}
        </div>
      ) : (
        <WrappedComponent {...props} />
      )
    ) : null;
  };

  return Wrapper;
};

export default authorizedLogin;
