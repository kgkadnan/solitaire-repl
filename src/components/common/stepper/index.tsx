// components/Stepper.js
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './stepper.module.scss'; // Import your CSS module
import { CustomFooter } from '../footer';
import { StepperStatus } from '@/constants/enums/stepper-status';

export interface IStepper {
  label: string;
  data: ReactNode;
  status: string;
  screenName: string;
}
interface IStepperProps {
  stepper: IStepper[];
  state: number;
  setState: any;
  prevStep: () => void;
  nextStep: (_name: string, _activeID: number, _saveStep?: boolean) => void;
  prevLabel?: string;
  nextLabel?: string;
  formErrorState: any;
  formState: any;
}

const Stepper: React.FC<IStepperProps> = ({
  stepper,
  state,
  setState,
  prevStep,
  nextStep,
  prevLabel = 'Back',
  nextLabel = 'Save and Next',
  formErrorState,
  formState
}) => {
  const [stepperData, setStepperData] = useState<IStepper[]>(stepper);

  useEffect(() => {
    const initializeStepperStatus = () => {
      const updatedStepper = stepper.map((step, index) => {
        const errors = formErrorState.online.sections[step.screenName];
        const hasErrors = errors && Object.keys(errors).length > 0;
        return {
          ...step,
          status: hasErrors ? StepperStatus.REJECTED : Object.keys(formState.online.sections[step.screenName]||{}).length ? StepperStatus.COMPLETED : StepperStatus.NOT_STARTED
        };
      });
      setStepperData(updatedStepper);
    };

    initializeStepperStatus();
  }, []);

  const footerButtonData = (state: number) => {
    return [
      {
        id: 1,
        displayButtonLabel: prevLabel,
        style: styles.transparent,
        fn: prevStep,
        isDisable: state === 0
      },
      {
        id: 2,
        displayButtonLabel: nextLabel,
        style: styles.filled,
        fn: () => nextStep(stepper[state]?.screenName, state),
        isDisable: state === stepper.length - 1
      }
    ];
  };

  const handleStepperStep = async (activeStep: number) => {
    setState(activeStep);

    const updatedStepper = await Promise.all(
      stepperData.map(async (step, index) => {
        if (index === activeStep) {
          // Set the current step to INPROGRESS
          return { ...step, status: StepperStatus.INPROGRESS };
        } else if (index < activeStep) {
          // Only update previous steps if they are not already REJECTED
          const stepperError: any = await nextStep(
            stepper[index]?.screenName,
            index,
            false
          );
          const hasError = Array.isArray(stepperError) && stepperError.length;
          return {
            ...step,
            status: hasError ? StepperStatus.REJECTED : StepperStatus.COMPLETED
          };
        } else {
          // For steps after the current step, set them to NOT_STARTED or another appropriate status
          return { ...step, status: StepperStatus.NOT_STARTED };
        }
      })
    );

    // Update the state with the new array
    setStepperData(updatedStepper);
  };

  return (
    <div className={styles.stepperContainer}>
      <div className={styles.circularSteps}>
        {stepperData?.map((step: any, index: number) => (
          <>
            <div
              className={styles.circularStepsContainer}
              key={step.screenName}
              onClick={() => handleStepperStep(index)}
            >
              <div
                key={index}
                className={`${styles.step} ${
                  step?.status === StepperStatus.COMPLETED
                    ? styles.completedStep
                    : step?.status === StepperStatus.INPROGRESS
                    ? styles.activeStep
                    : step?.status === StepperStatus.REJECTED
                    ? styles.rejectedStep
                    : styles.defaultStep
                }`}
              >
                {index + 1}
              </div>

              <div className={styles.stepLabel}>{step?.label}</div>
            </div>
            {index < stepper.length - 1 && (
              <div className={styles.stepLine}></div>
            )}
          </>
        ))}
      </div>
      <hr className="border-1 border-solitaireSenary mt-6" />
      <div>{stepper[state]?.data}</div>

      <div className={`${styles.navigationButtons} `}>
        <CustomFooter
          footerButtonData={footerButtonData(state)}
          noBorderTop={styles.paginationContainerStyle}
        />
      </div>
    </div>
  );
};

export default Stepper;
