// components/Stepper.js
import { ReactNode } from 'react';
import styles from './stepper.module.scss'; // Import your CSS module
import { CustomDisplayButton } from '../buttons/display-button';
import buttonStyles from '@components/common/footer/footer.module.scss';
import { CustomFooter } from '../footer';

interface IStepper {
  label: string;
  data: ReactNode;
  status: string;
}
interface IStepperProps {
  stepper: IStepper[];
  state: number;
  setState: any;
  prevStep: () => void;
  nextStep: () => void;
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
        fn: nextStep,
        isDisable: state === stepper.length - 1
      }
    ];
  };
  return (
    <div className={styles.stepperContainer}>
      <div className={styles.circularSteps}>
        {stepper.map((step: any, index: number) => (
          <>
            <div className={styles.circularStepsContainer}>
              <div
                key={index}
                className={`${styles.step} ${
                  index === state ? styles.activeStep : ''
                }`}
                onClick={() => setState(index)}
              >
                {index + 1}
              </div>

              <div className={styles.stepLabel}>{step.label}</div>
            </div>
              {index < stepper.length - 1 && (
                <div className={styles.stepLine}></div>
              )}
          </>
        ))}
      </div>
      <div>{stepper[state].data}</div>

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
