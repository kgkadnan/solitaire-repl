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
  useLazyCustomerCheckQuery,
  useLazyGetProfilePhotoQuery,
  useUpdateCustomerProfileMutation
} from '@/features/api/my-profile';
import { useLazyGetAuthDataQuery } from '@/features/api/login';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import {
  profileUpdate,
  deleteProfileStore
} from '@/features/profile/profile-update-slice';
import Edit from '@public/v2/assets/icons/edit-number.svg?url';
import { InputDialogComponent } from '@/components/v2/common/input-dialog';
import { MobileInput } from '@/components/v2/common/input-field/mobile';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import { useOtpVerificationStateManagement } from '@/components/v2/common/otp-verication/hooks/otp-verification-state-management';
import { InputField } from '@/components/v2/common/input-field';
import CommonPoppup from '../login/component/common-poppup';
import OtpInput from '@/components/v2/common/otp';
import { setOptions } from 'leaflet';
import {
  useSendResetOtpMutation,
  useVerifyResetOTPMutation
} from '@/features/api/otp-verification';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import { useResendEmailOTPMutation } from '@/features/api/kyc';
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
    country_iso2_code: string;
  };
}
const initialTokenState = {
  token: '',
  phoneToken: '',
  tempToken: ''
};
const MyAccount = () => {
  const dispatch = useAppDispatch();
  const [deleteProfile] = useDeleteProfileMutation({});
  const updatePhoto: any = useAppSelector((store: any) => store.profileUpdate);

  const [isLoading, setIsLoading] = useState(false);
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
  const [triggerCustomerCheck] = useLazyCustomerCheckQuery({});
  const [verifyResetOTP] = useVerifyResetOTPMutation();
  const [sendResetOtp] = useSendResetOtpMutation();
  const [resendEmailOTP] = useResendEmailOTPMutation();
  const [updateCustomerProfile] = useUpdateCustomerProfileMutation();

  const [mobileInfoError, setMobileInfoError] = useState('');
  const [isRenderCotanctInfo, setIsRenderContactInfo] = useState(false);
  const [isRenderOtpVerification, setIsRenderOtpVerification] = useState(false);
  const [mobileNumberState, setMobileNumberState] = useState({
    iso: '',
    mobileNumber: '',
    countryCode: ''
  });

  const [contactInfoAction, setContactInfoAction] = useState('');
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [emailErrorText, setEmailErrorText] = useState('');
  //otp verification state
  const [errorOtp, setOtpError] = useState('');

  const { otpVericationState, otpVerificationSetState } =
    useOtpVerificationStateManagement();
  const { otpValues, resendTimer } = otpVericationState;
  const { setOtpValues, setResendTimer } = otpVerificationSetState;

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

  const handleEditContactInfo = ({
    event,
    setMobileNumberState
  }: {
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>;
    setMobileNumberState: React.Dispatch<React.SetStateAction<any>>;
  }) => {
    const { name, value } = event.target;
    console.log('name', name, value);
    setMobileNumberState((prev: any) => ({ ...prev, [name]: value }));
  };

  const renderContentWithInput = () => {
    return (
      <div className="flex gap-[12px] flex-col w-full h-[199px]">
        <div className="flex gap-[16px] flex-col  align-left">
          <p className="text-headingS text-neutral900 font-medium">
            {contactInfoAction === 'email'
              ? 'Update Email ID'
              : 'Update Mobile Number'}
          </p>
        </div>
        <div className="pb-2">
          {contactInfoAction === 'email' ? (
            <div className=" h-[65px]">
              <InputField
                label={ManageLocales('app.register.email')}
                onChange={event => {
                  setEmail(event.target.value);
                  setEmailErrorText('');
                }}
                type="email"
                name="email"
                value={email}
                errorText={emailErrorText}
                placeholder={ManageLocales('app.register.email.placeholder')}
                styles={{ inputMain: 'h-[64px]' }}
                autoComplete="none"
              />
            </div>
          ) : (
            <MobileInput
              label={ManageLocales('app.register.mobileNumber')}
              onChange={event => {
                setMobileInfoError('');
                handleEditContactInfo({ event, setMobileNumberState });
              }}
              type="number"
              name="mobileNumber"
              errorText={mobileInfoError}
              placeholder={'Enter mobile number'}
              registerFormState={mobileNumberState}
              setRegisterFormState={setMobileNumberState}
              value={mobileNumberState.mobileNumber}
            />
          )}
        </div>
        <div className="flex flex-1">
          <IndividualActionButton
            onClick={() => {
              setIsLoading(true);
              triggerCustomerCheck({
                email,
                phone: mobileNumberState.mobileNumber,
                country_code: mobileNumberState.countryCode
              })
                .then(() => {
                  let payload: any =
                    contactInfoAction === 'email'
                      ? { email: email }
                      : {
                          phone: mobileNumberState.mobileNumber,
                          country_code: mobileNumberState.countryCode
                        };

                  sendResetOtp({
                    data: payload,
                    query: contactInfoAction === 'email' ? 'email' : 'sms' // Use `email` or `sms` for the query dynamically
                  })
                    .then((res: any) => {
                      setIsRenderContactInfo(false);
                      setIsRenderOtpVerification(true);
                      console.log('resssss', res);
                      setOtpValues(['', '', '', '', '', '']);
                      setResendTimer(60);
                      setToken(res?.token || '');
                      setIsLoading(false);
                    })
                    .catch((e: any) => {
                      setIsLoading(false);
                      modalSetState.setIsDialogOpen(true);
                      modalSetState.setDialogContent(
                        <CommonPoppup
                          content=""
                          header={e?.data?.message}
                          handleClick={() =>
                            modalSetState.setIsDialogOpen(false)
                          }
                        />
                      );
                    });
                })
                .catch(e => {
                  setIsLoading(false);
                  console.log('eeeeeee', e);
                  if (contactInfoAction === 'email') {
                    setEmailErrorText(e?.data?.message);
                  } else {
                    setMobileInfoError(e?.data?.message);
                  }
                });
            }}
            disabled={
              !(mobileNumberState.mobileNumber.length || email.length) ||
              mobileNumberState.mobileNumber ===
                userAccountInfo?.customer?.phone ||
              email === userAccountInfo?.customer?.email
            }
            variant={'primary'}
            size={'custom'}
            className="rounded-[4px] flex-1 h-10"
          >
            {ManageLocales('app.OTPVerification.sendOtp')}
          </IndividualActionButton>
        </div>
      </div>
    );
  };

  function checkOTPEntry(otpEntry: string[]) {
    for (let i = 0; i < otpEntry.length; i++) {
      if (otpEntry[i] === '') {
        return false;
      }
    }
    return true;
  }

  const resendLabel = resendTimer > 0 ? `(${resendTimer}Sec)` : '';
  useEffect(() => {
    if (contactInfoAction === 'otpVerification') {
      let countdownInterval: NodeJS.Timeout;

      if (resendTimer > 0) {
        countdownInterval = setInterval(() => {
          setResendTimer((prevTimer: number) => prevTimer - 1);
        }, 1000);
      }

      return () => clearInterval(countdownInterval);
    }
  }, [resendTimer, contactInfoAction]);

  const renderOtpVerificationScreen = () => {
    return (
      <div className="flex flex-col gap-[18px] items-center">
        <div className="text-headingM text-neutral900 font-medium mt-[-75px]">
          {contactInfoAction === 'email'
            ? ManageLocales('app.emailVerfication')
            : ManageLocales('app.mobileVerfication')}
        </div>

        <div className="text-mRegular text-neutral900 flex items-center justify-center gap-[3px]">
          OTP has been sent to{' '}
          {`${
            contactInfoAction === 'email'
              ? email
              : `+${mobileNumberState.countryCode}${mobileNumberState.mobileNumber}`
          }`}
          <div
            className="cursor-pointer"
            onClick={() => {
              setResendTimer(60);
              setOtpValues(['', '', '', '', '', '']);
              setIsRenderOtpVerification(false);
              setIsRenderContactInfo(true);
            }}
          >
            <Edit />
          </div>
        </div>
        <div className="w-[100%] mt-[10px]">
          <OtpInput
            setOtpValues={setOtpValues}
            otpValues={otpValues}
            error={errorOtp}
          />
        </div>

        <div className="flex justify-center py-[10px]">
          <p className="text-neutral900 pr-10">Didn’t receive the email?</p>
          <p
            className={`${
              resendTimer > 0 ? 'text-neutral500' : 'text-infoMain'
            } cursor-pointer`}
            onClick={() =>
              resendTimer > 0
                ? {}
                : resendEmailOTP({})
                    .unwrap()
                    .then((res: any) => {
                      if (res) {
                        setToken(res?.token ?? '');
                        setResendTimer(60);
                        setOtpValues(['', '', '', '', '', '']);
                      }
                    })
                    .catch((e: any) => {
                      modalSetState.setIsDialogOpen(true);
                      modalSetState.setDialogContent(
                        <CommonPoppup
                          content=""
                          header={e?.data?.message}
                          handleClick={() =>
                            modalSetState.setIsDialogOpen(false)
                          }
                        />
                      );
                    })
            }
          >
            {ManageLocales('app.OTPVerification.resend')} {resendLabel}
          </p>
        </div>
        <div className="w-[100%]">
          {' '}
          <IndividualActionButton
            onClick={() => {
              checkOTPEntry(otpValues)
                ? (setIsLoading(true),
                  verifyResetOTP({
                    token: token,
                    otp: otpValues.join('')
                  })
                    .unwrap()
                    .then((res: any) => {
                      setIsLoading(false);

                      if (res) {
                        setContactInfoAction('');
                        setIsRenderOtpVerification(false);
                        setIsRenderContactInfo(false);
                        let payload: any =
                          contactInfoAction === 'email'
                            ? { email: email }
                            : {
                                phone: mobileNumberState.mobileNumber,
                                country_code: mobileNumberState.countryCode
                              };

                        updateCustomerProfile(payload)
                          .then(res => {
                            modalSetState.setIsDialogOpen(true);
                            modalSetState.setDialogContent(
                              <CommonPoppup
                                content={''}
                                status="success"
                                customPoppupBodyStyle="!mt-[65px]"
                                customPoppupStyle="h-[200px]"
                                header={
                                  'Your email has been verified successfully'
                                }
                                actionButtonData={[
                                  {
                                    variant: 'primary',
                                    label: 'Next',
                                    handler: () => {
                                      modalSetState.setIsDialogOpen(false);
                                    },
                                    customStyle: 'flex-1 w-full h-10'
                                  }
                                ]}
                              />
                            );
                          })
                          .catch(e => {});
                      }
                    })
                    .catch((e: any) => {
                      setIsLoading(false);
                      modalSetState.setIsDialogOpen(true);
                      modalSetState.setDialogContent(
                        <CommonPoppup
                          content=""
                          header={e?.data?.message}
                          handleClick={() =>
                            modalSetState.setIsDialogOpen(false)
                          }
                        />
                      );
                    }),
                  setOtpError(''))
                : setOtpError(
                    `We're sorry, but the OTP you entered is incorrect or has expired`
                  );
            }}
            disabled={isLoading}
            variant={'primary'}
            size={'custom'}
            className="rounded-[4px] w-[100%] h-10"
          >
            {ManageLocales('app.verifyOTP')}
          </IndividualActionButton>
        </div>
      </div>
    );
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
      {isLoading && <CustomKGKLoader />}
      <InputDialogComponent
        isOpen={isRenderCotanctInfo || isRenderOtpVerification}
        onClose={() => {
          setContactInfoAction('');
          setIsRenderContactInfo(false);
          setIsRenderOtpVerification(false);
        }}
        renderContent={
          isRenderOtpVerification
            ? renderOtpVerificationScreen
            : renderContentWithInput
        }
        dialogStyle={`${
          isRenderOtpVerification
            ? 'h-[350px] min-h-[350px]'
            : 'h-[220px] min-h-[220px]'
        }`}
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
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setContactInfoAction('email');
                      setIsRenderContactInfo(true);
                      setEmail(userAccountInfo?.customer?.email);
                    }}
                  >
                    <Edit />
                  </div>
                </div>
                <div className="flex items-center gap-[6px]">
                  {' '}
                  <Phone />
                  <p className="text-mRegular font-regular text-neutral-600">
                    {' '}
                    {`+${userAccountInfo?.customer?.country_code} ${userAccountInfo?.customer?.phone}` ??
                      '-'}
                  </p>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setContactInfoAction('mobile');
                      setIsRenderContactInfo(true);
                      setMobileNumberState({
                        iso:
                          userAccountInfo?.customer?.country_iso2_code.toLocaleUpperCase() ??
                          '',
                        mobileNumber: userAccountInfo?.customer?.phone ?? '',
                        countryCode:
                          userAccountInfo?.customer?.country_code ?? ''
                      });
                    }}
                  >
                    <Edit />
                  </div>
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
