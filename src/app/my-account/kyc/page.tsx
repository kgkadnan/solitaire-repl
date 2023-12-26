'use client';
import { ReactNode, useState } from 'react';
import { KYCForm } from '@/constants/kyc';
import { renderField } from './components/renderField';
import { StepperStatus } from '@/constants/enums/stepper-status';
import Stepper from '@/components/common/stepper';
import { CountrySelection } from './components/render-country-selection';
import handImage from '@public/assets/images/noto_waving-hand.png';
import { ManageLocales } from '@/utils/translate';
import { CustomInputlabel } from '@/components/common/input-label';
import Image from 'next/image';
interface IStepper {
  label: string;
  data: ReactNode;
  status: string;
}

const KYC: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  // const [activeStep, setActiveStep] = useState(0);
  // const handleNextStep = () => {
  //   setActiveStep(prevStep => prevStep + 1);
  // };
  // const handlePrevStep = () => {
  //   setActiveStep(prevStep => prevStep - 1);
  // };
  // const renderDigitalForm = (country: any, screen: any, isLastStep: any) => (
  //   <div key={screen.screen}>
  //     <h3>{screen.screen}</h3>
  //     {screen.fields.map((field: any) => (
  //       <div key={field.name}>{renderField(field)}</div>
  //     ))}
  //     {isLastStep && renderAttachment()}{' '}
  //     {/* Render attachment for the last step */}
  //   </div>
  // );
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
  // const renderAttachment = () => (
  //   <div>
  //     {/* <FileAttachments
  //                   key={id}
  //                   lable={label}
  //                   isRequired={isRequired}
  //                   uploadProgress={uploadProgress}
  //                   isFileUploaded={isFileUploaded}
  //                   setUploadProgress={setUploadProgress}
  //                   setIsFileUploaded={setIsFileUploaded}
  //                   setSelectedFile={setSelectedFile}
  //                   selectedFile={selectedFile}
  //                   maxFile={maxFile}
  //                   setError={setError}
  //                   error={error}
  //                   modalSetState={modalSetState}
  //                 /> */}
  //   </div>
  // );
  // const country = KYCForm[0]; // Replace this with the actual logic you use to select the country and screen dynamically
  // const selectedMode = 'digital';
  // const stepperData: IStepper[] = country.digital
  //   ? country.digital.map((screen: any, index: number) => ({
  //       label: `${screen.screen}`,
  //       data: renderDigitalForm(
  //         country,
  //         screen,
  //         index === country.digital.length - 1
  //       ),
  //       status:
  //         index === activeStep
  //           ? StepperStatus.INPROGRESS
  //           : StepperStatus.NOT_STARTED
  //     }))
  //   : [];
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
  // );
  return (
    <div className="w-full">
      <div className="flex flex-col gap-[30px] mb-[20px] items-start w-[30%]">
        <Image src={handImage} alt="Banner image" />
        <div className="flex flex-col gap-[10px]">
          <CustomInputlabel
            htmlfor={''}
            label={ManageLocales('app.myProfile.kyc.chooseTheCountry')}
            overriddenStyles={{
              label: '!text-solitaireTertiary text-[18px] font-semibold'
            }}
          />
          <div className="">
            <p className="text-solitaireTertiary text-[14px] text-sm">
              Please enter valid input as the form will ask <br /> documents for
              verification
            </p>
          </div>
        </div>

        <div className="w-full">
          <CountrySelection
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        </div>
      </div>
    </div>
  );
};

export default KYC;
