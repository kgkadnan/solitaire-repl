import React, { useState } from 'react';
import styles from './stepper.module.scss'; // Your CSS module with styles

// Define the steps
const steps = [
  'Personal Details',
  'Company Details',
  'Owner Details',
  'Banking Details',
  'Attachment'
];

// Define a function to determine the step's class based on its state
const getStepClass = (
  index: number,
  currentStep: number,
  rejectedSteps: any
) => {
  if (rejectedSteps.includes(index)) return styles.rejected;
  if (index < currentStep) return styles.completed;
  if (index === currentStep) return styles.active;
  return styles.default;
};

const StepperComponent = () => {
  const [currentStep, setCurrentStep] = useState(0); // Current active step
  const [rejectedSteps, setRejectedSteps] = useState([]); // Array of rejected steps

  // Handle clicking a step
  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    // Optionally handle rejected logic here
  };

  return (
    <div className={styles.stepperContainer}>
      {steps.map((step, index) => (
        <div
          key={step}
          className={`${styles.step} ${getStepClass(
            index,
            currentStep,
            rejectedSteps
          )}`}
          onClick={() => handleStepClick(index)}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default StepperComponent;
