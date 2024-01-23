'use client';
import React, { useEffect, useState } from 'react';
import { KYCForm } from '@/constants/kyc';
import { StepperStatus } from '@/constants/enums/stepper-status';
import Stepper, { IStepper } from '@/components/common/stepper';
import RenderCountrySelection from './render-country-selection';
import { useErrorStateManagement } from '@/hooks/error-state-management';
import RenderOffline from './render-offline';
import { useSelector } from 'react-redux';
import { RenderOnlineForm } from './render-online';
import RenderKYCModeSelection from './render-kyc-mode-selection';
import { useAppDispatch } from '@/hooks/hook';
import FileAttachments from '@/components/common/file-attachment';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import Image from 'next/image';
import confirmImage from '@public/assets/icons/confirmation.svg';
import HandIcon from '@public/assets/icons/noto_backhand-index-pointing-up.svg';
import {
  useKycMutation,
  useSubmitKYCMutation,
  useResetKycMutation,
  useLazyGetKycDetailQuery
} from '@/features/api/kyc';
import { updateFormState } from '@/features/kyc/kyc';
import { ValidationError } from 'class-validator';
import {
  validateAttachment,
  validateManualAttachment,
  validateScreen
} from './helper/validations/screen/screen';
import { Checkbox } from '@/components/ui/checkbox';
import {
  kycScreenIdentifierNames,
  kycStatus,
  kycStatusContent
} from '@/constants/enums/kyc';
import { statusCode } from '@/constants/enums/status-code';
import logger from 'logging/log-util';
import ErrorModel from '@/components/common/error-model';
import KycStatus from './components/kyc-status';
import { useLazyGetAuthDataQuery } from '@/features/api/login';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { ManageLocales } from '@/utils/translate';
import { useRouter } from 'next/navigation';
import { isEditingKYC } from '@/features/kyc/is-editing-kyc';
import Loader from '@/components/v2/common/loader';

// interface IKYCData {
//   kyc: {
//     created_at: string;
//     customer_id: string;
//     deleted_at: string | null;
//     updated_at: string;
//     id: string;
//     profile_data: {
//       online: {
//         [key: string]: {
//           [key: string]: any;
//         };
//       };
//       country: string | null;
//       offline: {
//         [key: string]: any;
//       };
//     };
//     remarks: string | null;
//     status: string;
//   };
// }

const KYC: React.FC = () => {
  const { errorState, errorSetState } = useErrorStateManagement();
  const router = useRouter();
  const [kyc] = useKycMutation();
  const [submitKYC, { isLoading: isSubmitKycLoading }] = useSubmitKYCMutation();
  const [triggerKycDetail] = useLazyGetKycDetailQuery({});

  const [selectedCountry, setSelectedCountry] = useState<any>('');
  const [isResumeCalled, setIsResumeCalled] = useState<boolean>(false);

  const [selectedKYCOption, setSelectedKYCOption] = useState('');
  const [currentState, setCurrentState] = useState('');
  const [data, setData] = useState<any>({});
  const [activeStep, setActiveStep] = useState(0);
  const [stepperData, setStepperData] = useState<IStepper[]>([]);

  const { modalState, modalSetState } = useModalStateManagement();
  const { dialogContent, isDialogOpen } = modalState;

  const { setIsDialogOpen, setDialogContent } = modalSetState;
  const { formState, formErrorState } = useSelector((state: any) => state.kyc);

  const dispatch = useAppDispatch();
  const [triggerAuth] = useLazyGetAuthDataQuery();
  const [resetKyc] = useResetKycMutation();

  const buildFormData = () => {
    const formData = new FormData();

    if (formState.country === 'Other' || selectedKYCOption === 'offline') {
      formState.attachment?.upload_form?.selectedFile.forEach((file: any) => {
        formData.append('upload_form', file);
      });
    }
    formData.append('country', formState.country);
    formData.append(
      'offline',
      `${
        formState.country === 'Other' || selectedKYCOption === 'offline'
          ? 'true'
          : 'false'
      }`
    );

    let uploadData = formState.attachment;
    for (const key in uploadData) {
      const fileData = uploadData[key];

      // Check if the file is uploaded
      if (fileData.isFileUploaded && fileData.selectedFile.length > 0) {
        // Append each selected file to the FormData with a key like 'pan_0', 'gst_certificate_0', etc.
        fileData.selectedFile.forEach((file: any) => {
          formData.append(key, file);
        });
      }
    }

    return formData;
  };

  const handleNextStep = async (
    screenName: string,
    activeID: number,
    saveStep = true
  ) => {
    let active = activeID + 1;
    let validationError: ValidationError[] | string;
    let stepSuccessStatus;

    validationError = await validateScreen(
      formState.online.sections[screenName],
      screenName,
      formState.country
    );

    if (Array.isArray(validationError)) {
      validationError.forEach(error => {
        dispatch(
          updateFormState({
            name: `formErrorState.online.sections.${[screenName]}.${[
              error.property
            ]}`,
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

    saveStep &&
      !validationError.length &&
      (await kyc({
        data: {
          country: formState.country,
          offline: false,
          data: {
            ...formState.online.sections[screenName]
          }
        },
        ID: active
      })
        .then((_res: any) => {
          _res?.data?.statusCode
            ? (stepSuccessStatus = _res.data.statusCode)
            : setIsDialogOpen(true);
          setDialogContent(
            <ErrorModel
              content={_res?.error?.data?.message}
              handleClick={() => setIsDialogOpen(false)}
            />
          );
        })
        .catch((_e: any) => {
          logger.error(`something went wrong while submitting kyc ${_e}`);
        }));

    !validationError.length &&
      stepSuccessStatus === statusCode.NO_CONTENT &&
      setActiveStep(prevStep => prevStep + 1);
    let stepperFinalStatus = {
      validationError: validationError,
      statusCode: stepSuccessStatus
    };
    stepSuccessStatus = 0;
    return stepperFinalStatus;
  };

  const kycSubmitted = async () => {
    setIsDialogOpen(false);
    await submitKYC(buildFormData())
      .unwrap()
      .then(() => {
        const authToken = JSON.parse(localStorage.getItem('auth')!);

        triggerAuth(authToken).then(res => {
          localStorage.setItem('user', JSON.stringify(res?.data));
        });
        dispatch(isEditingKYC(false));
        setIsDialogOpen(true);
        setDialogContent(
          <div className="flex gap-[10px] flex-col items-center justify-center">
            <div className="flex">
              <Image src={confirmImage} alt="Error Image" />
            </div>
            <div className="text-[16px] text-solitaireTertiary">
              <p>Your KYC has been submitted for approval</p>
            </div>
            <CustomDisplayButton
              displayButtonLabel={ManageLocales('app.myaccount.kyc.browseApp')}
              handleClick={() => router.push('/')}
              displayButtonAllStyle={{
                displayButtonStyle:
                  'bg-solitaireQuaternary w-[150px] h-[35px] text-solitaireTertiary text-[14px] flex justify-center item-center'
              }}
            />
          </div>
        );
      })
      .catch(e => {
        setIsDialogOpen(true);
        setDialogContent(
          <ErrorModel
            content={e?.data?.message}
            handleClick={() => setIsDialogOpen(false)}
          />
        );
      });
  };

  const handleSubmit = async () => {
    let manualValidationError: any = [];
    let onlineValidator: any = [];
    if (formState.country === 'Other' || selectedKYCOption === 'offline') {
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
      selectedCountry.value
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
            <div className="text-center align-middle text-solitaireTertiary text-[20px] font-semibold">
              Are you sure?
            </div>
            <div className="text-center align-middle text-solitaireTertiary text-[16px]">
              Please review all the information you have entered before
              submitting the form!
            </div>
            <div className=" flex justify-around align-middle text-solitaireTertiary gap-[25px] ">
              <CustomDisplayButton
                displayButtonLabel="No"
                handleClick={() => {
                  setIsDialogOpen(false);
                  setDialogContent('');
                }}
                displayButtonAllStyle={{
                  displayButtonStyle:
                    ' bg-transparent   border-[1px] border-solitaireQuaternary  w-[150px] h-[35px]',
                  displayLabelStyle:
                    'text-solitaireTertiary text-[14px] font-medium'
                }}
              />
              <CustomDisplayButton
                displayButtonLabel="Yes"
                handleClick={kycSubmitted}
                displayButtonAllStyle={{
                  displayButtonStyle:
                    'bg-solitaireQuaternary w-[150px] h-[35px]',
                  displayLabelStyle:
                    'text-solitaireTertiary text-[14px] font-medium'
                }}
              />
            </div>
          </>
        );
      }
    }
  };

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

  const handlePrevStep = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const getStatus = async (screen: any, index: number) => {
    let validationErrors = await validateScreen(
      formState.online.sections[screen.screenName],
      screen.screenName,
      formState.country
    );

    const screenValidationError =
      formErrorState?.online?.sections[screen.screenName];

    if (index === activeStep) {
      return StepperStatus.INPROGRESS;
    } else if (!validationErrors.length) {
      return StepperStatus.COMPLETED;
    } else if (
      activeStep < index &&
      screenValidationError &&
      !Object.keys(screenValidationError).length
    ) {
      return StepperStatus.NOT_STARTED;
    } else if (validationErrors.length) {
      if (Array.isArray(validationErrors)) {
        validationErrors.forEach(error => {
          dispatch(
            updateFormState({
              name: `formErrorState.online.sections.${[screen.screenName]}.${[
                error.property
              ]}`,
              value: Object.values(error.constraints ?? {})[0] || ''
            })
          );
        });
      } else {
        dispatch(
          updateFormState({
            name: `formErrorState.online.sections.${[screen.screenName]}`,
            value: {}
          })
        );
      }
      return StepperStatus.REJECTED;
    }
  };

  const initializeStepperData = async () => {
    let tempStepperData = [];

    if (data?.online) {
      const promises = data.online.map(async (screen: any, index: number) => ({
        label: `${screen.screen}`,
        data: (
          <RenderOnlineForm
            screen={screen}
            formState={formState}
            formErrorState={formErrorState}
          />
        ),
        screenName: `${screen.screenName}`,
        status: await getStatus(screen, index)
      }));

      tempStepperData = await Promise.all(promises);
    }

    // Handle the Attachment step
    const attachmentStep = {
      label: 'Attachment',
      data: (
        <>
          <div className="flex items-center mt-[30px] mb-[30px] ">
            <Image src={HandIcon} alt="Backhand image" />
            <h3 className="ml-[10px] text-[18px] text-solitaireTertiary">
              Attachments
            </h3>
          </div>
          <div className="pb-5 max-h-[800px] border-b border-solitaireSenary  flex flex-wrap flex-col gap-[20px] content-between">
            {data?.attachment &&
              data.attachment.map((attch: any) => {
                return attch.key && Object?.keys(attch.key).length ? (
                  <div key={attch.key} className="w-[45%]">
                    <h1 className="text-solitaireTertiary py-3 capitalize ">
                      {attch.key}
                    </h1>
                    <div className="flex flex-col gap-[20px]">
                      {attch.value.map(
                        ({
                          id,
                          label,
                          isRequired,
                          formKey,
                          maxFile,
                          minFile
                        }: any) => (
                          <FileAttachments
                            key={id}
                            lable={label}
                            formKey={formKey}
                            isRequired={isRequired}
                            formErrorState={formErrorState}
                            formState={formState}
                            modalSetState={modalSetState}
                            modalState={modalState}
                            maxFile={maxFile}
                            minFile={minFile}
                          />
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <div key={attch.id} className=" w-[45%]">
                    <FileAttachments
                      key={attch.id}
                      lable={attch.label}
                      formKey={attch.formKey}
                      isRequired={attch.isRequired}
                      formErrorState={formErrorState}
                      formState={formState}
                      modalSetState={modalSetState}
                      modalState={modalState}
                      maxFile={attch.maxFile}
                      minFile={attch.minFile}
                    />
                  </div>
                );
              })}
          </div>
          <hr className="w-[50%]" />
          <div className="flex py-6 items-center justify-center">
            <div className="pr-3 flex items-center">
              <Checkbox
                onClick={() =>
                  handleTermAndCondition(!formState.termAndCondition)
                }
                checked={formState.termAndCondition}
                className={
                  formErrorState.termAndCondition
                    ? '!border-solitaireError'
                    : ''
                }
              />
            </div>
            <div
              className={`flex gap-1 ${
                formErrorState.termAndCondition
                  ? 'text-solitaireError'
                  : 'text-solitaireTertiary'
              }`}
            >
              <p
                className="cursor-pointer"
                onClick={() =>
                  handleTermAndCondition(!formState.termAndCondition)
                }
              >
                I hereby agree to
              </p>
              <a
                href="https://kgk.live/terms-condition"
                className={`border-b ${
                  formErrorState.termAndCondition
                    ? 'border-solitaireError '
                    : 'border-solitaireSenary'
                } `}
                target="_blank"
              >
                terms and conditions
              </a>
            </div>
          </div>
        </>
      ),
      status:
        tempStepperData.length === activeStep
          ? StepperStatus.INPROGRESS
          : StepperStatus.NOT_STARTED,
      screenName: 'attachment'
    };

    tempStepperData.push(attachmentStep);
    setStepperData(tempStepperData);
  };

  useEffect(() => {
    if (selectedKYCOption === 'online') {
      initializeStepperData();
    }
  }, [data, formState, formErrorState, activeStep, selectedKYCOption]);

  const handleConfirmRestartKyc = () => {
    resetKyc({})
      .then((res: any) => {
        if (res.data.statusCode === statusCode.SUCCESS) {
          setCurrentState('country_selection');
          setSelectedCountry('');
          setSelectedKYCOption('');
          setActiveStep(0);
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
    setDialogContent(
      <>
        <div className="text-center align-middle text-solitaireTertiary text-[20px] font-semibold">
          Are you sure?
        </div>
        <div className="text-center align-middle text-solitaireTertiary text-[16px]">
          Do you want to restart KYC process
        </div>
        <div className=" flex justify-around align-middle text-solitaireTertiary gap-[25px] ">
          <CustomDisplayButton
            displayButtonLabel="No"
            handleClick={() => {
              setIsDialogOpen(false);
              setDialogContent('');
            }}
            displayButtonAllStyle={{
              displayButtonStyle:
                ' bg-transparent   border-[1px] border-solitaireQuaternary  w-[150px] h-[35px]',
              displayLabelStyle:
                'text-solitaireTertiary text-[14px] font-medium'
            }}
          />
          <CustomDisplayButton
            displayButtonLabel="Yes"
            handleClick={handleConfirmRestartKyc}
            displayButtonAllStyle={{
              displayButtonStyle: 'bg-solitaireQuaternary w-[150px] h-[35px]',
              displayLabelStyle:
                'text-solitaireTertiary text-[14px] font-medium'
            }}
          />
        </div>
      </>
    );
  };

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
                setActiveStep(firstNonFilledScreens);

                offline
                  ? setSelectedKYCOption('online')
                  : setSelectedKYCOption('offline');

                setIsDialogOpen(true);
                setDialogContent(
                  <>
                    <div className="text-center align-middle text-solitaireTertiary">
                      <p className="text-[20px] font-semibold">Are you sure?</p>
                    </div>
                    <div className="text-center align-middle text-solitaireTertiary text-[16px] px-[20px]">
                      Do you want to resume KYC process or restart it?
                    </div>
                    <div className=" flex justify-around align-middle text-solitaireTertiary gap-[25px] ">
                      <CustomDisplayButton
                        displayButtonLabel="Restart"
                        handleClick={handleResetButton}
                        displayButtonAllStyle={{
                          displayButtonStyle:
                            ' bg-transparent   border-[1px] border-solitaireQuaternary  w-[150px] h-[35px]',
                          displayLabelStyle:
                            'text-solitaireTertiary text-[14px] font-medium'
                        }}
                      />
                      <CustomDisplayButton
                        displayButtonLabel="Resume"
                        handleClick={() => {
                          setIsDialogOpen(false);
                          setDialogContent('');
                        }}
                        displayButtonAllStyle={{
                          displayButtonStyle:
                            'bg-solitaireQuaternary w-[150px] h-[35px]',
                          displayLabelStyle:
                            'text-solitaireTertiary text-[14px] font-medium'
                        }}
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
                ? {
                    label: kycDetails?.kyc?.profile_data?.country,
                    value: kycDetails?.kyc?.profile_data?.country
                  }
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

  useEffect(() => {
    let kycData = KYCForm.filter(country => {
      return country.country.backend === formState.country;
    });
    setData(kycData[0]);
  }, [currentState]);

  const handleSaveAndNext = (state: string) => {
    setCurrentState(state);
  };

  const renderContent = () => {
    switch (currentState) {
      case 'country_selection':
        return (
          <RenderCountrySelection
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            handleSaveAndNext={handleSaveAndNext}
            errorSetState={errorSetState}
            errorState={errorState}
          />
        );

      case kycStatus.PENDING:
        return (
          <KycStatus
            status={kycStatus.PENDING}
            content={kycStatusContent.PENDING}
          />
        );
      case kycStatus.APPROVED:
        return (
          <KycStatus
            status={kycStatus.APPROVED}
            content={kycStatusContent.APPROVED}
            linkHref="/"
            linkLabel={ManageLocales('app.myaccount.kyc.exploreWebsite')}
          />
        );
      case kycStatus.REJECTED:
        return (
          <KycStatus
            status={kycStatus.REJECTED}
            content={kycStatusContent.REJECTED}
            linkHref="/my-account/summary"
            linkLabel={ManageLocales('app.myaccount.kyc.keyAccountManager')}
          />
        );

      case 'choice_for_filling_kyc':
        // Render the component for 'choice_for_filling_kyc'
        return (
          <RenderKYCModeSelection
            handleSaveAndNext={handleSaveAndNext}
            setSelectedKYCOption={setSelectedKYCOption}
            selectedKYCOption={selectedKYCOption}
            errorSetState={errorSetState}
            errorState={errorState}
          />
        );
      case 'other':
      case 'offline':
        return (
          <RenderOffline
            data={data}
            fromWhere={currentState}
            selectedCountry={selectedCountry.value}
            formErrorState={formErrorState}
            formState={formState}
            modalSetState={modalSetState}
            modalState={modalState}
            handleSaveAndNext={handleSaveAndNext}
            handleSubmit={handleSubmit}
            setIsDialogOpen={setIsDialogOpen}
            isDialogOpen={isDialogOpen}
            dialogContent={dialogContent}
            handleTermAndCondition={handleTermAndCondition}
          />
        );
      // Add more cases as needed
      case 'online':
        return (
          <Stepper
            stepper={stepperData}
            state={activeStep}
            setState={setActiveStep}
            prevStep={handlePrevStep}
            nextStep={handleNextStep}
            setIsDialogOpen={setIsDialogOpen}
            isDialogOpen={isDialogOpen}
            dialogContent={dialogContent}
            handleSubmit={handleSubmit}
            setStepperData={setStepperData}
          />
        );

      default:
        // Render a default component or handle the default case
        return;
    }
  };

  return (
    <>
      {isSubmitKycLoading && <Loader />}
      {renderContent()}
    </>
  );
};

export default KYC;
