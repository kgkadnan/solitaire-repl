'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import kamPhoto from '@public/v2/assets/icons/my-account/KAM- Photo.svg';
import uploadIcon from '@public/v2/assets/icons/my-account/uploadIcon.svg';
import blueTickIcon from '@public/v2/assets/icons/my-account/blue-tick-icon.svg';
import greyTickIcon from '@public/v2/assets/icons/my-account/grey-tick-icon.svg';
import { kycStatus, myAccount } from '@/constants/enums/kyc';
import Mail from '@public/v2/assets/icons/my-account/mail.svg?url';
import Phone from '@public/v2/assets/icons/my-account/phone.svg?url';
import { ManageLocales } from '@/utils/v2/translate';
import TablePrefrences from './components/table-preferences/table-prefrences';
import ChangePassword from './components/change-password/change-password';
import NotificationPrefrences from './components/notification-preferences/notification-prefrences';
import PrivacyPolicy from './components/privacy-policy/privacy-policy';
import TermAndCondtions from './components/term-and-conditions/term-and-condition';
import { DialogComponent } from '@/components/v2/common/dialog';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { useSearchParams } from 'next/navigation';
import ProfileUpdate from './components/profile-update/profile-update';
import {
  useDeleteProfileMutation,
  useLazyGetProfilePhotoQuery
} from '@/features/api/my-profile';
import { useLazyGetAuthDataQuery } from '@/features/api/login';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import {
  profileUpdate,
  deleteProfileStore
} from '@/features/profile/profile-update-slice';
// import logger from 'logging/log-util';

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

const MyAccount = () => {
  const dispatch = useAppDispatch();
  const [deleteProfile] = useDeleteProfileMutation({});
  const updatePhoto: any = useAppSelector((store: any) => store.profileUpdate);

  const subRoute = useSearchParams().get('path');
  const [triggerGetProfilePhoto] = useLazyGetProfilePhotoQuery({});
  const [triggerAuth] = useLazyGetAuthDataQuery();
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;
  const [userAccountInfo, setUserAccountInfo] = useState<IUserAccountInfo>();
  const [activeTab, setActiveTab] = useState<string>(
    myAccount.TABLE_PREFRENCES
  );
  const [imageUrl, setImageUrl] = useState('');

  const getPhoto = async () => {
    await triggerGetProfilePhoto({ size: 128 })
      .unwrap()
      .then((res: any) => {
        setImageUrl(res);
      });
  };

  useEffect(() => {
    getPhoto();
  }, []);

  const handleFileUpload = async ({
    acceptedFiles,
    setIsFileUploaded,
    setSelectedFile,
    setUploadProgress
  }: any) => {
    try {
      if (acceptedFiles.length) {
        setIsFileUploaded(false);

        acceptedFiles.forEach((file: any) => {
          setSelectedFile({ url: file.name });
        });

        const simulateUpload = async () => {
          return new Promise<void>(resolve => {
            setTimeout(() => {
              resolve();
            }, 1000); // Simulate a 1-second delay
          });
        };

        setUploadProgress(0);
        for (let i = 0; i <= 100; i += 50) {
          setUploadProgress(i);
          await simulateUpload(); // Simulate a delay between progress updates
        }
        setUploadProgress(0);
        setIsFileUploaded(true);
        getPhoto();
        dispatch(profileUpdate(!updatePhoto?.status));
      }
    } catch (error) {
      // Log an error message if the upload fails
      console.error('File upload failed:', error);
    }
  };

  const handleDeleteAttachment = ({
    setSelectedFile,
    setIsFileUploaded
  }: any) => {
    deleteProfile({})
      .unwrap()
      .then(_res => {
        setSelectedFile({});
        setIsFileUploaded(false);
        setImageUrl('');
        dispatch(deleteProfileStore(!updatePhoto.deleteStatus));
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('auth')!);

    triggerAuth(authToken).then(res => {
      setUserAccountInfo(res?.data);
      localStorage.setItem('user', JSON.stringify(res?.data));
    });
  }, []);

  useEffect(() => {
    if (subRoute === 'privacy-policy') {
      setActiveTab(myAccount.PRIVACY_POLICY);
    } else if (subRoute === 'terms-and-conditions') {
      setActiveTab(myAccount.TERMS_AND_CONDITION);
    } else if (subRoute === 'notification-preferences') {
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
      label: ManageLocales('app.myAccount.tabs.terms&Conditions'),
      status: myAccount.TERMS_AND_CONDITION
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
      case myAccount.TERMS_AND_CONDITION:
        return <TermAndCondtions />;

      case myAccount.PROFILE_UPDATE:
        return (
          <ProfileUpdate
            handleFileUpload={handleFileUpload}
            handleDeleteAttachment={handleDeleteAttachment}
          />
        );
    }
  };

  return (
    <div className="mt-[16px] relative">
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        dialogStyle={{
          dialogContent:
            activeTab === myAccount.CHANGE_PASSWORD
              ? 'min-h-[250px]'
              : 'min-h-[222px]'
        }}
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

          {userAccountInfo?.customer &&
            Object.keys(userAccountInfo?.customer)?.length && (
              <div className="flex flex-col  justify-start gap-[8px]">
                <div className="flex items-center gap-[6px]">
                  <h1 className="text-lRegular font-regular text-neutral-900">
                    {' '}
                    {`${userAccountInfo?.customer?.first_name} ${userAccountInfo?.customer?.last_name}`}
                  </h1>
                  {userAccountInfo?.customer?.kyc?.status ===
                  kycStatus.APPROVED ? (
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
                          : userAccountInfo?.customer?.kyc?.status ===
                              kycStatus.APPROVED
                            ? 'border-successBorder bg-primaryModalRing text-successMain'
                            : '-'
                    } rounded py-[6px] px-[4px] flex justify-center items-center`}
                  >
                    {userAccountInfo?.customer?.kyc?.status ===
                    kycStatus.PENDING
                      ? 'KYC Pending'
                      : userAccountInfo?.customer?.kyc?.status ===
                          kycStatus.REJECTED
                        ? 'KYC Rejected'
                        : userAccountInfo?.customer?.kyc?.status ===
                            kycStatus.INPROGRESS
                          ? 'KYC In-progress'
                          : userAccountInfo?.customer?.kyc?.status ===
                              kycStatus.APPROVED
                            ? 'KYC Approved'
                            : '-'}
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
                    {`+${userAccountInfo?.customer?.country_code} ${userAccountInfo?.customer?.phone}` ??
                      '-'}
                  </p>
                </div>
              </div>
            )}
        </div>
        <div className="flex border-b border-transparent   text-mMedium font-medium px-[24px]">
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
