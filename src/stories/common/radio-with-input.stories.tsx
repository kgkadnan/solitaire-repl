import React from 'react';
import { Meta, Story } from '@storybook/react';
import RadioButtonWithInput from '@/components/v2/common/radio-with-input';

export default {
  title: 'Components/RadioButtonWithInput',
  component: RadioButtonWithInput
} as Meta;

const Template: Story<any> = args => <RadioButtonWithInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'example',
  label: 'Example',
  value: 'example',
  requiresInput: true,
  selectedOption: 'example',
  onSelect: (value: string) => console.log('Selected:', value),
  onInputValueChange: (value: string, input: string) =>
    console.log('Input changed:', value, input),
  placeholder: 'Input placeholder',
  inputName: 'inputExample',
  formKey: 'example',
  setState: (state: any) => console.log('State:', state),
  defaultSelected: false,
  defaultValue: '',
  onError: false,
  showError: false,
  onInputError: ''
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  ...Default.args,
  defaultSelected: true,
  defaultValue: 'Default input value'
};
