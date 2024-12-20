import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
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
  useGetCustomerQuery,
  useLazyGetLogoutAllQuery,
  useLazyGetLogoutQuery
} from '@/features/api/dashboard';
import { DialogComponent } from '../dialog';
import logoutConfirmIcon from '@public/v2/assets/icons/modal/logout.svg';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import { Skeleton } from '@mui/material';
import {
  Tracking_KYC,
  Tracking_KYC_Entry_Point
} from '@/constants/funnel-tracking';
import { trackEvent } from '@/utils/ga';
import customerSupportSvg from '@public/v2/assets/icons/dashboard/customer-support.svg';
import WhatsappSvg from '@public/v2/assets/icons/dashboard/whatsapp.svg?url';
import PhoneSvg from '@public/v2/assets/icons/dashboard/phone.svg?url';
import { useNotifySalesMutation } from '@/features/api/notify-sales';
import CommonPoppup from '@/app/v2/login/component/common-poppup';

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
    kam: {
      image: string;
      kam_name: string;
      post: string;
      phone: string;
    };
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
  const { data: customerData } = useGetCustomerQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const [triggerGetProfilePhoto, { isSuccess }] = useLazyGetProfilePhotoQuery(
    {}
  );

  const [notifySales] = useNotifySalesMutation();
  const [triggerLogout] = useLazyGetLogoutQuery({});
  const [triggerLogoutAll] = useLazyGetLogoutAllQuery({});
  const { userLoggedOut } = useUser();
  const [modalContent, setModalContent] = useState<any>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userAccountInfo, setUserAccountInfo] = useState<IUserAccountInfo>();
  const [imageUrl, setImageUrl] = useState('');
  const [isImageApiLoaded, setIsImageApiLoaded] = useState(false);
  const [isNotified, setIsNotified] = useState(false);

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

  useEffect(() => {
    setImageUrl('');
  }, [updatePhoto?.deleteStatus]);

  useEffect(() => {
    const getPhoto = async () => {
      await triggerGetProfilePhoto({ size: 32 })
        .unwrap()
        .then((res: any) => {
          setImageUrl(res);
          setIsImageApiLoaded(true);
        })
        .catch(e => {
          setIsImageApiLoaded(true);
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

  const handleNotifySales = () => {
    notifySales({})
      .unwrap()
      .then(res => {
        setIsNotified(true);

        setIsDialogOpen(true);

        setModalContent(
          <CommonPoppup
            status="success"
            content={
              'Your request has been successfully submitted. Our sales team will review your account details and activate it shortly. You will be notified once the activation is complete'
            }
            customPoppupBodyStyle="!mt-[70px]"
            header={'Thank You for Notifying Sales!'}
            actionButtonData={[
              {
                variant: 'primary',
                label: 'Okay',
                handler: () => {
                  setIsDialogOpen(false);
                  setModalContent(<></>);
                },
                customStyle: 'flex-1 w-full'
              }
            ]}
          />
        );
      })
      .catch(e => {});
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

  const getInitials = (obj: any, path: string) => {
    const name = get(obj, path, ''); // Get the name string or default to an empty string
    return (
      name
        ?.split(' ') // Split the name into words
        ?.map((word: any) => word[0]?.toUpperCase()) // Get the first letter of each word and uppercase it
        ?.join('') || ''
    ); // Join the initials or return an empty string
  };

  return (
    <div className="min-h-[60px] border-b-[1px] border-neutral200 sticky top-0 bg-neutral0 z-[3] flex flex-col justify-end ">
      <DialogComponent
        dialogContent={modalContent}
        isOpens={isLogout || isDialogOpen}
      />
      {showNudge === 'MINI' &&
        (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
          isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED) &&
        currentPath !== '/v2/kyc' &&
        v2Routes.includes(currentPath) && (
          <div
            className={`bg-infoSurface pr-[32px] flex justify-between px-[14px] py-[8px] transition ease-in-out duration-500 items-center ${
              showNudge === 'MINI' ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <div className="flex">
              <div className="w-[84px]"></div>
              <div>
                <p className="text-neutral900 font-normal text-mRegular">
                  As a first-time account user, please complete your KYC to
                  access exclusive features and services.
                </p>
                <p className="text-neutral900 font-normal text-mRegular">
                  If you're an existing customer, kindly notify our sales team
                  for quicker account activation.
                </p>
              </div>
            </div>
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label:
                    customerData?.customer?.notifySales !== 'Available' ||
                    isNotified
                      ? 'Notified Sales'
                      : 'Notify Sales',
                  handler: () => {
                    handleNotifySales();
                  },
                  isDisable:
                    customerData?.customer?.notifySales !== 'Available' ||
                    isNotified,
                  customStyle: ''
                },
                {
                  variant: 'primary',
                  label: 'Complete KYC Now',
                  handler: () => {
                    localStorage.setItem(
                      'kyc_entryPoint',
                      Tracking_KYC_Entry_Point.KYC_Top_Button
                    ),
                      trackEvent({
                        action: Tracking_KYC.Click_KYC,
                        entry_point:
                          localStorage.getItem('kyc_entryPoint') || '',
                        category: 'KYC'
                      });
                    router.push('/v2/kyc');
                  },
                  customStyle: ''
                }
              ]}
            />
          </div>
        )}
      <div className="z-50 flex gap-[16px] items-center justify-end px-[32px] py-[10px]">
        <Popover>
          <PopoverTrigger className="flex justify-center">
            <Image src={customerSupportSvg} alt="profile" />
          </PopoverTrigger>
          {/* Popover content with radio buttons */}
          <PopoverContent className="z-[999] relative h-[150px]">
            <div className="bg-neutral25 border-[1px] border-solid border-primaryBorder shadow-popupsShadow  rounded-[8px] relative top-[5px] right-[39%]">
              {/* Add the triangular tip above the card */}
              <div className="absolute w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-neutral200 top-[-10px] right-[15px] before:absolute before:content-[''] before:w-0 before:h-0 before:border-l-[10px] before:border-l-transparent before:border-r-[10px] before:border-r-transparent before:border-b-[9px] before:border-b-white before:top-[2px] before:left-[-9px]"></div>{' '}
              <div className="flex items-center border-b-[1px] border-solid border-primaryBorder p-[16px] gap-[8px]">
                <Avatar className="bg-primaryMain flex items-center justify-center">
                  {userAccountInfo &&
                  get(userAccountInfo, 'customer.kam.image', '') ? (
                    <img
                      src={get(userAccountInfo, 'customer.kam.image', '')}
                      alt="profile"
                      className="w-[40px] h-[40px] rounded-full object-cover border-none"
                    />
                  ) : (
                    <p className="text-center text-mRegular text-neutral0 leading-[10]">
                      {getInitials(userAccountInfo, 'customer.kam.kam_name')}
                    </p>
                  )}
                </Avatar>
                <div>
                  <h1 className="text-lRegular font-regular text-neutral-900">
                    {' '}
                    {`${userAccountInfo?.customer.kam.kam_name}`}
                  </h1>
                  <p className="text-mRegular font-regular text-neutral-600">
                    {' '}
                    {userAccountInfo?.customer.kam.post ?? '-'}
                  </p>
                </div>
              </div>
              <div
                className={`flex items-center py-[5px]  px-[16px] gap-[8px]    ${
                  isInMaintenanceMode
                    ? 'cursor-not-allowed bg-neutral100'
                    : 'cursor-pointer hover:bg-slate-50'
                }`}
              >
                <PhoneSvg />
                <p
                  className={`text-mRegular font-regular ${
                    isInMaintenanceMode ? 'text-neutral400' : 'text-neutral900'
                  }`}
                >
                  {userAccountInfo?.customer.kam.phone ?? '-'}
                </p>
              </div>
              <Link
                className={`flex items-center py-[5px]  px-[16px] gap-[8px]    ${
                  isInMaintenanceMode
                    ? 'cursor-not-allowed bg-neutral100'
                    : 'cursor-pointer hover:bg-slate-50'
                }`}
                href={`https://wa.me/${
                  userAccountInfo?.customer?.kam?.phone?.replace(/\s+/g, '') ||
                  ''
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappSvg />
                <p
                  className={`text-mRegular font-regular ${
                    isInMaintenanceMode ? 'text-neutral400' : 'text-neutral900'
                  }`}
                >
                  {userAccountInfo?.customer.kam.phone ?? '-'}
                </p>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
        <Notification isInMaintenanceMode={isInMaintenanceMode} />

        <Popover>
          <PopoverTrigger className="flex justify-center">
            {isImageApiLoaded ? (
              <Avatar
                className={`${
                  imageUrl.length <= 0 && 'bg-primaryMain'
                } flex items-center justify-center`}
              >
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
