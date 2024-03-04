'use client';
import React, { useEffect, useState } from 'react';
import CountrySelection from './components/country-selection';
import { useAppDispatch } from '@/hooks/hook';
import { updateFormState } from '@/features/kyc/kyc';
import SubmissionOption from './components/submission-option';
import CompanyOwnerDetail from './components/company-owner-detail';
import { useSelector } from 'react-redux';
import BankingDetails from './components/banking-details';
import PersonalDetail from './components/personal-detail';
import { InputDialogComponent } from '@/components/v2/common/input-dialog';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { ManageLocales } from '@/utils/v2/translate';
import OtpInput from '@/components/v2/common/otp';
import { useOtpVerificationStateManagement } from '@/components/v2/common/otp-verication/hooks/otp-verification-state-management';
import errorSvg from '@public/v2/assets/icons/modal/error.svg';
import confirmIcon from '@public/v2/assets/icons/modal/confirm.svg';
import warningIcon from 'public/v2/assets/icons/modal/warning.svg';
import {
  useVerifyEmailOTPMutation,
  useResendEmailOTPMutation,
  useSubmitKYCMutation,
  useResetKycMutation
} from '@/features/api/kyc';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import arrowBackwar from '@public/v2/assets/icons/kyc/arrow-backward.svg';
import Image from 'next/image';
import StepperComponent from '@/components/v2/common/stepper';
import {
  validateAttachment,
  validateManualAttachment,
  validateScreen
} from './helper/validations/screen/screen';
import { useKycMutation, useLazyGetKycDetailQuery } from '@/features/api/kyc';
import {
  countries,
  kycScreenIdentifierNames,
  kycStatus
} from '@/constants/enums/kyc';
import ActionButton from '@/components/v2/common/action-button';
import { DialogComponent } from '@/components/v2/common/dialog';
import InvalidCreds from '../login/component/invalid-creds';
import CompanyDetail from './components/company-detail';
import { RenderAttachment } from './components/attachement';
import { RenderOffline } from './components/render-offline';
import { useLazyGetAuthDataQuery } from '@/features/api/login';
import { isEditingKYC } from '@/features/kyc/is-editing-kyc';
import { KycStatusScreen } from '@/components/v2/common/kyc-status-screen';
import logger from 'logging/log-util';
import { statusCode } from '@/constants/enums/status-code';

const initialTokenState = {
  token: '',
  phoneToken: '',
  tempToken: ''
};
const KYC = () => {
  const { formState, formErrorState } = useSelector((state: any) => state.kyc);
  const [currentState, setCurrentState] = useState('online');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSubmissionOption, setSelectedSubmissionOption] = useState('');
  const { modalState, modalSetState } = useModalStateManagement();
  const { isInputDialogOpen, isDialogOpen, dialogContent } = modalState;
  const { setIsInputDialogOpen, setDialogContent, setIsDialogOpen } =
    modalSetState;
  const [kyc] = useKycMutation();
  const [verifyEmailOTP] = useVerifyEmailOTPMutation();
  const [resendEmailOTP] = useResendEmailOTPMutation();
  const [triggerKycDetail] = useLazyGetKycDetailQuery({});

  const [submitKYC] = useSubmitKYCMutation();
  const [triggerAuth] = useLazyGetAuthDataQuery();
  const [resetKyc] = useResetKycMutation();

  const [currentStepperStep, setCurrentStepperStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [rejectedSteps, setRejectedSteps] = useState(new Set<number>());

  // const [completedSteps] = useState(new Set());
  // const [rejectedSteps] = useState(new Set<number>());

  const [isResumeCalled, setIsResumeCalled] = useState<boolean>(false);

  const [token, setToken] = useState(initialTokenState);
  const [errorOtp, setOtpError] = useState('');
  const { otpVericationState, otpVerificationSetState } =
    useOtpVerificationStateManagement();
  const { otpValues, resendTimer } = otpVericationState;
  const { setOtpValues, setResendTimer } = otpVerificationSetState;

  const dispatch = useAppDispatch();

  const handleCountrySelection = (country: string) => {
    setSelectedCountry(country);
    setCurrentState('submission_option');
    dispatch(
      updateFormState({
        name: 'formState.country',
        value: country
      })
    );
  };

  const handleSubmissionOptionClick = (selection: string) => {
    setSelectedSubmissionOption(selection);
    setCurrentState(selection);
    dispatch(
      updateFormState({
        name: 'formState.offline',
        value: selection !== 'online'
      })
    );
  };

  const handleBack = (currentState: string) => {
    setCurrentState(currentState);
  };

  const resendLabel = resendTimer > 0 ? `(${resendTimer}Sec)` : '';
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (resendTimer > 0) {
      countdownInterval = setInterval(() => {
        setResendTimer((prevTimer: number) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [resendTimer]);

  function findFirstNonFilledScreens(data: any) {
    const filledScreens = Object.keys(data).map(Number);
    const maxScreen = Math.max(...filledScreens);

    const nonFilledScreens = [];

    for (let i = 1; i <= maxScreen; i++) {
      if (!filledScreens.includes(i)) {
        nonFilledScreens.push(i);
      }
    }

    if (nonFilledScreens.length) {
      return nonFilledScreens;
    } else {
      return [maxScreen + 1];
    }
  }

  const handleTermAndCondition = (state: boolean) => {
    dispatch(
      updateFormState({
        name: `formErrorState.termAndCondition`,
        value: false
      })
    );
    dispatch(
      updateFormState({
        name: `formState.termAndCondition`,
        value: state
      })
    );
  };

  const handleConfirmRestartKyc = () => {
    resetKyc({})
      .then((res: any) => {
        if (res.data.statusCode === statusCode.SUCCESS) {
          setCurrentState('country_selection');
          setSelectedCountry('');
          setSelectedSubmissionOption('');
          setCurrentStepperStep(0);
          dispatch(
            updateFormState({
              name: 'formState.country',
              value: null
            })
          );
          dispatch(
            updateFormState({
              name: 'formState.online.sections',
              value: {
                personal_details:
                  res.data.data?.kyc?.profile_data?.online?.['1'],
                company_details: {},
                company_owner_details: {},
                banking_details: {}
              }
            })
          );
          dispatch(
            updateFormState({
              name: 'formErrorState.online.sections',
              value: {
                personal_details: {},
                company_details: {},
                company_owner_details: {},
                banking_details: {}
              }
            })
          );

          setIsDialogOpen(false);
        }
      })
      .catch((e: any) => {
        logger.error(`something went wrong while restart kyc ${e}`);
      });
  };

  const handleResetButton = () => {
    setIsDialogOpen(true);
    setIsDialogOpen(true);
    setDialogContent(
      <>
        <div className="absolute left-[-84px] top-[-84px]">
          <Image src={warningIcon} alt="warningIcon" />
        </div>
        <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
          <div>
            <h1 className="text-headingS text-neutral900">Are you sure?</h1>
            <p className="text-neutral600 text-mRegular">
              Do you want to restart KYC process
            </p>
          </div>
          <ActionButton
            actionButtonData={[
              {
                variant: 'secondary',
                label: ManageLocales('app.modal.yes'),
                handler: () => handleConfirmRestartKyc()
              },
              {
                variant: 'primary',
                label: ManageLocales('app.modal.no'),
                handler: () => {
                  setIsDialogOpen(false);
                }
              }
            ]}
          />
        </div>
      </>
    );
  };

  useEffect(() => {
    triggerKycDetail({}).then(res => {
      let kycDetails = res?.data;
      if (kycDetails?.kyc?.status) {
        switch (kycDetails?.kyc?.status) {
          case kycStatus.INPROGRESS:
            if (
              kycDetails &&
              kycDetails?.kyc &&
              !isResumeCalled &&
              (kycDetails?.kyc?.profile_data?.country !== null ||
                Object.keys(kycDetails?.kyc?.profile_data?.online).length >
                  1) &&
              Object?.keys(kycDetails?.kyc?.profile_data?.offline).length === 0
            ) {
              setIsResumeCalled(true);
              const { online, offline } = kycDetails.kyc.profile_data;

              const onlineData = online || {};

              let firstNonFilledScreens =
                findFirstNonFilledScreens(onlineData)[0] - 1;

              if (firstNonFilledScreens > 0) {
                setCurrentState('online');
                setCurrentStepperStep(firstNonFilledScreens);

                offline
                  ? setSelectedSubmissionOption('online')
                  : setSelectedSubmissionOption('offline');

                setIsDialogOpen(true);
                setDialogContent(
                  <>
                    <div className="absolute left-[-84px] top-[-84px]">
                      <Image src={warningIcon} alt="warningIcon" />
                    </div>
                    <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                      <div>
                        <h1 className="text-headingS text-neutral900">
                          Do you want to resume KYC process or restart it?
                        </h1>
                      </div>
                      <ActionButton
                        actionButtonData={[
                          {
                            variant: 'secondary',
                            label: ManageLocales('app.modal.no'),
                            handler: () => handleResetButton()
                          },
                          {
                            variant: 'primary',
                            label: ManageLocales('app.modal.yes'),
                            handler: () => {
                              setIsDialogOpen(false);
                            }
                          }
                        ]}
                      />
                    </div>
                  </>
                );
              }
            } else {
              setCurrentState('country_selection');
            }

            let sectionKeys: string[] =
              kycDetails?.kyc?.profile_data?.country === 'India'
                ? [
                    kycScreenIdentifierNames.PERSONAL_DETAILS,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    kycScreenIdentifierNames.COMPANY_OWNER_DETAILS,
                    kycScreenIdentifierNames.BANKING_DETAILS
                  ]
                : [
                    kycScreenIdentifierNames.PERSONAL_DETAILS,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    kycScreenIdentifierNames.BANKING_DETAILS
                  ];

            sectionKeys.forEach((key, index: number) => {
              let screenIndex = (index + 1).toString();

              let onlineValue = kycDetails?.kyc?.profile_data?.online;

              dispatch(
                updateFormState({
                  name: `formState.online.sections[${key}]`,
                  value:
                    onlineValue?.[screenIndex as keyof typeof onlineValue] ?? {}
                })
              );
            });
            setSelectedCountry(
              kycDetails?.kyc?.profile_data?.country
                ? kycDetails?.kyc?.profile_data?.country
                : ''
            );

            dispatch(
              updateFormState({
                name: 'formState.country',
                value: kycDetails?.kyc?.profile_data?.country
              })
            );

            dispatch(
              updateFormState({
                name: 'formState.isEmailVerified',
                value: kycDetails?.kyc?.is_email_verified
              })
            );

            setSelectedSubmissionOption(
              kycDetails?.kyc?.profile_data?.mode
                ? kycDetails?.kyc?.profile_data?.mode
                : ''
            );

            dispatch(
              updateFormState({
                name: 'formState.attachment',
                value: kycDetails?.kyc?.profile_data?.offline['2']
              })
            );

            Object.keys(kycDetails?.kyc?.profile_data?.offline['2']).map(
              key => {
                console.log(key);
                dispatch(
                  updateFormState({
                    name: `formState.attachment[${key}].isFileUploaded`,
                    value: true
                  })
                );
              }
            );
            break;
          case kycStatus.PENDING:
            setCurrentState(kycStatus.PENDING);
            break;

          case kycStatus.APPROVED:
            setCurrentState(kycStatus.APPROVED);
            break;
          case kycStatus.REJECTED:
            setCurrentState(kycStatus.REJECTED);
            break;
        }
      }
    });
  }, []);

  function checkOTPEntry(otpEntry: string[]) {
    for (let i = 0; i < otpEntry.length; i++) {
      if (otpEntry[i] === '') {
        return false;
      }
    }
    return true;
  }

  const handleStepperNext = async ({
    screenName,
    currentState
  }: {
    screenName: string;
    currentState: number;
  }) => {
    // const nextStep = currentStepperStep + 1;
    // Perform data validation
    const validationError = await validateScreen(
      formState.online.sections[screenName],
      screenName,
      formState.country
    );

    if (Array.isArray(validationError)) {
      validationError.forEach(error => {
        dispatch(
          updateFormState({
            name: `formErrorState.online.sections[${screenName}].${error.property}`,
            value: Object.values(error.constraints ?? {})[0] || ''
          })
        );
      });
    } else {
      dispatch(
        updateFormState({
          name: `formErrorState.online.sections.${[screenName]}`,
          value: {}
        })
      );
    }

    // Make the API call to submit the form data

    await kyc({
      data: {
        country: formState.country,
        offline: false,
        data: { ...formState.online.sections[screenName] }
      },
      ID: currentState + 1
    })
      .then((response: any) => {
        if (!validationError.length) {
          // Step was successfully completed, move to the next step
          // console.log('nextStep', nextStep);
          completedSteps.add(currentState);
          setCompletedSteps(new Set(completedSteps));
          rejectedSteps.delete(currentState);
          setRejectedSteps(new Set(rejectedSteps));
          screenName === kycScreenIdentifierNames.PERSONAL_DETAILS &&
          !formState.isEmailVerified
            ? (setIsInputDialogOpen(true),
              setToken((prev: any) => ({
                ...prev,
                token: response?.data?.data?.token || ''
              })))
            : {};
          // setCurrentStepperStep(nextStep);
        } else {
          rejectedSteps.add(currentState);
          setRejectedSteps(new Set(rejectedSteps));

          setIsDialogOpen(true); // Show error dialog
          setDialogContent(
            <>
              <div className="absolute left-[-84px] top-[-84px]">
                <Image src={errorSvg} alt="errorSvg" />
              </div>
              <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                <p className="text-neutral600 text-mRegular">
                  {response?.error?.data?.message}
                </p>
                <ActionButton
                  actionButtonData={[
                    {
                      variant: 'primary',
                      label: ManageLocales('app.modal.okay'),
                      handler: () => {
                        setIsDialogOpen(false);
                      },
                      customStyle: 'flex-1 w-full h-10'
                    }
                  ]}
                />
              </div>
            </>
          );
        }
      })
      .catch(error => {
        rejectedSteps.add(currentState);
        setRejectedSteps(new Set(rejectedSteps));
        setIsDialogOpen(true); // Show error dialog
        setDialogContent(
          <>
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={errorSvg} alt="errorSvg" />
            </div>
            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
              <p className="text-neutral600 text-mRegular">
                {error?.data?.message}
              </p>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => {
                      setIsDialogOpen(false);
                    },
                    customStyle: 'flex-1 w-full h-10'
                  }
                ]}
              />
            </div>
          </>
        );
      });
  };
  // Function to move back to the previous step
  const handleStepperBack = () => {
    if (currentStepperStep === 0) {
      setCurrentState('submission_option');
    } else {
      setCurrentStepperStep(prevStep => (prevStep > 0 ? prevStep - 1 : 0));
    }
  };

  const kycSubmitted = async () => {
    setIsDialogOpen(false);
    await submitKYC({
      country: selectedCountry,
      offline:
        formState.country === countries.DUBAI ||
        selectedSubmissionOption === 'offline'
          ? true
          : false
    })
      .unwrap()
      .then(() => {
        const authToken = JSON.parse(localStorage.getItem('auth')!);

        triggerAuth(authToken).then(res => {
          localStorage.setItem('user', JSON.stringify(res?.data));
        });
        dispatch(isEditingKYC(false));
        setIsDialogOpen(true);
        setDialogContent(
          <>
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={confirmIcon} alt="confirmIcon" />
            </div>
            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
              <div>
                <h1 className="text-headingS text-neutral900">Are you sure?</h1>
                <p className="text-neutral600 text-mRegular">
                  Please review all the information you have entered before
                  submitting the form!
                </p>
              </div>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.modal.cancel'),
                    handler: () => setIsDialogOpen(false),
                    customStyle: 'w-full flex-1'
                  }
                ]}
              />
            </div>
          </>
        );
      })
      .catch(e => {
        setIsDialogOpen(true); // Show error dialog
        setDialogContent(
          <>
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={errorSvg} alt="errorSvg" />
            </div>
            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
              <p className="text-neutral600 text-mRegular">
                {e?.data?.message}
              </p>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => {
                      setIsDialogOpen(false);
                    },
                    customStyle: 'flex-1 w-full h-10'
                  }
                ]}
              />
            </div>
          </>
        );
      });
  };

  const handleSubmit = async () => {
    let manualValidationError: any = [];
    let onlineValidator: any = [];

    if (
      formState.country === countries.DUBAI ||
      selectedSubmissionOption === 'offline'
    ) {
      manualValidationError = await validateManualAttachment(
        formState.attachment
      );
      if (Array.isArray(manualValidationError)) {
        manualValidationError.forEach(error => {
          dispatch(
            updateFormState({
              name: `formErrorState.attachment.${[error.property]}`,
              value: Object.values(error.constraints ?? {})[0] || ''
            })
          );
        });
      }
    } else {
      const screenValidationError = formErrorState?.online?.sections;
      onlineValidator = [];

      for (const key of Object.keys(screenValidationError)) {
        let validationErrors = await validateScreen(
          formState.online.sections[key],
          key,
          formState.country
        );
        // If validationErrors is an array, add its elements to onlineValidator
        if (Array.isArray(validationErrors)) {
          onlineValidator.push(...validationErrors);
        }
      }
    }

    let validationError = await validateAttachment(
      formState.attachment,
      selectedCountry
    );

    if (Array.isArray(validationError)) {
      validationError.forEach(error => {
        dispatch(
          updateFormState({
            name: `formErrorState.attachment.${[error.property]}`,
            value: Object.values(error.constraints ?? {})[0] || ''
          })
        );
      });
    }

    if (
      !validationError?.length &&
      !onlineValidator.length &&
      !manualValidationError.length
    ) {
      if (!formState.termAndCondition) {
        dispatch(
          updateFormState({
            name: `formErrorState.termAndCondition`,
            value: true
          })
        );
      } else {
        setIsDialogOpen(true);
        setDialogContent(
          <>
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={confirmIcon} alt="confirmIcon" />
            </div>
            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
              <div>
                <h1 className="text-headingS text-neutral900">Are you sure?</h1>
                <p className="text-neutral600 text-mRegular">
                  Please review all the information you have entered before
                  submitting the form!
                </p>
              </div>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.modal.cancel'),
                    handler: () => setIsDialogOpen(false)
                  },
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.submit'),
                    handler: () => {
                      kycSubmitted();
                    }
                  }
                ]}
              />
            </div>
          </>
        );
      }
    }
  };

  // const completeStepperStep = (stepIndex: number) => {
  //   setCompletedSteps(prevCompletedSteps => {
  //     const newCompletedSteps = new Set(prevCompletedSteps);
  //     newCompletedSteps.add(stepIndex);
  //     return newCompletedSteps;
  //   });
  // };
  const renderStepperComponent = (state: string) => {
    switch (state) {
      case kycScreenIdentifierNames.COMPANY_OWNER_DETAILS:
        return (
          <CompanyOwnerDetail
            formErrorState={formErrorState}
            formState={formState}
            dispatch={dispatch}
          />
        );
      case kycScreenIdentifierNames.BANKING_DETAILS:
        return (
          <BankingDetails
            formErrorState={formErrorState}
            formState={formState}
            dispatch={dispatch}
            country={formState.country}
          />
        );
      case kycScreenIdentifierNames.PERSONAL_DETAILS:
        return (
          <PersonalDetail
            formErrorState={formErrorState}
            formState={formState}
            dispatch={dispatch}
          />
        );
      case kycScreenIdentifierNames.COMPANY_DETAILS:
        return (
          <CompanyDetail
            formErrorState={formErrorState}
            formState={formState}
            dispatch={dispatch}
            country={'India'}
          />
        );

      case kycScreenIdentifierNames.ATTACHMENT:
        return (
          <RenderAttachment
            formErrorState={formErrorState}
            formState={formState}
            selectedSubmissionOption={selectedSubmissionOption}
            modalSetState={modalSetState}
            modalState={modalState}
            country={'India'}
            handleTermAndCondition={handleTermAndCondition}
          />
        );
    }
  };

  const renderContent = () => {
    switch (currentState) {
      case kycStatus.PENDING:
        return <KycStatusScreen status={kycStatus.PENDING} />;
      case kycStatus.APPROVED:
        return <KycStatusScreen status={kycStatus.APPROVED} />;
      case kycStatus.REJECTED:
        return <KycStatusScreen status={kycStatus.REJECTED} />;
      case 'country_selection':
        return (
          <CountrySelection
            handleCountrySelection={handleCountrySelection}
            selectedCountry={selectedCountry}
          />
        );
      case 'submission_option':
        return (
          <SubmissionOption
            handleSubmissionOptionClick={handleSubmissionOptionClick}
            selectedSubmissionOption={selectedSubmissionOption}
            handleBack={handleBack}
          />
        );

      case 'online':
        return (
          <StepperComponent
            country={selectedCountry ?? formState.country}
            currentStepperStep={currentStepperStep}
            setCurrentStepperStep={setCurrentStepperStep}
            completedSteps={completedSteps}
            rejectedSteps={rejectedSteps}
            renderStepperComponent={renderStepperComponent}
            handleStepperNext={handleStepperNext}
            handleStepperBack={handleStepperBack}
            isEmailVerified={formState.isEmailVerified}
          />
        );

      case countries.DUBAI:
      case 'offline':
        return (
          <RenderOffline
            formErrorState={formErrorState}
            formState={formState}
            fromWhere={currentState}
            selectedSubmissionOption={selectedSubmissionOption}
            modalSetState={modalSetState}
            modalState={modalState}
            country={selectedCountry ?? formState.country}
            handleTermAndCondition={handleTermAndCondition}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
          />
        );
    }
  };

  const renderContentWithInput = () => {
    return (
      <div className="flex flex-col gap-[18px] items-center">
        <h1 className="text-headingM text-neutral900 font-medium">
          {ManageLocales('app.modal.kyc.emailVerification')}
        </h1>
        <div className="flex flex-col text-mRegular text-neutral900 font-regular text-center gap-[8px]">
          <p>
            Please check your inbox for an email with the subject line
            &quot;Email Verification&quot;.{' '}
          </p>
          <p>
            Enter the code provided in the email to confirm and validate your
            email address.{' '}
          </p>
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
                        setResendTimer(60);
                        //  setIsInputDialogOpen(false)
                        //  dispatch(
                        //   updateFormState({
                        //     name: 'formState.isEmailVerified',
                        //     value: true
                        //   })
                        // );
                      }
                    })
                    .catch((e: any) => {
                      setIsDialogOpen(true);
                      setDialogContent(
                        <InvalidCreds
                          content={e?.data?.message}
                          handleClick={() => setIsDialogOpen(false)}
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
            onClick={() =>
              checkOTPEntry(otpValues)
                ? (verifyEmailOTP({
                    token: token.token,
                    otp: otpValues.join('')
                  })
                    .unwrap()
                    .then((res: any) => {
                      if (res) {
                        setIsInputDialogOpen(false);
                        dispatch(
                          updateFormState({
                            name: 'formState.isEmailVerified',
                            value: true
                          })
                        );
                      }
                    })
                    .catch((e: any) => {
                      setIsDialogOpen(true);
                      setDialogContent(
                        <InvalidCreds
                          content={e?.data?.message}
                          handleClick={() => setIsDialogOpen(false)}
                        />
                      );
                    }),
                  setOtpError(''))
                : setOtpError(
                    `We're sorry, but the OTP you entered is incorrect or has expired`
                  )
            }
            variant={'primary'}
            size={'custom'}
            className="rounded-[4px] w-[100%] h-10"
          >
            {ManageLocales('app.verifyOTP')}
          </IndividualActionButton>
          <IndividualActionButton
            onClick={() => {
              setIsInputDialogOpen(false);
            }}
            variant={'secondary'}
            size={'custom'}
            className="rounded-[4px] w-[100%] !border-none h-10"
          >
            <Image src={arrowBackwar} alt="arrowBackwar" />
            <span className="ml-[4px]">
              {' '}
              {ManageLocales('app.verifyOtp.goBack')}
            </span>
          </IndividualActionButton>
        </div>
      </div>
    );
  };

  return (
    <div className="relative ">
      {' '}
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <InputDialogComponent
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
        dialogStyle={'max-w-[450px] min-h-[460px]'}
      />
      {renderContent()}
    </div>
  );
};

export default KYC;
