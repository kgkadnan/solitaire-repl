// components/Stepper.js
import { ReactNode } from 'react';
import styles from './stepper.module.scss'; // Import your CSS module

interface IStepper{
  label:string;
  data:ReactNode;
  status:string;
}
interface IStepperProps{
  stepper:IStepper[];
  state:number;
  setState:any;
  prevStep:()=>void;
  nextStep:()=>void;
}
const Stepper:React.FC<IStepperProps> = ({stepper,state,setState,prevStep,nextStep}) => {


  return (
    <div className={styles.stepperContainer}>
      <div className={styles.circularSteps}>
      {stepper.map((step:any, index:number) => (
      
      <div>
        
          <div
            key={index}
            className={`${styles.step} ${index === state ? styles.activeStep : ''}`}
            onClick={() => setState(index)}
          >
            {index + 1} 
          </div>
          <div>{step.label}</div>
    
     </div>
     
   
      
          ))}
             </div>
           <div className={styles.navigationButtons}>
        <button onClick={prevStep} disabled={state === 0}>
          Previous
        </button>
        <button onClick={nextStep} disabled={state === stepper.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;
