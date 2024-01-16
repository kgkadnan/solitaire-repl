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
import errorImage from '@public/assets/icons/error.svg';
import confirmImage from '@public/assets/icons/confirmation.svg';
import HandIcon from '@public/assets/icons/noto_backhand-index-pointing-up.svg';
import {
  useKycMutation,
  useGetKycDetailQuery,
  useSubmitKYCMutation,
  useResetKycMutation
} from '@/features/api/kyc';
import { updateFormState } from '@/features/kyc/kyc';
import { ValidationError } from 'class-validator';
import {
  validateAttachment,
  validateManualAttachment,
  validateScreen
} from './helper/validations/screen/screen';
import { Checkbox } from '@/components/ui/checkbox';
import { kycScreenIdentifierNames, kycStatus } from '@/constants/enums/kyc';
import { statusCode } from '@/constants/enums/status-code';
import logger from 'logging/log-util';
import ErrorModel from '@/components/common/error-model';
import KycStatus from './components/kyc-status';
import { useGetAuthDataQuery } from '@/features/api/login';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { IAuthDataResponse } from '@/app/login/interface';
import { ManageLocales } from '@/utils/translate';
import { useRouter } from 'next/navigation';

interface IKYCData {
  kyc: {
    created_at: string;
    customer_id: string;
    deleted_at: string | null;
    updated_at: string;
    id: string;
    profile_data: {
      online: {
        [key: string]: {
          [key: string]: any;
        };
      };
      country: string | null;
      offline: {
        [key: string]: any;
      };
    };
    remarks: string | null;
    status: string;
  };
}

const KYC: React.FC = () => {
  const { errorState, errorSetState } = useErrorStateManagement();
  const router = useRouter();
  const [kyc] = useKycMutation();
  const [submitKYC] = useSubmitKYCMutation();
  const { data: kycDetails }: { data?: IKYCData } = useGetKycDetailQuery({});

  const [selectedCountry, setSelectedCountry] = useState<any>('');
  const [isResumeCalled, setIsResumeCalled] = useState<boolean>(false);

  const [userData, setUserData] = useState<any>({});
  const [token, setToken] = useState<string>('');
  const [selectedKYCOption, setSelectedKYCOption] = useState('');
  const [currentState, setCurrentState] = useState('country_selection');
  const [data, setData] = useState<any>({});
  const [activeStep, setActiveStep] = useState(0);

  const { modalState, modalSetState } = useModalStateManagement();
  const { dialogContent, isDialogOpen } = modalState;

  const { setIsDialogOpen, setDialogContent } = modalSetState;
  const { formState, formErrorState } = useSelector((state: any) => state.kyc);

  const [renderComponent, setRenderComponent] = useState('');
  const dispatch = useAppDispatch();

  const { data: authData }: { data?: IAuthDataResponse } = useGetAuthDataQuery(
    token,
    { skip: !token }
  );

  const [resetKyc] = useResetKycMutation();

  useEffect(() => {
    const storedToken = localStorage.getItem('auth');

    if (storedToken) setToken(JSON.parse(storedToken));
    setUserData(authData);
  }, [authData]);

  const buildFormData = () => {
    const formData = new FormData();

    if (formState.country === 'Other' || selectedKYCOption === 'offline') {
      formState.offline?.upload_form?.selectedFile.forEach((file: any) => {
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
          <div className="w-full flex flex-col gap-4 items-center">
            {' '}
            <div className=" flex justify-center align-middle items-center">
              <Image src={errorImage} alt="errorImage" />
              <p>Error!</p>
            </div>
            <div className="text-center text-solitaireTertiary h-[4vh]">
              {e.data.message}
            </div>
            <CustomDisplayButton
              displayButtonLabel={ManageLocales('app.myaccount.kyc.okay')}
              displayButtonAllStyle={{
                displayButtonStyle: 'bg-solitaireQuaternary w-[150px] h-[36px]',
                displayLabelStyle:
                  'text-solitaireTertiary text-[16px] font-medium'
              }}
              handleClick={() => setIsDialogOpen(false)}
            />
          </div>
        );
      });
  };

  const handleSubmit = async () => {
    let manualValidationError: any = [];
    let onlineValidator: any = [];
    if (formState.country === 'Other' || selectedKYCOption === 'offline') {
      manualValidationError = await validateManualAttachment(formState.offline);
      if (Array.isArray(manualValidationError)) {
        manualValidationError.forEach(error => {
          dispatch(
            updateFormState({
              name: `formErrorState.offline.${[error.property]}`,
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
    console.log('onlineValidatord', onlineValidator);

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

  let stepperData: IStepper[] = data?.online
    ? data.online.map((screen: any, index: number) => ({
        label: `${screen.screen}`,
        data: (
          <RenderOnlineForm
            screen={screen}
            formState={formState}
            formErrorState={formErrorState}
          />
        ),
        screenName: `${screen.screenName}`,

        status:
          index === activeStep
            ? StepperStatus.INPROGRESS
            : StepperStatus.NOT_STARTED
      }))
    : [];

  stepperData.push({
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
                formErrorState.termAndCondition ? '!border-solitaireError' : ''
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
            <p>I hereby agree to</p>
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
      stepperData.length === activeStep
        ? StepperStatus.INPROGRESS
        : StepperStatus.NOT_STARTED,
    screenName: 'attachment'
  });

  const handleConfirmRestartKyc = () => {
    resetKyc({})
      .then((res: any) => {
        if (res.data.statusCode === statusCode.SUCCESS) {
          setCurrentState('country_selection');
          setSelectedCountry('');
          setSelectedKYCOption('');
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
                bank_details: {}
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
                bank_details: {}
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

  useEffect(() => {
    if (kycDetails) {
      userData && localStorage.setItem('user', JSON.stringify(userData));
      switch (userData?.customer?.kyc?.status) {
        case kycStatus.INPROGRESS:
          if (
            kycDetails &&
            kycDetails?.kyc &&
            !isResumeCalled &&
            (kycDetails?.kyc?.profile_data?.country !== null ||
              Object.keys(kycDetails?.kyc?.profile_data?.online).length > 1) &&
            Object?.keys(kycDetails?.kyc?.profile_data?.offline).length === 0
          ) {
            setIsResumeCalled(true);
            const { online, offline } = kycDetails.kyc.profile_data;

            const onlineData = online || {};

            const filledScreens = Object.keys(onlineData)
              .map(key => parseInt(key, 10))
              .filter(num => !isNaN(num));

            const lastFilledScreen = Math.max(...filledScreens);

            if (lastFilledScreen > 0) {
              setCurrentState('online');
              setActiveStep(lastFilledScreen - 1);

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
          setRenderComponent(kycStatus.PENDING);
          break;

        case kycStatus.APPROVED:
          setRenderComponent(kycStatus.APPROVED);
          break;
        case kycStatus.REJECTED:
          setRenderComponent(kycStatus.REJECTED);
          break;
      }
    }
  }, [kycDetails, userData]);

  useEffect(() => {
    let kycData = KYCForm.filter(country => {
      return country.country.backend === formState.country;
    });
    setData(kycData[0]);
  }, [currentState]);

  const handleSaveAndNext = (state: string) => {
    setCurrentState(state);
  };

  switch (currentState) {
    case 'country_selection':
      switch (renderComponent) {
        case kycStatus.PENDING:
          return <KycStatus />;
        case kycStatus.APPROVED:
          return 'Welcome to APPROVED KYC page';
        case kycStatus.REJECTED:
          return 'Welcome to REJECTED KYC page';
        default:
          return (
            <RenderCountrySelection
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              handleSaveAndNext={handleSaveAndNext}
              errorSetState={errorSetState}
              errorState={errorState}
            />
          );
      }

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
          formState={formState}
          setIsDialogOpen={setIsDialogOpen}
          isDialogOpen={isDialogOpen}
          dialogContent={dialogContent}
          handleSubmit={handleSubmit}
        />
      );

    default:
      // Render a default component or handle the default case
      return;
  }
};

export default KYC;
