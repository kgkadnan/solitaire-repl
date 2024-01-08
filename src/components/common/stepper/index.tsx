'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './stepper.module.scss'; // Import your CSS module
import { CustomFooter } from '../footer';
import { StepperStatus } from '@/constants/enums/stepper-status';
import { statusCode } from '@/constants/enums/status-code';
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
  nextStep: (_name: string, _activeID: number, _saveStep?: boolean) => void;
  prevLabel?: string;
  nextLabel?: string;
  formErrorState: any;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDialogOpen: boolean;
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
  formErrorState,
  setIsDialogOpen,
  isDialogOpen,
  dialogContent
}) => {
  const [stepperData, setStepperData] = useState<IStepper[]>([]);

  useEffect(() => {
    setStepperData(stepper);
  }, [stepper]);

  useEffect(() => {
    const initializeStepperStatus = () => {
      const updatedStepper = stepper.map((step, index) => {
        const errors = formErrorState.online.sections[step.screenName];
        const hasErrors = errors && Object.values(errors).length;
        return {
          ...step,
          status: hasErrors
            ? errors &&
              hasErrors &&
              Object?.values(errors).every(element => element === '')
              ? StepperStatus.COMPLETED
              : StepperStatus.REJECTED
            : index === 0
            ? StepperStatus.INPROGRESS // 0 -> index condition tO be change to actual stepper index while redirecting
            : StepperStatus.NOT_STARTED
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
        isHidden: state === 0
      },
      {
        id: 2,
        displayButtonLabel: nextLabel,
        style: styles.filled,
        fn: async () => {
          const updatedStepper = await Promise.all(
            stepperData.map(async (step, index) => {
              if (index === state) {
                let nextStepStatus: any = nextStep(
                  stepper[state]?.screenName,
                  state
                );
                const { validationError: stepperError, statusCode: code } =
                  nextStepStatus;

                const hasError =
                  Array.isArray(stepperError) && stepperError.length;
                return {
                  ...step,
                  status: hasError
                    ? StepperStatus.REJECTED
                    : code === statusCode.NO_CONTENT
                    ? StepperStatus.COMPLETED
                    : StepperStatus.INPROGRESS
                };
              } else {
                return step;
              }
            })
          );

          // Update the state with the new array
          setStepperData(updatedStepper);
        },
        isHidden: false
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
        }
        if (index < activeStep && step.status !== StepperStatus.COMPLETED) {
          // Only update previous steps if they are not already REJECTED
          const nextStepStatus: any = await nextStep(
            stepper[index]?.screenName,
            index,
            false
          );
          const { validationError: stepperError, statusCode: code } =
            nextStepStatus;
          const hasError = Array.isArray(stepperError) && stepperError.length;
          return {
            ...step,
            status:
              hasError || typeof stepperError === 'string'
                ? StepperStatus.REJECTED
                : code === statusCode.NO_CONTENT
                ? StepperStatus.COMPLETED
                : step.status
          };
        } else {
          if (step.status === StepperStatus.INPROGRESS) {
            return { ...step, status: StepperStatus.NOT_STARTED };
          } else {
            return step;
          }
          // For steps after the current step, set them to NOT_STARTED or another appropriate status
        }
      })
    );

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
              </div>
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
