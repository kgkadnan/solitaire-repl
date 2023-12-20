// components/Stepper.js
import { ReactNode } from 'react';
import styles from './stepper.module.scss'; // Import your CSS module
import { CustomDisplayButton } from '../buttons/display-button';
import buttonStyles from '@components/common/footer/footer.module.scss';

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
  prevLabel?:string;
  nextLabel?:string
}
const Stepper: React.FC<IStepperProps> = ({
  stepper,
  state,
  setState,
  prevStep,
  nextStep,
  prevLabel='Back',
  nextLabel='Save and Next'
}) => {
  return (
    <div className={styles.stepperContainer}>
      <div className={styles.circularSteps}>
        {stepper.map((step: any, index: number) => (
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
            <div>{step.label}</div>
          </div>
        ))}
        
      </div>
      <div>{stepper[state].data}</div>
      <div className={styles.navigationButtons}>
      <CustomDisplayButton
              displayButtonLabel={prevLabel}
              displayButtonAllStyle={{
                displayButtonStyle: `${buttonStyles.footerButton} ${styles.transparent}`,
                displayLabelStyle: buttonStyles.footerButtonLabel
              }}
              isDisable={state === 0}
              handleClick={prevStep}
            />
         <CustomDisplayButton
              displayButtonLabel={nextLabel}
              displayButtonAllStyle={{
                displayButtonStyle: `${buttonStyles.footerButton} ${styles.filled}`,
                displayLabelStyle: buttonStyles.footerButtonLabel
              }}
              isDisable={state === stepper.length - 1}
              handleClick={nextStep}
            />
        
      </div>
    </div>
  );
};

export default Stepper;
