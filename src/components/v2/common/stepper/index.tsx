import React from 'react';
import styles from './stepper.module.scss'; // Ensure you have the corresponding CSS module file
import { countries, kycScreenIdentifierNames } from '@/constants/enums/kyc';
import Image from 'next/image';
import Completed from '@public/v2/assets/icons/stepper/completed.svg';
import InProgress from '@public/v2/assets/icons/stepper/in-progress.svg';
import NotStarted from '@public/v2/assets/icons/stepper/not-started.svg';
import Rejected from '@public/v2/assets/icons/stepper/rejected.svg';
import ActionButton from '../action-button';
import { ManageLocales } from '@/utils/v2/translate';

export interface IStepperComponentProps {
  currentStepperStep: number;
  setCurrentStepperStep: any;
  completedSteps: any;
  rejectedSteps: any;
  renderStepperComponent: any;
  handleStepperNext: any;
  handleStepperBack: any;
  isEmailVerified: boolean;
  handleSubmit: any;
  filteredSteps: any;
  handleBack?: any;
  fromWhere?: any;
  country?: any;
}
// Define the steps with label and name

const StepperComponent: React.FC<IStepperComponentProps> = ({
  currentStepperStep,
  setCurrentStepperStep,
  completedSteps,
  rejectedSteps,
  renderStepperComponent,
  handleStepperNext,
  handleStepperBack,
  isEmailVerified,
  handleSubmit,
  filteredSteps,
  handleBack,
  fromWhere,
  country
}) => {
  // Function to mark a step as completed

  // Function to handle step click
  const handleStepClick = (index: number) => {
    if (index < currentStepperStep || completedSteps.has(index)) {
      setCurrentStepperStep(index);
    }
  };

  // Include the "Company Owner Details" only if the country is India

  const renderStepperIcon = (index: number) => {
    if (completedSteps.has(index)) {
      return Completed;
    } else if (rejectedSteps.has(index)) {
      return Rejected;
    } else if (index === currentStepperStep) {
      return InProgress;
    } else {
      return NotStarted;
    }
  };

  return (
    <div
      className={`flex w-full flex-col gap-[32px] min-h-[calc(100vh-60px)] px-[110px] pt-[32px]`}
    >
      <div className={styles.stepperContainer}>
        {filteredSteps.map((step: any, index: number) => {
          let stepStatusClass = '';
          if (completedSteps.has(index)) stepStatusClass = styles.completed;
          else if (rejectedSteps.has(index)) stepStatusClass = styles.rejected;
          else if (index === currentStepperStep)
            stepStatusClass = styles.active;
          return (
            <div
              key={step.name}
              className={`${styles.step} ${stepStatusClass}`}
              onClick={() => handleStepClick(index)}
            >
              <div className="p-[10px] flex gap-2">
                {' '}
                <Image
                  style={{ width: '20px', height: '20px' }}
                  src={renderStepperIcon(index)}
                  alt="Banner image"
                />
                {step.name}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex-grow">
        {renderStepperComponent(filteredSteps[currentStepperStep]?.identifier)}
      </div>
      <div className="h-[72px] bg-neutral0 border-[1px] border-solid border-neutral200 sticky bottom-0 rounded-t-[8px] mt-auto p-[16px]">
        {' '}
        <ActionButton
          actionButtonData={[
            {
              variant: 'secondary',
              label: ManageLocales('app.kyc.footer.back'),

              handler: () =>
                fromWhere === countries.OTHER
                  ? handleBack('country_selection')
                  : handleStepperBack()
            },
            {
              variant: 'primary',
              label:
                filteredSteps[currentStepperStep]?.identifier ===
                kycScreenIdentifierNames.PERSONAL_DETAILS
                  ? isEmailVerified
                    ? ManageLocales('app.kyc.footer.saveAndNext')
                    : 'Verify Email'
                  : filteredSteps[currentStepperStep]?.identifier ===
                      kycScreenIdentifierNames.ATTACHMENT
                    ? ManageLocales('app.kyc.footer.submit')
                    : ManageLocales('app.kyc.footer.saveAndNext'),
              handler: () => {
                filteredSteps[currentStepperStep]?.identifier ===
                kycScreenIdentifierNames.ATTACHMENT
                  ? handleSubmit()
                  : handleStepperNext({
                      screenName: filteredSteps[currentStepperStep]?.identifier,
                      currentState: currentStepperStep
                    });
              }
            }
          ]}
          containerStyle="!justify-between"
        />
      </div>
    </div>
  );
};

export default StepperComponent;
