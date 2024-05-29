import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import styles from '@/components/radio-button/input-radio.module.scss'; // Adjust the import path as needed
import { RadioButton } from '@/components/v2/common/radio';

export default {
  title: 'Components/RadioButton',
  component: RadioButton
} as Meta;

const Template: Story<any> = args => <RadioButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  radioMetaData: {
    label: 'Radio Button',
    value: 'radio1',
    name: 'radioGroup',
    checked: false,
    inputs: [
      {
        id: 'input1',
        onInputChange: action('onInputChange1'),
        type: 'text',
        name: 'input1',
        value: '',
        error: '',
        placeholder: 'Input 1'
      },
      {
        id: 'input2',
        onInputChange: action('onInputChange2'),
        type: 'text',
        name: 'input2',
        value: '',
        error: '',
        placeholder: 'Input 2'
      }
    ],
    inputCustomStyle: ''
  },
  onChange: action('onChange'),
  onError: false
  //   customStyle: styles
};

export const WithError = Template.bind({});
WithError.args = {
  radioMetaData: {
    label: 'Radio Button with Error',
    value: 'radio2',
    name: 'radioGroup',
    checked: true,
    inputs: [
      {
        id: 'input1',
        onInputChange: action('onInputChange1'),
        type: 'text',
        name: 'input1',
        value: '',
        error: 'Error message',
        placeholder: 'Input 1'
      },
      {
        id: 'input2',
        onInputChange: action('onInputChange2'),
        type: 'text',
        name: 'input2',
        value: '',
        error: '',
        placeholder: 'Input 2'
      }
    ],
    inputCustomStyle: ''
  },
  onChange: action('onChange'),
  onError: true
  //   customStyle: styles
};
