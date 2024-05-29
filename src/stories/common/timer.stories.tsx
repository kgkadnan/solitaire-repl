import React from 'react';
import { Story, Meta } from '@storybook/react';
import CountdownTimer from '@/components/v2/common/timer';

// This is the metadata for your story
export default {
  title: 'Components/CountdownTimer',
  component: CountdownTimer
} as Meta;

// This is the template for your story
const Template: Story<any> = args => <CountdownTimer {...args} />;

// This is the default story
export const Default = Template.bind({});
Default.args = {
  initialHours: 0,
  initialMinutes: 10,
  initialSeconds: 0
};

// Additional stories can be added to simulate different scenarios
export const Customized = Template.bind({});
Customized.args = {
  ...Default.args,
  customize: true // Enable customization for a larger timer display
};
