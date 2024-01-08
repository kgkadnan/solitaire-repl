import React, { useState } from 'react';
import Stepper from '.';
import { StepperStatus } from '@/constants/enums/stepper-status';

const StepperExample = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const steps = [
    {
      label: 'Personal Details',
      data: <div>This is step 1</div>,
      status: StepperStatus.COMPLETED,
      screenName: 'personal'
    },
    {
      label: 'Personal Details',
      data: (
        <div>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available. Wikipedia
        </div>
      ),
      status: StepperStatus.NOT_STARTED,
      screenName: 'personal'
    },
    {
      label: 'Personal Details5',
      data: <div>This is step 3</div>,
      status: StepperStatus.REJECTED,
      screenName: 'personal'
    },
    {
      label: 'Personal Details5',
      data: <div>This is step 3</div>,
      status: StepperStatus.NOT_STARTED,
      screenName: 'personal'
    },
    {
      label: 'Personal Details5',
      data: <div>This is step 3</div>,
      status: StepperStatus.NOT_STARTED,
      screenName: 'personal'
    }
  ];
  return (
    <Stepper
      stepper={steps}
      state={currentStep}
      setState={setCurrentStep}
      prevStep={prevStep}
      nextStep={nextStep}
      formErrorState={'test'}
    />
  );
};

export default StepperExample;
