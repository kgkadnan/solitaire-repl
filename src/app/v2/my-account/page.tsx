'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import kamPhoto from '@public/v2/assets/icons/my-account/KAM- Photo.svg';
import uploadIcon from '@public/v2/assets/icons/my-account/uploadIcon.svg';
import blueTickIcon from '@public/v2/assets/icons/my-account/blue-tick-icon.svg';
import greyTickIcon from '@public/v2/assets/icons/my-account/grey-tick-icon.svg';
import { kycStatus } from '@/constants/enums/kyc';
import Mail from '@public/v2/assets/icons/my-account/mail.svg?url';
import Phone from '@public/v2/assets/icons/my-account/phone.svg?url';
import { ManageLocales } from '@/utils/v2/translate';
import TablePrefrences from './components/table-prefrences/table-prefrences';
import ChangePassword from './components/change-password/change-password';
import NotificationPrefrences from './components/notification-prefrences/notification-prefrences';
import PrivacyPolicy from './components/privacy-policy/privacy-policy';
import TermAndCondtions from './components/term-and-conditions/term-and-condition';
import { DialogComponent } from '@/components/v2/common/dialog';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { useSearchParams } from 'next/navigation';
import ProfileUpdate from './components/profile-update/profile-update';
import { createBaseQuery } from '@/features/api/base-query';
import { useLazyGetProfilePhotoQuery } from '@/features/api/my-account';

interface IUserAccountInfo {
  customer: {
    billing_address_id: string | null;
    cart_id: string;
    company_name: string | null;
    country_code: string | null;
    created_at: string;
    deleted_at: string | null;
    email: string;
    kyc: any;
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

enum myAccount {
  TABLE_PREFRENCES = 'table prefrences',
  CHANGE_PASSWORD = 'change password',
  NOTIFICATION_PREFRENCES = 'notification preferences',
  TERM_AND_CONDITION = 'term & condition',
  PRIVACY_POLICY = 'privacy policy',
  PROFILE_UPDATE = 'profile update'
}
const MyAccount = () => {
  const subRoute = useSearchParams().get('path');
  const [triggerGetProfilePhoto] = useLazyGetProfilePhotoQuery({});
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;
  const { setIsDialogOpen } = modalSetState;
  const [userAccountInfo, setUserAccountInfo] = useState<IUserAccountInfo>();
  const [activeTab, setActiveTab] = useState<string>(
    myAccount.TABLE_PREFRENCES
  );

  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    const getPhoto = async () => {
      await triggerGetProfilePhoto({ size: 128 })
        .unwrap()
        .then((res: any) => {
          setImageUrl(res);
        });
    };
    getPhoto();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUserAccountInfo(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (subRoute === 'privacy-policy') {
      setActiveTab(myAccount.PRIVACY_POLICY);
    } else if (subRoute === 'terms-and-conditions') {
      setActiveTab(myAccount.TERM_AND_CONDITION);
    } else if (subRoute === 'notification-prefrences') {
      setActiveTab(myAccount.NOTIFICATION_PREFRENCES);
    }
  }, [subRoute]);

  const myAccountTabs = [
    {
      label: ManageLocales('app.myAccount.tabs.tablePrefrences'),
      status: myAccount.TABLE_PREFRENCES
    },
    {
      label: ManageLocales('app.myAccount.tabs.changePassword'),
      status: myAccount.CHANGE_PASSWORD
    },
    {
      label: ManageLocales('app.myAccount.tabs.notificationPrefrences'),
      status: myAccount.NOTIFICATION_PREFRENCES
    },
    {
      label: ManageLocales('app.myAccount.tabs.term&Conditions'),
      status: myAccount.TERM_AND_CONDITION
    },
    {
      label: ManageLocales('app.myAccount.tabs.privacyPolicy'),
      status: myAccount.PRIVACY_POLICY
    }
  ];

  const handleTabs = ({ tab }: { tab: string }) => {
    setActiveTab(tab);
  };

  const renderCotent = () => {
    switch (activeTab) {
      case myAccount.TABLE_PREFRENCES:
        return <TablePrefrences />;

      case myAccount.CHANGE_PASSWORD:
        return <ChangePassword modalSetState={modalSetState} />;

      case myAccount.NOTIFICATION_PREFRENCES:
        return <NotificationPrefrences modalSetState={modalSetState} />;

      case myAccount.PRIVACY_POLICY:
        return <PrivacyPolicy />;
      case myAccount.TERM_AND_CONDITION:
        return <TermAndCondtions />;

      case myAccount.PROFILE_UPDATE:
        return <ProfileUpdate />;
    }
  };

  return (
    <div className="mt-[16px] relative">
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <div
        className="border-[1px] border-solid border-neutral-200 rounded-[8px]"
        style={{
          background:
            'linear-gradient(90deg, hsla(198, 85%, 92%, 1) 0%, hsla(240, 100%, 95%, 1) 50%, hsla(36, 100%, 95%, 1) 100%)'
        }}
      >
        <div className="flex items-center  gap-5 p-[24px]">
          <div className="group">
            <div
              onClick={() => {
                setActiveTab(myAccount.PROFILE_UPDATE);
              }}
              className="cursor-pointer relative"
              style={{ position: 'relative' }}
            >
              {imageUrl.length ? (
                <img src={imageUrl} alt="kam" />
              ) : (
                <Image
                  src={kamPhoto}
                  alt="kamPhoto"
                  className="imageContainer"
                  id="imageContainer"
                />
              )}
              <div className="absolute top-[72%] right-[8%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Image src={uploadIcon} alt="uploadIcon" />
              </div>
            </div>
          </div>

          <div className="flex flex-col  justify-start gap-[8px]">
            <div className="flex items-center gap-[6px]">
              <h1 className="text-lRegular font-regular text-neutral-900">
                {' '}
                {`${userAccountInfo?.customer?.first_name} ${userAccountInfo?.customer?.last_name}`}
              </h1>
              {userAccountInfo?.customer?.kyc?.status === kycStatus.APPROVED ? (
                <Image src={blueTickIcon} alt="blueTickIcon" />
              ) : (
                <Image src={greyTickIcon} alt="greyTickIcon" />
              )}

              <p
                className={`h-[24px] text-sRegular  border ${
                  userAccountInfo?.customer?.kyc?.status ===
                    kycStatus.PENDING ||
                  userAccountInfo?.customer?.kyc?.status ===
                    kycStatus.INPROGRESS
                    ? 'border-lengendInCardBorder bg-legendInCartFill text-legendInCart'
                    : userAccountInfo?.customer?.kyc?.status ===
                      kycStatus.REJECTED
                    ? 'border-primaryModalFillRed bg-primaryModalRingRed text-dangerMain'
                    : 'border-successBorder bg-primaryModalRing text-successMain'
                } rounded py-[6px] px-[4px] flex justify-center items-center`}
              >
                {userAccountInfo?.customer?.kyc?.status === kycStatus.PENDING
                  ? 'KYC Pending'
                  : userAccountInfo?.customer?.kyc?.status ===
                    kycStatus.REJECTED
                  ? 'KYC Rejected'
                  : userAccountInfo?.customer?.kyc?.status ===
                    kycStatus.INPROGRESS
                  ? 'KYC In-progress'
                  : 'KYC Approved'}
              </p>
            </div>
            <div className="flex items-center gap-[6px]">
              {' '}
              <Mail />
              <p className="text-mRegular font-regular text-neutral-600">
                {' '}
                {userAccountInfo?.customer?.email ?? '-'}
              </p>
            </div>
            <div className="flex items-center gap-[6px]">
              {' '}
              <Phone />
              <p className="text-mRegular font-regular text-neutral-600">
                {' '}
                {userAccountInfo?.customer?.phone ?? '-'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-b border-neutral200   text-mMedium font-medium px-[24px]">
          {myAccountTabs.map(({ label, status }) => {
            return (
              <button
                className={`px-[16px] py-[8px] ${
                  activeTab === status
                    ? 'text-neutral900 border-b-[2px] border-primaryMain'
                    : 'text-neutral600 border-b-[2px] border-transparent'
                }`}
                key={label}
                onClick={() => handleTabs({ tab: status })}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
      {renderCotent()}
    </div>
  );
};

export default MyAccount;
