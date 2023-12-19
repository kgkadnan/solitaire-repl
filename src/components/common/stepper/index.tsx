// components/Stepper.js
import styles from './stepper.module.scss'; // Import your CSS module

const Stepper = (stepper:any) => {


  return (
    <div className={styles.stepperContainer}>
      <div className={styles.circularSteps}>
        {stepper.map((step:any, index:number) => (
          <div
            key={index}
            className={`${styles.step} ${index === stepper.state ? styles.activeStep : ''}`}
            onClick={() => stepper.setState(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className={styles.stepContent}>
        {stepper[currentStep]}
      </div>
      <div className={styles.navigationButtons}>
        <button onClick={stepper.prevStep} disabled={stepper.state === 0}>
          Previous
        </button>
        <button onClick={stepper.nextStep} disabled={stepper.state === stepper.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;
