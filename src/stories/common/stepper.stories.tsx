import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { countries, kycScreenIdentifierNames } from '@/constants/enums/kyc';
import StepperComponent, {
  IStepperComponentProps
} from '@/components/v2/common/stepper';

export default {
  title: 'Components/StepperComponent',
  component: StepperComponent
} as Meta;

const Template: Story<IStepperComponentProps> = args => {
  const [currentStepperStep, setCurrentStepperStep] = useState(
    args.currentStepperStep
  );

  return (
    <StepperComponent
      {...args}
      currentStepperStep={currentStepperStep}
      setCurrentStepperStep={setCurrentStepperStep}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  currentStepperStep: 0,
  completedSteps: new Set(),
  rejectedSteps: new Set(),
  renderStepperComponent: (identifier: string) => <div>{identifier}</div>,
  handleStepperNext: () => {},
  handleStepperBack: () => {},
  isEmailVerified: true,
  handleSubmit: () => {},
  filteredSteps: [
    { name: 'Step 1', identifier: kycScreenIdentifierNames.PERSONAL_DETAILS },
    { name: 'Step 2', identifier: kycScreenIdentifierNames.COMPANY_DETAILS },
    { name: 'Step 3', identifier: kycScreenIdentifierNames.ATTACHMENT }
  ],
  country: countries.USA
};

export const WithCompletedSteps = Template.bind({});
WithCompletedSteps.args = {
  ...Default.args,
  currentStepperStep: 1,
  completedSteps: new Set([0])
};

export const WithRejectedSteps = Template.bind({});
WithRejectedSteps.args = {
  ...Default.args,
  currentStepperStep: 1,
  rejectedSteps: new Set([0])
};
