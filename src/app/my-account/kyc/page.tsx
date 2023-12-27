'use client';
import { ReactNode, useEffect, useState } from 'react';
import { KYCForm } from '@/constants/kyc';
import { RenderField } from './components/renderField';
import { StepperStatus } from '@/constants/enums/stepper-status';
import Stepper from '@/components/common/stepper';
import handImage from '@public/assets/images/noto_waving-hand.png';
import { ManageLocales } from '@/utils/translate';
import { CustomInputlabel } from '@/components/common/input-label';
import { CustomFooter } from '@/components/common/footer';
import RenderCountrySelection from './components/render-country-selection';
import RenderKYCSelection from './components/render-kyc-selection';
import { useErrorStateManagement } from '@/hooks/error-state-management';
import RenderManually from './components/manually/render-manually';
import { FormProvider } from './hooks/form-context';
import Image from 'next/image';

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
  const renderDigitalForm = (country: any, screen: any, isLastStep: any) => (
    <div key={screen.screen}>
      <div className="flex items-center mt-[30px] mb-[30px] ">
        <Image src={screen.icon} alt="Backhand image" />
        <h3 className="ml-[10px] text-[18px] text-solitaireTertiary">
          {screen.screen}
        </h3>
      </div>
      <div className="h-[950px] flex flex-col flex-wrap">
        {screen.fields.map((field: any) => (
          <div key={field.name} className={`mb-[20px] w-[40%] `}>
            <RenderField data={field} />
          </div>
        ))}
        {isLastStep && renderAttachment()}{' '}
        {/* Render attachment for the last step */}
      </div>
    </div>
  );
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
        data: renderDigitalForm(
          country,
          screen,
          index === country.digital.length - 1
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
        <RenderKYCSelection
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
        <FormProvider>
          {' '}
          <Stepper
            stepper={stepperData}
            state={activeStep}
            setState={setActiveStep}
            prevStep={handlePrevStep}
            nextStep={handleNextStep}
          />
        </FormProvider>
      );

    case 'manually':
      return <RenderManually data={data} />;
    default:
      // Render a default component or handle the default case
      return;
  }
};

export default KYC;
