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
import CommonPoppup from '../login/component/common-poppup';
import CompanyDetail from './components/company-detail';
import { RenderAttachment } from './components/attachement';
import { RenderOffline } from './components/render-offline';
import { useLazyGetAuthDataQuery } from '@/features/api/login';
import { isEditingKYC } from '@/features/kyc/is-editing-kyc';
import { KycStatusScreen } from '@/components/v2/common/kyc-status-screen';
import logger from 'logging/log-util';
import { statusCode } from '@/constants/enums/status-code';
import { useRouter } from 'next/navigation';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';

const initialTokenState = {
  token: '',
  phoneToken: '',
  tempToken: ''
};
const KYC = () => {
  const router = useRouter();
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
  const [submitKYC] = useSubmitKYCMutation();
  const [triggerAuth] = useLazyGetAuthDataQuery();
  const [resetKyc] = useResetKycMutation();

  const [isLoading, setIsLoading] = useState(false);

  const [currentStepperStep, setCurrentStepperStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [rejectedSteps, setRejectedSteps] = useState(new Set<number>());

  const [isResumeCalled, setIsResumeCalled] = useState<boolean>(false);

  const [token, setToken] = useState(initialTokenState);
  const [errorOtp, setOtpError] = useState('');
  const { otpVericationState, otpVerificationSetState } =
    useOtpVerificationStateManagement();
  const { otpValues, resendTimer } = otpVericationState;
  const { setOtpValues, setResendTimer } = otpVerificationSetState;

  const dispatch = useAppDispatch();
  const handleCountrySelection = (country: string) => {
    if (formState.country === country) {
      setSelectedCountry(country);
    } else {
      setSelectedCountry(country);
      setSelectedSubmissionOption('');
    }

    if (country === countries.OTHER) {
      setCurrentState(countries.OTHER);
    } else {
      setCurrentState('submission_option');
    }

    dispatch(
      updateFormState({
        name: 'formState.country',
        value: country
      })
    );
  };

  const handleSubmissionOptionClick = (selection: string) => {
    if (selectedSubmissionOption === selection) {
      setSelectedSubmissionOption(selection);
    } else {
      setSelectedSubmissionOption(selection);
      dispatch(
        updateFormState({
          name: 'formState.attachment',
          value: {}
        })
      );
    }

    setCurrentState(selection);
    dispatch(
      updateFormState({
        name: 'formState.offline',
        value: selection !== 'online'
      })
    );
  };

  const handleBack = (currentState: string) => {
    if (currentState === countries.OTHER) {
      setCurrentState('country_selection');
    } else {
      setCurrentState(currentState);
    }
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

  async function findFirstNonFilledScreens(data: any, country: string) {
    let sectionKeys: string[] =
      country === 'India'
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

    // Wait for all screen validations to complete
    const filledScreensResults = await Promise.all(
      Object.keys(data).map(async (item, index) => {
        // It seems like there might be an error here, as you're using `index + 1` which might not correspond to the correct key in `data`
        // Assuming `item` is the correct key to access the data object:
        let validationErrors = await validateScreen(
          data[item],
          sectionKeys[index],
          country
        );

        dispatch(
          updateFormState({
            name: `formErrorState.online.sections.${[sectionKeys[index]]}`,
            value: {}
          })
        );

        if (!validationErrors.length) {
          if (sectionKeys.length - 1 >= index) {
            return Number(item);
          }
        }
        return undefined;
      })
    );

    // Filter out undefined values to get filled screens
    const filledScreens = filledScreensResults.filter(
      (screen): screen is number => screen !== undefined
    );

    // Determine the maximum filled screen
    const maxScreen = filledScreens.length > 0 ? Math.max(...filledScreens) : 0;

    const nonFilledScreens = [];

    for (let i = 1; i <= maxScreen; i++) {
      if (!filledScreens.includes(i)) {
        nonFilledScreens.push(i);
      }
    }

    // Add the next screen after the last filled one if no non-filled screens were found
    if (nonFilledScreens.length === 0 && maxScreen > 0) {
      nonFilledScreens.push(maxScreen + 1);
    }

    // If no screens have been filled, start with the first one
    if (nonFilledScreens.length === 0) {
      nonFilledScreens.push(1);
    }

    return nonFilledScreens;
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
        setCurrentStepperStep(0);
        setCompletedSteps(new Set());
        if (res.data.statusCode === statusCode.SUCCESS) {
          setSelectedCountry('');
          setSelectedSubmissionOption('');

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
          setCurrentState('country_selection');

          setIsDialogOpen(false);
        }
      })
      .catch((e: any) => {
        logger.error(`something went wrong while restart kyc ${e}`);
      });
  };

  const handleResetButton = () => {
    setIsDialogOpen(true);
    setDialogContent(
      <>
        <div className="absolute left-[-84px] top-[-84px]">
          <Image src={warningIcon} alt="warningIcon" />
        </div>
        <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
          <div>
            <h1 className="text-headingS text-neutral900 font-medium">
              Are you sure?
            </h1>
            <p className="text-neutral600 text-mRegular">
              Do you want to restart KYC process
            </p>
          </div>
          <ActionButton
            actionButtonData={[
              {
                variant: 'secondary',
                label: ManageLocales('app.modal.yes'),
                handler: () => handleConfirmRestartKyc(),
                customStyle: 'flex-1 w-full h-10'
              },
              {
                variant: 'primary',
                label: ManageLocales('app.modal.no'),
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
              kycDetails?.kyc?.profile_data?.online &&
              typeof kycDetails?.kyc?.profile_data?.online['2'] === 'object' &&
              Object.keys(kycDetails?.kyc?.profile_data?.online['2']).length > 1
            ) {
              setIsResumeCalled(true);
              const { online, offline, country } = kycDetails.kyc.profile_data;

              const onlineData = online || {};

              findFirstNonFilledScreens(onlineData, country).then(
                nonFilledScreens => {
                  let firstNonFilledScreens = nonFilledScreens[0] - 1;

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
                            <h1 className="text-headingS text-neutral900 font-medium">
                              Do you want to resume KYC process or restart it?
                            </h1>
                          </div>
                          <ActionButton
                            actionButtonData={[
                              {
                                variant: 'secondary',
                                label: ManageLocales('app.modal.no'),
                                handler: () => handleResetButton(),
                                customStyle: 'flex-1 w-full h-10'
                              },
                              {
                                variant: 'primary',
                                label: ManageLocales('app.modal.yes'),
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
                }
              );
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

            sectionKeys.forEach(async (key, index: number) => {
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
                name: 'formState.offline',
                value: kycDetails?.kyc?.profile_data?.mode !== 'online'
              })
            );

            if (
              kycDetails?.kyc?.profile_data?.mode === 'online' &&
              kycDetails?.kyc?.profile_data?.country !== countries.OTHER
            ) {
              if (kycDetails?.kyc?.profile_data?.country === countries.INDIA) {
                dispatch(
                  updateFormState({
                    name: 'formState.attachment',
                    value: kycDetails?.kyc?.profile_data?.online['5']
                  })
                );

                kycDetails?.kyc?.profile_data?.online['5'] &&
                  Object.keys(kycDetails?.kyc?.profile_data?.online['5']).map(
                    key => {
                      dispatch(
                        updateFormState({
                          name: `formState.attachment[${key}].isFileUploaded`,
                          value: true
                        })
                      );
                    }
                  );
              } else {
                dispatch(
                  updateFormState({
                    name: 'formState.attachment',
                    value: kycDetails?.kyc?.profile_data?.online['4']
                  })
                );

                kycDetails?.kyc?.profile_data?.online['4'] &&
                  Object.keys(kycDetails?.kyc?.profile_data?.online['4']).map(
                    key => {
                      dispatch(
                        updateFormState({
                          name: `formState.attachment[${key}].isFileUploaded`,
                          value: true
                        })
                      );
                    }
                  );
              }
            } else {
              dispatch(
                updateFormState({
                  name: 'formState.attachment',
                  value: kycDetails?.kyc?.profile_data?.offline['2']
                })
              );

              kycDetails?.kyc?.profile_data?.offline['2'] &&
                Object.keys(kycDetails?.kyc?.profile_data?.offline['2']).map(
                  key => {
                    dispatch(
                      updateFormState({
                        name: `formState.attachment[${key}].isFileUploaded`,
                        value: true
                      })
                    );
                  }
                );
            }

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

  function areAllKeysEmpty(obj: any) {
    for (const key in obj) {
      if (obj[key] !== '') {
        return false;
      }
    }
    return true;
  }
  useEffect(() => {
    if (!formState.country) return;

    let sectionKeys: string[] =
      formState.country === 'India'
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

    sectionKeys.forEach(async (key, index: number) => {
      let validationErrors = await validateScreen(
        formState.online.sections[key],
        key,
        formState.country
      );

      const screenValidationError = formErrorState?.online?.sections[key];

      if (
        currentStepperStep > index &&
        (areAllKeysEmpty(screenValidationError) ||
          (screenValidationError && !Object.keys(screenValidationError).length))
      ) {
        completedSteps.add(index);
        rejectedSteps.delete(index);
      } else if (!validationErrors.length) {
        rejectedSteps.delete(index);
      } else if (index === currentStepperStep) {
        completedSteps.delete(index);
      } else if (validationErrors.length && currentStepperStep >= index) {
        if (Array.isArray(validationErrors)) {
          validationErrors.forEach(error => {
            dispatch(
              updateFormState({
                name: `formErrorState.online.sections.${[key]}.${[
                  error.property
                ]}`,
                value: Object.values(error.constraints ?? {})[0] || ''
              })
            );
          });
        } else {
          dispatch(
            updateFormState({
              name: `formErrorState.online.sections.${[key]}`,
              value: {}
            })
          );
        }
        completedSteps.delete(index);
        rejectedSteps.add(index);
      }

      setCompletedSteps(new Set(completedSteps));
      setRejectedSteps(new Set(rejectedSteps));
    });

    const validate = async () => {
      let validationError = await validateAttachment(
        formState.attachment,
        formState.country
      );

      const screenValidationError = formErrorState?.attachment;

      if (formState.country === countries.INDIA) {
        if (
          currentStepperStep > 4 &&
          screenValidationError &&
          !Object.keys(screenValidationError).length
        ) {
          completedSteps.add(4);
          rejectedSteps.delete(4);
        } else if (!validationError?.length) {
          rejectedSteps.delete(4);
        } else if (4 === currentStepperStep) {
          completedSteps.delete(4);
        } else if (validationError.length && currentStepperStep >= 4) {
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
          completedSteps.delete(4);
          rejectedSteps.add(4);
        }
        setCompletedSteps(new Set(completedSteps));
        setRejectedSteps(new Set(rejectedSteps));
      } else {
        if (
          currentStepperStep > 3 &&
          screenValidationError &&
          !Object.keys(screenValidationError).length
        ) {
          completedSteps.add(3);
          rejectedSteps.delete(3);
        } else if (!validationError?.length) {
          rejectedSteps.delete(3);
        } else if (3 === currentStepperStep) {
          completedSteps.delete(3);
        } else if (validationError.length && currentStepperStep >= 3) {
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
          completedSteps.delete(3);
          rejectedSteps.add(3);
        }
        setCompletedSteps(new Set(completedSteps));
        setRejectedSteps(new Set(rejectedSteps));
      }
    };

    const validateOffline = async () => {
      let validationError = await validateAttachment(
        formState.attachment,
        formState.country
      );

      const screenValidationError = formErrorState?.attachment;

      if (
        currentStepperStep > 1 &&
        screenValidationError &&
        !Object.keys(screenValidationError).length
      ) {
        completedSteps.add(1);
        rejectedSteps.delete(1);
      } else if (!validationError?.length) {
        rejectedSteps.delete(1);
      } else if (1 === currentStepperStep) {
        completedSteps.delete(1);
      } else if (validationError.length && currentStepperStep >= 1) {
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
        completedSteps.delete(1);
        rejectedSteps.add(1);
      }
      setCompletedSteps(new Set(completedSteps));
      setRejectedSteps(new Set(rejectedSteps));
    };

    if (formState.offline) {
      validateOffline();
    } else {
      validate();
    }
  }, [formState, currentStepperStep]);

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
    currentState,
    emailVerified = false
  }: {
    screenName: string;
    currentState: number;
    emailVerified?: boolean;
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

    if (validationError?.length) {
      rejectedSteps.add(currentState);
      setRejectedSteps(new Set(rejectedSteps));
      return;
    }

    // Make the API call to submit the form data
    let updatedCompanyDetails: any;
    if (screenName === kycScreenIdentifierNames.COMPANY_DETAILS) {
      const companyDetails =
        formState?.online?.sections?.[kycScreenIdentifierNames.COMPANY_DETAILS];
      if (companyDetails) {
        updatedCompanyDetails = {
          ...companyDetails,
          business_type: processTypeData(companyDetails.business_type),
          industry_type: processTypeData(companyDetails.industry_type)
        };

        dispatch(
          updateFormState({
            name: `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}]`,
            value: updatedCompanyDetails
          })
        );
      }
    }

    function processTypeData(typeData: any[] | undefined) {
      if (!typeData || typeData.length === 0) {
        return undefined;
      }

      return typeData.map((item: any) => {
        if (Array.isArray(item)) {
          return item[1] ?? item[0];
        }
        return item;
      });
    }

    await kyc({
      data: {
        country: formState.country,
        offline: formState.offline,
        data:
          screenName === kycScreenIdentifierNames.COMPANY_DETAILS
            ? updatedCompanyDetails
            : { ...formState.online.sections[screenName] }
      },
      ID: currentState + 1
    })
      .then((response: any) => {
        if (
          (response?.data?.statusCode === statusCode.SUCCESS ||
            response?.data?.statusCode === statusCode.NO_CONTENT) &&
          !validationError.length
        ) {
          // Step was successfully completed, move to the next step

          completedSteps.add(currentState);
          setCompletedSteps(new Set(completedSteps));
          rejectedSteps.delete(currentState);
          setRejectedSteps(new Set(rejectedSteps));

          if (
            screenName === kycScreenIdentifierNames.PERSONAL_DETAILS &&
            emailVerified
          ) {
            goToNextStep();
            return;
          }

          screenName === kycScreenIdentifierNames.PERSONAL_DETAILS &&
          !formState.isEmailVerified
            ? (setIsInputDialogOpen(true),
              setToken((prev: any) => ({
                ...prev,
                token: response?.data?.data?.token ?? ''
              })))
            : {};
          formState.isEmailVerified && goToNextStep();
          if (
            screenName === kycScreenIdentifierNames.COMPANY_DETAILS &&
            formState.country === 'India' &&
            updatedCompanyDetails.organisation_type.length
          ) {
            if (
              updatedCompanyDetails.organisation_type.length &&
              updatedCompanyDetails.organisation_type.includes('Individual')
            ) {
              dispatch(
                updateFormState({
                  name: `formState.online.sections[${[
                    kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                  ]}][owner_pan_or_aadhaar_number]`,
                  value: updatedCompanyDetails.company_pan_number
                })
              );
            } else {
              dispatch(
                updateFormState({
                  name: `formState.online.sections[${[
                    kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                  ]}][owner_pan_or_aadhaar_number]`,
                  value: ''
                })
              );
            }
          }
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
    setIsLoading(true);
    setIsDialogOpen(false);
    await submitKYC({
      country: selectedCountry,
      offline:
        formState.country === countries.OTHER ||
        selectedSubmissionOption === 'offline'
          ? true
          : false
    })
      .unwrap()
      .then(() => {
        completedSteps.add(currentStepperStep);
        setCompletedSteps(new Set(completedSteps));
        setIsLoading(false);
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
                <h1 className="text-headingS text-neutral900">
                  Your KYC has been submitted for approval
                </h1>
              </div>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.modal.browseWebsite'),
                    handler: () => router.push('/v2'),
                    customStyle: 'w-full flex-1'
                  }
                ]}
              />
            </div>
          </>
        );
      })
      .catch(e => {
        setIsLoading(false);
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
      formState.country === countries.OTHER ||
      selectedSubmissionOption === 'offline'
    ) {
      manualValidationError = await validateManualAttachment(
        formState.attachment
      );
      if (
        Array.isArray(manualValidationError) &&
        manualValidationError.length
      ) {
        rejectedSteps.add(1);
        setRejectedSteps(new Set(rejectedSteps));
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

    if (Array.isArray(validationError) && validationError.length) {
      if (selectedCountry === 'India') {
        rejectedSteps.add(4);
      } else if (selectedCountry === 'Belgium' || selectedCountry === 'USA') {
        rejectedSteps.add(3);
      }
      setRejectedSteps(new Set(rejectedSteps));

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
      !manualValidationError?.length
    ) {
      if (!formState.termAndCondition) {
        if (
          formState.country === countries.OTHER ||
          selectedSubmissionOption === 'offline'
        ) {
          rejectedSteps.add(1);
          setRejectedSteps(new Set(rejectedSteps));
        }
        if (selectedCountry === 'India') {
          rejectedSteps.add(4);
        } else if (selectedCountry === 'Belgium' || selectedCountry === 'USA') {
          rejectedSteps.add(3);
        }
        setRejectedSteps(new Set(rejectedSteps));
        dispatch(
          updateFormState({
            name: `formErrorState.termAndCondition`,
            value: true
          })
        );
      } else {
        setIsDialogOpen(true);
        setDialogContent(
          <div className="h-[200px]">
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={confirmIcon} alt="confirmIcon" />
            </div>
            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
              <div>
                <h1 className="text-headingS text-neutral900">Confirmation</h1>
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
                  },
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.submit'),
                    handler: () => {
                      kycSubmitted();
                    },
                    customStyle: 'w-full flex-1'
                  }
                ]}
              />
            </div>
          </div>
        );
      }
    }
  };

  const steps = [
    {
      name: 'Personal Details',
      identifier: kycScreenIdentifierNames.PERSONAL_DETAILS
    },
    {
      name: 'Company Details',
      identifier: kycScreenIdentifierNames.COMPANY_DETAILS
    },
    {
      name: 'Owner Details',
      identifier: kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
    },
    {
      name: 'Banking Details',
      identifier: kycScreenIdentifierNames.BANKING_DETAILS
    },
    { name: 'Attachment', identifier: kycScreenIdentifierNames.ATTACHMENT }
  ];

  const filteredSteps = steps.filter(
    step =>
      step.identifier !== kycScreenIdentifierNames.COMPANY_OWNER_DETAILS ||
      selectedCountry === countries.INDIA
  );

  function goToNextStep() {
    // Find the index of the current step, ignoring case
    let currentIndex = filteredSteps.findIndex(
      (_step, index) => index === currentStepperStep
    );

    // If currentStep is found and it is not the last element in the array
    if (currentIndex !== -1 && currentIndex < steps.length - 1) {
      // Set currentStep to the next element in the array

      setCurrentStepperStep(currentIndex + 1);
    } else {
      console.log('You are on the last step or current step was not found.');
    }
  }

  const renderStepperComponent = (state: string) => {
    switch (state) {
      case kycScreenIdentifierNames.COMPANY_OWNER_DETAILS:
        return (
          <CompanyOwnerDetail
            formErrorState={formErrorState}
            formState={formState}
            dispatch={dispatch}
            currentStepperStep={currentStepperStep}
          />
        );
      case kycScreenIdentifierNames.BANKING_DETAILS:
        return (
          <BankingDetails
            formErrorState={formErrorState}
            formState={formState}
            dispatch={dispatch}
            country={formState.country}
            currentStepperStep={currentStepperStep}
          />
        );
      case kycScreenIdentifierNames.PERSONAL_DETAILS:
        return (
          <PersonalDetail
            formErrorState={formErrorState}
            formState={formState}
            dispatch={dispatch}
            currentStepperStep={currentStepperStep}
          />
        );
      case kycScreenIdentifierNames.COMPANY_DETAILS:
        return (
          <CompanyDetail
            formErrorState={formErrorState}
            formState={formState}
            dispatch={dispatch}
            country={formState.country}
            currentStepperStep={currentStepperStep}
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
            country={formState.country}
            handleTermAndCondition={handleTermAndCondition}
            currentStepperStep={currentStepperStep}
          />
        );
    }
  };
  const manualSteps = [
    {
      name: 'Personal Details',
      identifier: kycScreenIdentifierNames.PERSONAL_DETAILS
    },
    {
      name: 'Download And Upload Hub',
      identifier: kycScreenIdentifierNames.ATTACHMENT
    }
  ];
  const renderStepperComponentForOffline = (state: string) => {
    switch (state) {
      case kycScreenIdentifierNames.PERSONAL_DETAILS:
        return (
          <PersonalDetail
            formErrorState={formErrorState}
            formState={formState}
            dispatch={dispatch}
            currentStepperStep={currentStepperStep}
          />
        );
      case kycScreenIdentifierNames.ATTACHMENT:
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
          />
        );
    }
  };

  const renderContent = () => {
    if (currentState === kycStatus.PENDING) {
      return <KycStatusScreen status={kycStatus.PENDING} />;
    } else if (currentState === kycStatus.APPROVED) {
      return <KycStatusScreen status={kycStatus.APPROVED} />;
    } else if (currentState === kycStatus.REJECTED) {
      return <KycStatusScreen status={kycStatus.REJECTED} />;
    } else if (currentState === 'country_selection') {
      return (
        <CountrySelection
          handleCountrySelection={handleCountrySelection}
          selectedCountry={selectedCountry}
        />
      );
    } else if (currentState === 'submission_option') {
      return (
        <SubmissionOption
          handleSubmissionOptionClick={handleSubmissionOptionClick}
          selectedSubmissionOption={selectedSubmissionOption}
          handleBack={handleBack}
        />
      );
    } else if (currentState === 'online') {
      return (
        <StepperComponent
          currentStepperStep={currentStepperStep}
          setCurrentStepperStep={setCurrentStepperStep}
          completedSteps={completedSteps}
          rejectedSteps={rejectedSteps}
          renderStepperComponent={renderStepperComponent}
          handleStepperNext={handleStepperNext}
          handleStepperBack={handleStepperBack}
          isEmailVerified={formState.isEmailVerified}
          handleSubmit={handleSubmit}
          filteredSteps={filteredSteps}
          country={formState.country}
        />
      );
    } else if (currentState === countries.OTHER || currentState === 'offline') {
      return (
        <StepperComponent
          currentStepperStep={currentStepperStep}
          setCurrentStepperStep={setCurrentStepperStep}
          completedSteps={completedSteps}
          rejectedSteps={rejectedSteps}
          renderStepperComponent={renderStepperComponentForOffline}
          handleStepperNext={handleStepperNext}
          handleStepperBack={handleStepperBack}
          isEmailVerified={formState.isEmailVerified}
          handleSubmit={handleSubmit}
          filteredSteps={manualSteps}
          fromWhere={currentState}
          handleBack={handleBack}
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
                      }
                    })
                    .catch((e: any) => {
                      setIsDialogOpen(true);
                      setDialogContent(
                        <CommonPoppup
                          content=""
                          header={e?.data?.message}
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
                        dispatch(
                          updateFormState({
                            name: 'formState.isEmailVerified',
                            value: true
                          })
                        );
                        setIsInputDialogOpen(false);
                        setIsDialogOpen(true);
                        setDialogContent(
                          <>
                            <div className="absolute left-[-84px] top-[-84px]">
                              <Image src={confirmIcon} alt="confirmIcon" />
                            </div>
                            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                              <h1 className="text-headingS text-neutral900 font-medium">
                                Your email has been verified successfully
                              </h1>
                              <ActionButton
                                actionButtonData={[
                                  {
                                    variant: 'primary',
                                    label: 'Next',
                                    handler: () => {
                                      handleStepperNext({
                                        screenName:
                                          filteredSteps[currentStepperStep]
                                            ?.identifier,
                                        currentState: currentStepperStep,
                                        emailVerified: true
                                      });
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
                    .catch((e: any) => {
                      setIsDialogOpen(true);
                      setDialogContent(
                        <CommonPoppup
                          content=""
                          header={e?.data?.message}
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
    <div className="relative">
      {' '}
      {isLoading && <CustomKGKLoader />}
      <DialogComponent dialogContent={dialogContent} isOpens={isDialogOpen} />
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
