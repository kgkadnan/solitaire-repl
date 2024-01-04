'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './stepper.module.scss'; // Import your CSS module
import { CustomFooter } from '../footer';
import { StepperStatus } from '@/constants/enums/stepper-status';
import { CustomDialog } from '../dialog';

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
  nextStep: (_name: string, _activeID: number) => void;
  prevLabel?: string;
  nextLabel?: string;
  setIsDialogOpen: any;
  isDialogOpen: any;
  dialogContent: any;
}

const Stepper: React.FC<IStepperProps> = ({
  stepper,
  state,
  setState,
  prevStep,
  nextStep,
  prevLabel = 'Back',
  nextLabel = 'Save and Next',
  setIsDialogOpen,
  isDialogOpen,
  dialogContent
}) => {
  const [stepperData, setStepperData] = useState<IStepper[]>([]);

  useEffect(() => {
    setStepperData(stepper);
  }, [stepper]);

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
  const handleStepperStep = (activeStep: number) => {
    setState(activeStep);
    const updatedStepper = stepperData.map((step, index) => {
      if (index === activeStep) {
        return { ...step, status: StepperStatus.INPROGRESS };
      }
      return step;
    });

    // Update the state with the new array
    setStepperData(updatedStepper);
  };

  return (
    <>
      <CustomDialog
        setIsOpen={setIsDialogOpen}
        isOpens={isDialogOpen}
        dialogContent={dialogContent}
      />
      <div className={styles.stepperContainer}>
        <div className={styles.circularSteps}>
          {stepperData?.map((step: any, index: number) => (
            <>
              <div
                className={styles.circularStepsContainer}
                key={step.screenName}
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
                      : ''
                  }`}
                  onClick={() => handleStepperStep(index)}
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
    </>
  );
};

export default Stepper;
