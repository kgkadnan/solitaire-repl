// components/Stepper.js
import { ReactNode, useState } from 'react';
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
  nextStep: (_name: string, _activeID: number) => void;
  prevLabel?: string;
  nextLabel?: string;
}

const Stepper: React.FC<IStepperProps> = ({
  stepper,
  state,
  setState,
  prevStep,
  nextStep,
  prevLabel = 'Back',
  nextLabel = 'Save and Next'
}) => {
  const [stepperData, setStepperData] = useState<IStepper[]>(stepper);
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
    <div className={styles.stepperContainer}>
      <div className={styles.circularSteps}>
        {stepperData?.map((step: any, index: number) => (
          <>
            <div className={styles.circularStepsContainer}>
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
      <div>{stepper[state]?.data}</div>

      <div className={styles.navigationButtons}>
        <CustomFooter
          footerButtonData={footerButtonData(state)}
          noBorderTop={styles.paginationContainerStyle}
        />
      </div>
    </div>
  );
};

export default Stepper;
