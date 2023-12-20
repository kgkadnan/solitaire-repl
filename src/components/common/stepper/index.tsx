// components/Stepper.js
import { ReactNode } from 'react';
import styles from './stepper.module.scss'; // Import your CSS module

interface IStepper{
  label:string;
  data:ReactNode;
  setState:any;
  state:number;
  prevStep:()=>void;
  nextStep:()=>void;
  status:string;
  customStyles:any,
}
interface IStepperProps{
  stepper:IStepper[]
}
const Stepper:React.FC<IStepperProps> = ({stepper}) => {


  return (
    <div className={styles.stepperContainer}>
      {stepper.map((step:any, index:number) => (
        <>
      <div className={styles.circularSteps}>
        
          <div
            key={index}
            className={`${styles.step} ${index === step.state ? styles.activeStep : ''}`}
            onClick={() => step.setState(index)}
          >
            {index + 1}
          </div>
    
      <div className={styles.stepContent}>
        {step.currentStep}
      </div>
      <div className={styles.navigationButtons}>
        <button onClick={step.prevStep} disabled={step.state === 0}>
          Previous
        </button>
        <button onClick={step.nextStep} disabled={step.state === stepper.length - 1}>
          Next
        </button>
      </div>
      </div>
      </>
          ))}
    </div>
  );
};

export default Stepper;
