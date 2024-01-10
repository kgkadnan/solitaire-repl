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
import HandIcon from '@public/assets/icons/noto_backhand-index-pointing-up.svg';
import {
  useKycMutation,
  useGetKycDetailQuery,
  useResetKycMutation
} from '@/features/api/kyc';
import { updateFormState } from '@/features/kyc/kyc';
import { ValidationError } from 'class-validator';
import { validateScreen } from './helper/validations/screen/screen';
import { Checkbox } from '@/components/ui/checkbox';
import { kycScreenIdentifierNames, kycStatus } from '@/constants/enums/kyc';
import { statusCode } from '@/constants/enums/status-code';
import logger from 'logging/log-util';
import ErrorModel from '@/components/common/error-model';
import KycStatus from './components/kyc-status';
import { useGetAuthDataQuery } from '@/features/api/login';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';

const KYC: React.FC = () => {
  const { errorState, errorSetState } = useErrorStateManagement();

  const [kyc] = useKycMutation();
  const { data: kycDetails } = useGetKycDetailQuery({});

  const [selectedCountry, setSelectedCountry] = useState<any>('');
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

  const { data: authData } = useGetAuthDataQuery(token, { skip: !token });

  const [resetKyc] = useResetKycMutation();

  useEffect(() => {
    const storedToken = localStorage.getItem('auth');

    if (storedToken) setToken(JSON.parse(storedToken));
    setUserData(authData);
  }, [authData]);

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
      selectedCountry.value
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

  const handleTermAndCondition = () => {};

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
            (Array.isArray(data.attachment)
              ? // Render when `attachment` is an array
                data.attachment.map(
                  ({ id, label, isRequired, key, maxFile, minFile }: any) => (
                    <div key={id} className=" w-[45%]">
                      <FileAttachments
                        key={id}
                        lable={label}
                        formKey={key}
                        isRequired={isRequired}
                        formErrorState={formErrorState}
                        formState={formState}
                        modalSetState={modalSetState}
                        modalState={modalState}
                        maxFile={maxFile}
                        minFile={minFile}
                      />
                    </div>
                  )
                )
              : // Render when `attachment` is an object
                Object.keys(data.attachment).map((category: any) => (
                  <div key={category} className="w-[45%]">
                    <h1 className="text-solitaireTertiary py-3 capitalize ">
                      {category}
                    </h1>
                    <div className="flex flex-col gap-[20px]">
                      {data.attachment[category].map(
                        ({
                          id,
                          label,
                          isRequired,
                          key,
                          maxFile,
                          minFile
                        }: any) => (
                          <FileAttachments
                            key={id}
                            lable={label}
                            formKey={key}
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
                )))}
        </div>
        <hr className="w-[50%]" />
        <div className="flex py-6 items-center justify-center">
          <div className="pr-3 flex items-center">
            <Checkbox onClick={() => handleTermAndCondition()} />
          </div>
          <div className="text-solitaireTertiary flex gap-1">
            <p>I hereby agree to</p>
            <a
              href="https://kgk.live/terms-condition"
              className="border-b border-solitaireSenary ="
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
        if (res.data.statusCode === 204) {
          setCurrentState('country_selection');
          setSelectedCountry('');
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
        <div className="text-center align-middle text-solitaireTertiary text-[20px]">
          Are you sure?
        </div>
        <div className="text-center align-middle text-solitaireTertiary">
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
    switch (userData?.customer?.kyc?.status) {
      case kycStatus.INPROGRESS:
        if (
          kycDetails?.kyc &&
          (kycDetails?.kyc?.country !== null ||
            Object.keys(kycDetails?.kyc?.online).length >= 2) &&
          Object.keys(kycDetails?.kyc?.offline).length === 0
        ) {
          const { online, country, offline } = kycDetails.kyc;

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

            setSelectedCountry({
              label: country,
              value: country
            });
            setIsDialogOpen(true);
            setDialogContent(
              <>
                <div className="text-center align-middle text-solitaireTertiary">
                  <p className="text-[20px]">Are you sure?</p>
                </div>
                <div className="text-center align-middle text-solitaireTertiary">
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
          kycDetails?.kyc?.country === 'India'
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

          let onlineValue = kycDetails?.kyc?.online;

          dispatch(
            updateFormState({
              name: `formState.online.sections[${key}]`,
              value: onlineValue?.[screenIndex as keyof typeof onlineValue]
            })
          );
        });

        dispatch(
          updateFormState({
            name: 'formState.country',
            value: kycDetails?.kyc?.country
          })
        );

        dispatch(
          updateFormState({
            name: 'formState.offline',
            value: kycDetails?.kyc?.offline
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
  }, [kycDetails, userData]);

  useEffect(() => {
    let kycData = KYCForm.filter(country => {
      return country.country.backend === selectedCountry.value;
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
          formErrorState={formErrorState}
          formState={formState}
          modalSetState={modalSetState}
          modalState={modalState}
          prevStep={handlePrevStep}
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
          formErrorState={formErrorState}
          setIsDialogOpen={setIsDialogOpen}
          isDialogOpen={isDialogOpen}
          dialogContent={dialogContent}
        />
      );

    default:
      // Render a default component or handle the default case
      return;
  }
};

export default KYC;
