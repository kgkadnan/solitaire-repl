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
import { useAppSelector } from '@/hooks/hook';

const KYC: React.FC = () => {
  const { errorState, errorSetState } = useErrorStateManagement();

  const kycStoreData: any = useAppSelector(
    store => store.kyc.formState.online.sections
  );

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedKYCOption, setSelectedKYCOption] = useState('');
  const [currentState, setCurrentState] = useState('country_selection');
  const [data, setData] = useState<any>({});

  const [activeStep, setActiveStep] = useState(0);
  const handleNextStep = (screenName: string) => {
    switch (screenName) {
      case 'personal_details':
        // code block
        console.log('personal_details', kycStoreData[screenName]);
        break;
      case 'company_details':
        // code block
        console.log('company_details', kycStoreData[screenName]);
        break;
      case 'company_owner_details':
        // code block
        console.log('company_owner_details', kycStoreData[screenName]);
        break;
      case 'banking_details':
        // code block
        console.log('banking_details', kycStoreData[screenName]);
        break;
      default:
        // code block
        console.log('default');
    }

    setActiveStep(prevStep => prevStep + 1);
  };
  const handlePrevStep = () => {
    console.log(activeStep, 'activeStep');
    if (activeStep <= 0) {
      setCurrentState('choice_for_filling_kyc');
    } else {
      setActiveStep(prevStep => prevStep - 1);
    }
  };

  const formState = useSelector((state: any) => state.kyc.formState);
  const formErrorState = useSelector((state: any) => state.kyc?.formErrorState);

  const stepperData: IStepper[] = data?.online
    ? data.online.map((screen: any, index: number) => ({
        label: `${screen.screen}`,
        data: (
          <RenderOnlineForm
            screen={screen}
            isLastStep={index === data.online.length - 1}
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
      return country.country.shortName === selectedCountry;
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
