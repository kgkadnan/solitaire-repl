'use client';
import { useEffect, useState } from 'react';
import { KYCForm } from '@/constants/kyc';
import { StepperStatus } from '@/constants/enums/stepper-status';
import Stepper, { IStepper } from '@/components/common/stepper';
import RenderCountrySelection from './render-country-selection';
import { useErrorStateManagement } from '@/hooks/error-state-management';
import RenderOffline from './render-offline';
import { useSelector } from 'react-redux';
import { RenderOnlineForm } from './render-online';
import RenderKYCModeSelection from './render-kyc-mode-selection';
import { validateScreen } from './helper/handle-validation';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import FileAttachments from '@/components/common/file-attachment';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import Image from 'next/image';
import HandIcon from '@public/assets/icons/noto_backhand-index-pointing-up.svg';
import { updateFormState } from '@/features/kyc/kyc';
import { useKycMutation } from '@/features/api/kyc';

const KYC: React.FC = () => {
  const { errorState, errorSetState } = useErrorStateManagement();

  const [kyc] = useKycMutation();

  const kycStoreData: any = useAppSelector(store => store.kyc.formState);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedKYCOption, setSelectedKYCOption] = useState('');
  const [currentState, setCurrentState] = useState('country_selection');
  const [data, setData] = useState<any>({});
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();

  const handleNextStep = async (screenName: string, activeID: number) => {
    let active = activeID + 1;
    let validationError;
    switch (screenName) {
      case 'personal_details':
        validationError = await validateScreen(
          kycStoreData.online.sections[screenName],
          screenName,
          selectedCountry
        );
        if (validationError) {
          Array.isArray(validationError) &&
            validationError.map(error => {
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

        !validationError &&
          console.log('personal_details API CALL', kycStoreData[screenName]);
        // code block
        kyc({
          data: {
            country: kycStoreData.country,
            offline: kycStoreData.offline,
            data: {
              ...kycStoreData.online.sections[screenName],
              country_code: 'IND'
            }
          },
          ID: active
        })
          .unwrap()
          .then((res: any) => console.log('res'))
          .catch((e: any) => {});
        break;
      case 'company_details':
        // code block
        kyc({
          data: {
            country: kycStoreData.country,
            offline: kycStoreData.offline,
            data: { ...kycStoreData.online.sections[screenName] }
          },
          ID: active
        })
          .unwrap()
          .then((res: any) => console.log('res'))
          .catch((e: any) => {});
        console.log('company_details', kycStoreData[screenName]);
        break;
      case 'company_owner_details':
        kyc({
          data: {
            country: kycStoreData.country,
            offline: kycStoreData.offline,
            data: { ...kycStoreData.online.sections[screenName] }
          },
          ID: active
        })
          .unwrap()
          .then((res: any) => console.log('res'))
          .catch((e: any) => {});
        // code block
        console.log('company_owner_details', kycStoreData[screenName]);
        break;
      case 'banking_details':
        kyc({
          data: {
            country: kycStoreData.country,
            offline: kycStoreData.offline,
            data: {
              ...kycStoreData.online.sections[screenName]
            }
          },
          ID: active
        })
          .unwrap()
          .then((res: any) => console.log('res'))
          .catch((e: any) => {});
        // code block
        console.log('banking_details', kycStoreData[screenName]);
        break;
      default:
        // code block
        console.log('default');
    }

    !validationError && setActiveStep(prevStep => prevStep + 1);
  };
  const handlePrevStep = () => {
    console.log(activeStep, 'activeStep');
    if (activeStep <= 0) {
      setCurrentState('choice_for_filling_kyc');
    } else {
      setActiveStep(prevStep => prevStep - 1);
    }
  };
  const { modalSetState } = useModalStateManagement();
  const formState = useSelector((state: any) => state.kyc.formState);
  const formErrorState = useSelector((state: any) => state.kyc?.formErrorState);

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
    label: 'attachment',
    data: (
      <>
        <div className="flex items-center mt-[30px] mb-[30px] ">
          <Image src={HandIcon} alt="Backhand image" />
          <h3 className="ml-[10px] text-[18px] text-solitaireTertiary">
            Attachments
          </h3>
        </div>
        <div className="flex w-full justify-between pb-5">
          {data?.attachment &&
            Object?.keys(data?.attachment).map((category: any) => (
              <div key={category} className="w-[45%]">
                <h1 className="text-solitaireTertiary mb-3 capitalize ">
                  {category}
                </h1>
                <div className="flex flex-col gap-[20px] flex-wrap ">
                  {data?.attachment[category]?.map(
                    ({
                      id,
                      label,
                      isRequired,
                      uploadProgress,
                      isFileUploaded,
                      setUploadProgress,
                      setIsFileUploaded,
                      setSelectedFile,
                      selectedFile,
                      setError,
                      error,
                      maxFile,
                      minFile
                    }: any) => (
                      <FileAttachments
                        key={id}
                        lable={label}
                        isRequired={isRequired}
                        uploadProgress={uploadProgress}
                        isFileUploaded={isFileUploaded}
                        setUploadProgress={setUploadProgress}
                        setIsFileUploaded={setIsFileUploaded}
                        setSelectedFile={setSelectedFile}
                        selectedFile={selectedFile}
                        maxFile={maxFile}
                        setError={setError}
                        error={error}
                        modalSetState={modalSetState}
                        minFile={minFile}
                      />
                    )
                  )}
                </div>
              </div>
            ))}
        </div>
      </>
    ),
    status:
      stepperData.length === activeStep
        ? StepperStatus.INPROGRESS
        : StepperStatus.NOT_STARTED,
    screenName: 'Attachment'
  });

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
    let KYCData = KYCForm.filter(country => {
      return country.country.fullName === selectedCountry;
    });
    setData(KYCData[0]);
  }, [selectedCountry]);

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
      return <RenderOffline data={data} />;
    // Add more cases as needed
    case 'online':
      return (
        <Stepper
          stepper={stepperData}
          state={activeStep}
          setState={setActiveStep}
          prevStep={handlePrevStep}
          nextStep={handleNextStep}
        />
      );

    case 'offline':
      return <RenderOffline data={data} />;
    default:
      // Render a default component or handle the default case
      return;
  }
};

export default KYC;
