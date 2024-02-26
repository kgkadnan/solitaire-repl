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
import { handleResendOTP } from '@/components/v2/common/otp-verication/helpers/handle-resend-otp';
import errorSvg from '@public/v2/assets/icons/modal/error.svg';
import {
  useVerifyEmailOTPMutation,
  useResendEmailOTPMutation
} from '@/features/api/kyc';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import arrowBackwar from '@public/v2/assets/icons/kyc/arrow-backward.svg';
import Image from 'next/image';
import StepperComponent from '@/components/v2/common/stepper';
import { validateScreen } from './helper/validations/screen/screen';
import { useKycMutation, useLazyGetKycDetailQuery } from '@/features/api/kyc';
import { kycScreenIdentifierNames, kycStatus } from '@/constants/enums/kyc';
import ActionButton from '@/components/v2/common/action-button';
import { DialogComponent } from '@/components/v2/common/dialog';
import InvalidCreds from '../login/component/invalid-creds';

const initialTokenState = {
  token: '',
  phoneToken: '',
  tempToken: ''
};
const KYC = () => {
  const { formState, formErrorState } = useSelector((state: any) => state.kyc);
  const [currentState, setCurrentState] = useState('country_selection');
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

  const [currentStepperStep, setCurrentStepperStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [rejectedSteps, setRejectedSteps] = useState(new Set<number>());

  // const [completedSteps] = useState(new Set());
  // const [rejectedSteps] = useState(new Set<number>());

  const [isResumeCalled, setIsResumeCalled] = useState<boolean>(false);

  const [phoneNumber] = useState<{
    countryCode: string;
    phoneNumber: string;
  }>({ countryCode: '', phoneNumber: '' });

  const [token, setToken] = useState(initialTokenState);
  const [errorOtp, setOtpError] = useState('');
  const { otpVericationState, otpVerificationSetState } =
    useOtpVerificationStateManagement();
  const { otpValues, resendTimer, otpVerificationFormState } =
    otpVericationState;
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
                //need to work
                // setDialogContent(
                //   <>
                //     <div className="text-center align-middle text-solitaireTertiary">
                //       <p className="text-[20px] font-semibold">Are you sure?</p>
                //     </div>
                //     <div className="text-center align-middle text-solitaireTertiary text-[16px] px-[20px]">
                //       Do you want to resume KYC process or restart it?
                //     </div>
                //     <div className=" flex justify-around align-middle text-solitaireTertiary gap-[25px] ">
                //       <CustomDisplayButton
                //         displayButtonLabel="Restart"
                //         handleClick={handleResetButton}
                //         displayButtonAllStyle={{
                //           displayButtonStyle:
                //             ' bg-transparent   border-[1px] border-solitaireQuaternary  w-[150px] h-[35px]',
                //           displayLabelStyle:
                //             'text-solitaireTertiary text-[14px] font-medium'
                //         }}
                //       />
                //       <CustomDisplayButton
                //         displayButtonLabel="Resume"
                //         handleClick={() => {
                //           setIsDialogOpen(false);
                //           setDialogContent('');
                //         }}
                //         displayButtonAllStyle={{
                //           displayButtonStyle:
                //             'bg-solitaireQuaternary w-[150px] h-[35px]',
                //           displayLabelStyle:
                //             'text-solitaireTertiary text-[14px] font-medium'
                //         }}
                //       />
                //     </div>
                //   </>
                // );
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
                      customStyle: 'flex-1 w-full'
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
                    customStyle: 'flex-1 w-full'
                  }
                ]}
              />
            </div>
          </>
        );
      });
  };
  console.log(token, 'pppppppppp');
  // Function to move back to the previous step
  const handleStepperBack = () => {
    if (currentStepperStep === 0) {
      setCurrentState('submission_option');
    } else {
      setCurrentStepperStep(prevStep => (prevStep > 0 ? prevStep - 1 : 0));
    }
  };

  // const completeStepperStep = (stepIndex: number) => {
  //   setCompletedSteps(prevCompletedSteps => {
  //     const newCompletedSteps = new Set(prevCompletedSteps);
  //     newCompletedSteps.add(stepIndex);
  //     return newCompletedSteps;
  //   });
  // };
  const renderComponent = (state: string) => {
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
            country={'India'}
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
    }
  };

  const renderContent = () => {
    switch (currentState) {
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
            country={selectedCountry}
            currentStepperStep={currentStepperStep}
            setCurrentStepperStep={setCurrentStepperStep}
            completedSteps={completedSteps}
            rejectedSteps={rejectedSteps}
            renderComponent={renderComponent}
            handleStepperNext={handleStepperNext}
            handleStepperBack={handleStepperBack}
            isEmailVerified={formState.isEmailVerified}
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
          <p className="text-neutral-900 pr-10">Didn’t receive the email?</p>
          <p
            className={`${
              resendTimer > 0 ? 'text-neutral-200' : 'text-infoMain'
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
            className="rounded-[4px] w-[100%] "
          >
            {ManageLocales('app.verifyOTP')}
          </IndividualActionButton>
          <IndividualActionButton
            onClick={() => {
              setIsInputDialogOpen(false);
            }}
            variant={'secondary'}
            size={'custom'}
            className="rounded-[4px] w-[100%] !border-none"
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
