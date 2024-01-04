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
import { useKycMutation, useGetKycDetailQuery } from '@/features/api/kyc';
import { updateFormState } from '@/features/kyc/kyc';
import { ValidationError } from 'class-validator';
import { validateScreen } from './helper/validations/screen/screen';
import { Checkbox } from '@/components/ui/checkbox';
import { kycScreenIdentifierNames } from '@/constants/enums/kyc';
import { ManageLocales } from '@/utils/translate';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { statusCode } from '@/constants/enums/status-code';

const KYC: React.FC = () => {
  const { errorState, errorSetState } = useErrorStateManagement();

  const [kyc] = useKycMutation();
  const { data: kycDetails } = useGetKycDetailQuery({});

  const [selectedCountry, setSelectedCountry] = useState<any>('');
  const [selectedKYCOption, setSelectedKYCOption] = useState('');
  const [currentState, setCurrentState] = useState('country_selection');
  const [data, setData] = useState<any>({});
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();

  const { modalState, modalSetState } = useModalStateManagement();
  const { formState, formErrorState } = useSelector((state: any) => state.kyc);

  const { dialogContent, isDialogOpen } = modalState;
  const { setIsDialogOpen, setDialogContent } = modalSetState;

  const handleNextStep = async (screenName: string, activeID: number) => {
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
            value: Object.values(error.constraints ?? {})[0]
          })
        );
      });
    }
    !validationError.length &&
      (await kyc({
        data: {
          country: formState.country,
          offline: formState.offline,
          data: {
            ...formState.online.sections[screenName]
          }
        },
        ID: active
      })
        .then((_res: any) => (stepSuccessStatus = _res.data.statusCode))
        .catch((_e: any) => {}));

    !validationError.length &&
      stepSuccessStatus === statusCode.NO_CONTENT &&
      setActiveStep(prevStep => prevStep + 1);
    stepSuccessStatus = 0;
  };

  const handleTermAndCondition = () => {};

  const handlePrevStep = () => {
    if (activeStep <= 0) {
      setCurrentState('choice_for_filling_kyc');
    } else {
      setActiveStep(prevStep => prevStep - 1);
    }
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
        <div className="pb-5 max-h-[800px] flex flex-wrap flex-col gap-[20px] content-between">
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
        <hr className="border-1 border-solitaireSenary w-[50%]" />
        <div className="flex py-6 items-center justify-center">
          <div className="pr-3 flex items-center">
            <Checkbox onClick={() => handleTermAndCondition()} />
          </div>
          <div className="text-solitaireTertiary flex gap-1">
            <p>I hereby agree to</p>
            <a
              href="https://kgk.live/terms-condition"
              className="border-b-[1px] border-solid border-solitaireQuaternary"
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

  const handleResetButton = () => {
    setCurrentState('country_selection');
  };

  useEffect(() => {
    let resData = kycDetails?.kyc;

    if (
      resData &&
      Object.keys(resData?.online).length !== 0 &&
      Object.keys(resData?.offline).length === 0
    ) {
      const onlineData = resData?.online || {};

      const filledScreens = Object.keys(onlineData)
        .map(key => parseInt(key, 10))
        .filter(num => !isNaN(num));

      const lastFilledScreen = Math.max(...filledScreens);

      if (lastFilledScreen > 0) {
        setCurrentState('online');
        setActiveStep(lastFilledScreen - 1);
        setIsDialogOpen(true);
        setDialogContent(
          <>
            <div className="text-center align-middle text-solitaireTertiary">
              {ManageLocales('app.topNav.kycModelContent')}
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
    const sectionKeys: string[] =
      resData?.country === 'India'
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

      dispatch(
        updateFormState({
          name: `formState.online.sections[${key}]`,
          value: resData?.online[screenIndex as keyof typeof resData.online]
        })
      );
    });

    dispatch(
      updateFormState({
        name: 'country',
        value: resData?.country
      })
    );

    dispatch(
      updateFormState({
        name: 'offline',
        value: resData?.offline
      })
    );
    setSelectedCountry({ label: resData?.country, value: resData?.country });

    resData?.offline
      ? setSelectedKYCOption('online')
      : setSelectedKYCOption('offline');
  }, [kycDetails]);

  // return (
  //   <div>
  //     {selectedMode === 'online' ? (
  //       <Stepper
  //         stepper={stepperData}
  //         state={activeStep}
  //         setState={setActiveStep}
  //         prevStep={handlePrevStep}
  //         nextStep={handleNextStep}
  //       />
  //     ) : (
  //       renderManualForm()
  //     )}
  //   </div>
  // );  // Configuration for footer buttons

  useEffect(() => {
    let kycData = KYCForm.filter(country => {
      return country.country.display === selectedCountry.value;
    });
    setData(kycData[0]);
  }, [currentState]);

  const handleSaveAndNext = (state: string) => {
    setCurrentState(state);
  };

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
      break;
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
