import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import OtpInput from '@/components/v2/common/otp';

export default {
  title: 'Components/OtpInput',
  component: OtpInput
} as Meta;

const Template: Story<any> = args => {
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState<string>('');

  return (
    <OtpInput
      {...args}
      otpValues={otpValues}
      setOtpValues={setOtpValues}
      error={error}
      setError={setError}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
