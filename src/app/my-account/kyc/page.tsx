'use client';
import { ReactNode, useState } from 'react';
import { KYCForm } from '@/constants/kyc';
import { renderField } from './components/renderField';
import { StepperStatus } from '@/constants/enums/stepper-status';
import Stepper from '@/components/common/stepper';
import Image from 'next/image';

interface IStepper {
  label: string;
  data: ReactNode;
  status: string;
}

const KYC: React.FC = () => {
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
            {renderField(field)}
          </div>
        ))}
        {isLastStep && renderAttachment()}{' '}
        {/* Render attachment for the last step */}
      </div>
    </div>
  );

  const renderManualForm = () => (
    <div>
      {/* <DownloadAndUpload
          uploadProgress={uploadProgress}
          isFileUploaded={isFileUploaded}
          setUploadProgress={setUploadProgress}
          setIsFileUploaded={setIsFileUploaded}
          setSelectedFile={setUploadFilePreview}
          selectedFile={uploadFilePreview}
          maxFile={1}
          modalSetState={modalSetState}
        /> */}
    </div>
  );

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

  return (
    <div className="">
      {selectedMode === 'digital' ? (
        <Stepper
          stepper={stepperData}
          state={activeStep}
          setState={setActiveStep}
          prevStep={handlePrevStep}
          nextStep={handleNextStep}
        />
      ) : (
        renderManualForm()
      )}
    </div>
  );
};

export default KYC;
