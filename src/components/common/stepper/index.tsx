'use client';
import React, { ReactNode } from 'react';
import styles from './stepper.module.scss'; // Import your CSS module
import { CustomFooter } from '../footer';
import { StepperStatus } from '@/constants/enums/stepper-status';
import { statusCode } from '@/constants/enums/status-code';
import { CustomDialog } from '../dialog';
import CustomLoader from '../loader';

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
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDialogOpen: boolean;
  dialogContent: any;
  handleSubmit?: () => void;
  setStepperData?: any;
}

const Stepper: React.FC<IStepperProps> = ({
  stepper,
  state,
  setState,
  prevStep,
  nextStep,
  prevLabel = 'Back',
  nextLabel = 'Save and Next',
  setStepperData,
  setIsDialogOpen,
  isDialogOpen,
  dialogContent,
  handleSubmit
}) => {
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
        displayButtonLabel: state === stepper.length - 1 ? 'Submit' : nextLabel,
        style: styles.filled,
        fn: async () => {
          if (state === stepper.length - 1) {
            handleSubmit!();
          } else {
            const updatedStepper = await Promise.all(
              stepper.map(async (step, index) => {
                if (index === state) {
                  let nextStepStatus: any = await nextStep(
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
                      : step.status
                  };
                } else {
                  return step;
                }
              })
            );
            // Update the state with the new array
            setStepperData(updatedStepper);
          }
        },
        isHidden: false
      }
    ];
  };

  const updateStepperStatus = async (activeStep: number) => {
    setState(activeStep);
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
          {stepper.length ? (
            stepper?.map((step: any, index: number) => (
              <>
                <div
                  className={styles.circularStepsContainer}
                  key={step.screenName}
                  onClick={() => updateStepperStatus(index)}
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
            ))
          ) : (
            <CustomLoader />
          )}
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
