import React, { useEffect, useState } from 'react';
import NotificationIcon from '@public/v2/assets/icons/topbar-icons/notification.svg';
import Image from 'next/image';
import { Avatar, AvatarImage } from '../../ui/avatar';
import { kycStatus } from '@/constants/enums/kyc';
import { usePathname, useRouter } from 'next/navigation';
import ActionButton from '../action-button';

const TopNavigationBar = () => {
  const router = useRouter();
  const currentPath = usePathname();
  console.log(currentPath, 'currentPath');
  const [showNudge, setShowNudge] = useState(
    localStorage.getItem('show-nudge')
  );
  // const showNudge = localStorage.getItem('show-nudge'); // Replace with actual check
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

  return (
    <div className="min-h-[60px] border-b-[1px] border-neutral200 sticky top-0 bg-neutral0 z-[3] flex flex-col justify-end ">
      {showNudge === 'MINI' &&
        (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
          isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED) &&
        currentPath !== '/v2/kyc' && (
          <div className="bg-primaryMain pr-[32px] flex justify-between px-[32px] py-[8px]">
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
        <div
          className="flex items-center cursor-pointer"
          onClick={() => (window.location.href = '/')}
        >
          Back to old theme
        </div>
        <Image src={NotificationIcon} alt="Notification Icon" />
        <Avatar>
          <AvatarImage
            className="h-[40px] w-[40px]"
            src="https://github.com/shadcn.png"
            alt="Avatar Icon"
          />
        </Avatar>
      </div>
    </div>
  );
};

export default TopNavigationBar;
