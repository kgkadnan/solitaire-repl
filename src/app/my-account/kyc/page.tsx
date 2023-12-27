'use client';
import { ReactNode, useEffect, useState } from 'react';
import { KYCForm } from '@/constants/kyc';
import { StepperStatus } from '@/constants/enums/stepper-status';
import Stepper from '@/components/common/stepper';
import RenderCountrySelection from './render-country-selection';
import { useErrorStateManagement } from '@/hooks/error-state-management';
import RenderManually from './render-manually';
import { useSelector } from 'react-redux';
import { RenderDigitalForm } from './render-digital';
import RenderKYCModeSelection from './render-kyc-mode-selection';

interface IStepper {
  label: string;
  data: ReactNode;
  status: string;
}

const KYC: React.FC = () => {
  const { errorState, errorSetState } = useErrorStateManagement();

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedKYCOption, setSelectedKYCOption] = useState('');
  const [currentState, setCurrentState] = useState('country_selection');
  const [data, setData] = useState({});

  const [activeStep, setActiveStep] = useState(0);
  const handleNextStep = () => {
    setActiveStep(prevStep => prevStep + 1);
  };
  const handlePrevStep = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const formState = useSelector((state: any) => state.kyc.formState);
  const formErrors = useSelector((state: any) => state.kyc?.formErrors);

  // const renderManualForm = () => (
  //   <div>
  //     {/* <DownloadAndUpload
  //         uploadProgress={uploadProgress}
  //         isFileUploaded={isFileUploaded}
  //         setUploadProgress={setUploadProgress}
  //         setIsFileUploaded={setIsFileUploaded}
  //         setSelectedFile={setUploadFilePreview}
  //         selectedFile={uploadFilePreview}
  //         maxFile={1}
  //         modalSetState={modalSetState}
  //       /> */}
  //   </div>
  // );
  const renderAttachment = () => (
    <div>
      {/* <FileAttachments
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
                  /> */}
    </div>
  );
  const country = KYCForm[0]; // Replace this with the actual logic you use to select the country and screen dynamically
  const selectedMode = 'digital';
  const stepperData: IStepper[] = country.digital
    ? country.digital.map((screen: any, index: number) => ({
        label: `${screen.screen}`,
        data: (
          <RenderDigitalForm
            screen={screen}
            isLastStep={index === country.digital.length - 1}
            formState={formState}
            formErrorState={formErrors}
          />
        ),
        status:
          index === activeStep
            ? StepperStatus.INPROGRESS
            : StepperStatus.NOT_STARTED
      }))
    : [];
  // return (
  //   <div>
  //     {selectedMode === 'digital' ? (
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
    setData(KYCData);
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
      return <RenderManually data={data} />;
    // Add more cases as needed
    case 'digitally':
      return (
        <Stepper
          stepper={stepperData}
          state={activeStep}
          setState={setActiveStep}
          prevStep={handlePrevStep}
          nextStep={handleNextStep}
        />
      );

    case 'manually':
      return <RenderManually data={data} />;
    default:
      // Render a default component or handle the default case
      return;
  }
};

export default KYC;
