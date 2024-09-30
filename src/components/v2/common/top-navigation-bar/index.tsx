import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { Avatar } from '../../ui/avatar';
import { kycStatus } from '@/constants/enums/kyc';
import { usePathname, useRouter } from 'next/navigation';
import ActionButton from '../action-button';
import { v2Routes } from '@/constants/routes';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@radix-ui/react-popover';
import MyAccountIcon from '@public/v2/assets/icons/topbar-icons/searchIcon.svg?url';
import logoutIcon from '@public/v2/assets/icons/topbar-icons/logout-icon.svg';
import Link from 'next/link';
import useUser from '@/lib/use-auth';
import Notification from './components/notification/notification';
import { useLazyGetProfilePhotoQuery } from '@/features/api/my-profile';
import { useAppSelector } from '@/hooks/hook';
import {
  useLazyGetLogoutAllQuery,
  useLazyGetLogoutQuery
} from '@/features/api/dashboard';
import { DialogComponent } from '../dialog';
import logoutConfirmIcon from '@public/v2/assets/icons/modal/logout.svg';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import { Skeleton } from '@mui/material';

export interface IUserAccountInfo {
  customer: {
    billing_address_id: string | null;
    cart_id: string;
    company_name: string | null;
    country_code: string | null;
    created_at: string;
    deleted_at: string | null;
    email: string;
    kyc: string | null;
    id: string;
    last_name: string;
    metadata: string | null;
    orders: any;
    shipping_addresses: any;
    phone: string | null;
    first_name: string | null;
    updated_at: string | null;
    has_account: boolean;
    is_email_verified: boolean;
    is_phone_verified: boolean;
  };
}
const TopNavigationBar = ({
  isInMaintenanceMode
}: {
  isInMaintenanceMode: boolean;
}) => {
  const router = useRouter();
  const currentPath = usePathname();
  const [showNudge, setShowNudge] = useState(
    localStorage.getItem('show-nudge')
  );
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const [triggerGetProfilePhoto] = useLazyGetProfilePhotoQuery({});
  const [triggerLogout] = useLazyGetLogoutQuery({});
  const [triggerLogoutAll] = useLazyGetLogoutAllQuery({});
  const { userLoggedOut } = useUser();
  const [modalContent, setModalContent] = useState<any>();
  const [userAccountInfo, setUserAccountInfo] = useState<IUserAccountInfo>();
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  useEffect(() => {
    const fetchMyAPI = async () => {
      const data = localStorage.getItem('show-nudge');

      if (data === 'MINI') {
        setShowNudge(data);
      }
    };

    fetchMyAPI();
  }, [localStorage.getItem('show-nudge')]);

  const updatePhoto: any = useAppSelector((store: any) => store.profileUpdate);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUserAccountInfo(JSON.parse(storedUser));
    }
  }, []);

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setImageUrl('');
  }, [updatePhoto?.deleteStatus]);

  useEffect(() => {
    const getPhoto = async () => {
      await triggerGetProfilePhoto({ size: 32 })
        .unwrap()
        .then((res: any) => {
          setImageUrl(res);
        });
    };
    getPhoto();
  }, [updatePhoto?.status]);

  const handleLogoutAll = () => {
    triggerLogoutAll({})
      .then(_res => {
        userLoggedOut();
        setIsLogout(false);
        router.push('/v2/login');
      })
      .catch(_err => console.log('error'));
  };

  const handleLogout = () => {
    triggerLogout({})
      .then(_res => {
        userLoggedOut();
        router.push('/v2/login');
        setIsLogout(false);
      })
      .catch(_err => console.log('error'));
  };
  return (
    <div className="min-h-[60px] border-b-[1px] border-neutral200 sticky top-0 bg-neutral0 z-[3] flex flex-col justify-end ">
      <DialogComponent dialogContent={modalContent} isOpens={isLogout} />
      {showNudge === 'MINI' &&
        (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
          isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED) &&
        currentPath !== '/v2/kyc' &&
        v2Routes.includes(currentPath) && (
          <div
            className={`bg-primaryMain pr-[32px] flex justify-between px-[32px] py-[8px] transition ease-in-out duration-500 items-center ${
              showNudge === 'MINI' ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <div className="flex">
              <div className="w-[84px]"></div>
              <div>
                <p className="text-lMedium medium text-neutral0">
                  Unlock Exclusive Benefits: Complete Your KYC Now!
                </p>
                <p className="text-neutral50 text-mRegular">
                  Take a moment to verify your identity and access exclusive
                  features and services.
                </p>
              </div>
            </div>
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: 'Complete KYC Now',
                  handler: () => router.push('/v2/kyc'),
                  customStyle: 'flex-1 w-full'
                }
              ]}
            />
          </div>
        )}
      <div className="z-50 flex gap-[16px] justify-end px-[32px] py-[10px]">
        <Notification isInMaintenanceMode={isInMaintenanceMode} />

        <Popover>
          <PopoverTrigger className="flex justify-center">
            {userAccountInfo?.customer?.first_name !== undefined ? (
              <Avatar className="bg-primaryMain flex items-center justify-center">
                {imageUrl?.length ? (
                  <img
                    src={imageUrl}
                    alt="profile"
                    className="w-[40px] h-[40px] rounded-full object-cover border-none"
                  />
                ) : (
                  <p className="text-center text-mRegular text-neutral0">
                    {`${userAccountInfo?.customer?.first_name
                      ?.charAt(0)
                      .toUpperCase()}${userAccountInfo?.customer?.last_name
                      ?.charAt(0)
                      .toUpperCase()}`}
                  </p>
                )}
              </Avatar>
            ) : (
              <Skeleton
                width={40}
                sx={{ bgcolor: 'var(--neutral-200)' }}
                height={40}
                variant="rectangular"
                animation="wave"
                className="rounded-[50%]"
              />
            )}
          </PopoverTrigger>
          {/* Popover content with radio buttons */}
          <PopoverContent className="z-[999]">
            <div className="bg-neutral25 border-[1px] border-solid border-primaryBorder shadow-popupsShadow  rounded-[8px] relative top-[5px] right-[13%]">
              <div className="flex items-center border-b-[1px] border-solid border-primaryBorder p-[16px] gap-[8px]">
                <Avatar className="bg-primaryMain flex items-center justify-center">
                  {imageUrl.length ? (
                    <img
                      src={imageUrl}
                      alt="profile"
                      className="w-[40px] h-[40px] rounded-full object-cover border-none"
                    />
                  ) : (
                    <p className="text-center text-mRegular text-neutral0">
                      {`${userAccountInfo?.customer?.first_name
                        ?.charAt(0)
                        .toUpperCase()}${userAccountInfo?.customer?.last_name
                        ?.charAt(0)
                        .toUpperCase()}`}
                    </p>
                  )}
                </Avatar>
                <div>
                  <h1 className="text-lRegular font-regular text-neutral-900">
                    {' '}
                    {`${userAccountInfo?.customer?.first_name} ${userAccountInfo?.customer?.last_name}`}
                  </h1>
                  <p className="text-mRegular font-regular text-neutral-600">
                    {' '}
                    {userAccountInfo?.customer?.email ?? '-'}
                  </p>
                </div>
              </div>

              <Link
                className={`flex items-center border-b-[1px] border-solid border-primaryBorder p-[16px] gap-[8px]    ${
                  isInMaintenanceMode
                    ? 'cursor-not-allowed bg-neutral100'
                    : 'cursor-pointer hover:bg-slate-50'
                }`}
                href={isInMaintenanceMode ? '' : '/v2/my-account'}
              >
                <MyAccountIcon
                  className={`${
                    isInMaintenanceMode
                      ? 'stroke-neutral400'
                      : 'stroke-neutral900'
                  }`}
                />
                <p
                  className={`text-mRegular font-regular ${
                    isInMaintenanceMode ? 'text-neutral400' : 'text-neutral900'
                  }`}
                >
                  {' '}
                  My Account
                </p>
              </Link>
              <button
                className="flex w-full items-center border-b-[1px] border-solid border-primaryBorder p-[16px] gap-[8px] cursor-pointer hover:bg-slate-50 "
                onClick={() => {
                  setIsLogout(true);
                  setModalContent(
                    <>
                      <div className="absolute left-[-84px] top-[-84px]">
                        <Image
                          src={logoutConfirmIcon}
                          alt="logoutConfirmIcon"
                        />
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setIsLogout(false);
                        }}
                      >
                        {' '}
                        <Image
                          src={crossIcon}
                          alt="crossIcon"
                          className="absolute left-[360px] top-[15px]"
                        />
                      </div>

                      <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                        <h1 className="text-headingS text-neutral900 !font-medium	">
                          Do you want to log out from all devices?
                        </h1>
                        <ActionButton
                          actionButtonData={[
                            {
                              variant: 'secondary',
                              label: 'Log out this device',
                              handler: () => {
                                handleLogout();
                              },
                              customStyle: 'flex-1 w-full h-10'
                            },
                            {
                              variant: 'primary',
                              label: 'Log out all devices',
                              handler: () => {
                                handleLogoutAll();
                              },
                              customStyle: 'flex-1 w-full h-10'
                            }
                          ]}
                        />
                      </div>
                    </>
                  );
                }}
              >
                <Image src={logoutIcon} alt="logoutIcon" />
                <p className="text-mRegular font-regular text-neutral-900">
                  {' '}
                  Logout
                </p>
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TopNavigationBar;
