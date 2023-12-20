'use client';

import Stepper from '@/components/common/stepper';
import { StepperStatus } from '@/constants/enums/stepper-status';
import { useState } from 'react';

export default function Home() {
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
      status: StepperStatus.NOT_STARTED
    },
    {
      label: 'Personal Details',
      data: <div>This is step 2</div>,
      status: StepperStatus.NOT_STARTED
    },
    {
      label: 'Personal Details5',
      data: <div>This is step 3</div>,
      status: StepperStatus.NOT_STARTED
    }
  ];
  // const logger = getLogger('home');
  // logger.error('a error message from _app');
  // logger.debug('a debug message from _app');
  // logger.info('a info message from _app');

  return (
    <>
      <h1
        style={{
          fontSize: '100px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '180px'
        }}
      >
        Welcome to KGK live 2.O
      </h1>
      <h1
        style={{
          fontSize: '30px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        Building Digital Diamond Platform
      </h1>
      <Stepper
        stepper={steps}
        state={currentStep}
        setState={setCurrentStep}
        prevStep={prevStep}
        nextStep={nextStep}
      />
    </>
  );
}
