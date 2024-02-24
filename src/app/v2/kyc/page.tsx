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
import {
  useSendResetOtpMutation,
  useVerifyResetOTPMutation
} from '@/features/api/otp-verification';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import { handleResetOTP } from '../forgot-password/hooks/verify-reset-otp';
import arrowBackwar from '@public/v2/assets/icons/kyc/arrow-backward.svg';
import Image from 'next/image';
import StepperComponent from '@/components/v2/common/stepper';
import { validateScreen } from './helper/validations/screen/screen';
import { useKycMutation, useLazyGetKycDetailQuery } from '@/features/api/kyc';
import { kycScreenIdentifierNames, kycStatus } from '@/constants/enums/kyc';

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
  const { isInputDialogOpen } = modalState;
  const { setIsInputDialogOpen, setDialogContent, setIsDialogOpen } =
    modalSetState;
  const [kyc] = useKycMutation();
  const [sendResetOtp] = useSendResetOtpMutation();
  const [verifyResetOTP] = useVerifyResetOTPMutation();
  const [triggerKycDetail] = useLazyGetKycDetailQuery({});

  const [currentStepperStep, setCurrentStepperStep] = useState(0);
  // const [completedSteps, setCompletedSteps] = useState(new Set());
  // const [rejectedSteps, setRejectedSteps] = useState(new Set<number>());

  const [completedSteps] = useState(new Set());
  const [rejectedSteps] = useState(new Set<number>());

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
    const nextStep = currentStepperStep + 1;

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
      return;
    }

    // Make the API call to submit the form data
    try {
      const response: any = await kyc({
        data: {
          country: formState.country,
          offline: false,
          data: { ...formState.online.sections[screenName] }
        },
        ID: currentState
      });

      if (response?.data?.statusCode) {
        // Step was successfully completed, move to the next step
        setCurrentStepperStep(nextStep);
      } else {
        setIsDialogOpen(true); // Show error dialog
        setDialogContent(<></>);
      }
    } catch (error) {
      console.error(error); // Log any API call errors
    }
  };

  // Function to move back to the previous step
  const handleStepperBack = () => {
    setCurrentStepperStep(prevStep => (prevStep > 0 ? prevStep - 1 : 0));
  };

  // const validateStep = (index: number) => {
  //   const isValid = onValidation(index);
  //   if (isValid) {
  //     completedSteps.add(index);
  //     setCompletedSteps(new Set(completedSteps));
  //     rejectedSteps.delete(index);
  //     setRejectedSteps(new Set(rejectedSteps));
  //   } else {
  //     rejectedSteps.add(index);
  //     setRejectedSteps(new Set(rejectedSteps));
  //   }
  // };

  // const completeStepperStep = (stepIndex: number) => {
  //   setCompletedSteps(prevCompletedSteps => {
  //     const newCompletedSteps = new Set(prevCompletedSteps);
  //     newCompletedSteps.add(stepIndex);
  //     return newCompletedSteps;
  //   });
  // };

  const renderCompoent = (state: string) => {
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
            setIsInputDialogOpen={setIsInputDialogOpen}
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
            renderCompoent={renderCompoent}
            handleStepperNext={handleStepperNext}
            handleStepperBack={handleStepperBack}
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
                : handleResendOTP({
                    otpVerificationFormState,
                    setResendTimer,
                    sendOtp: sendResetOtp,
                    setIsDialogOpen,
                    setDialogContent,
                    setToken
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
                ? (handleResetOTP({
                    otpValues,
                    setCurrentState,
                    token,
                    setIsDialogOpen,
                    setDialogContent,
                    verifyResetOTP,
                    phoneNumber,
                    setToken
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
