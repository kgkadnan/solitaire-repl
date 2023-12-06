import { Meta, StoryObj } from '@storybook/react';
import { CustomInputField } from '.';
import { ChangeEvent, useState } from 'react';

const meta: Meta<typeof CustomInputField> = {
  title: 'components/InputField',
  component: CustomInputField,
  argTypes: {},
  tags: ['autodocs']
} satisfies Meta<typeof CustomInputField>;

export default meta;

type Story = StoryObj<typeof CustomInputField>;

const InputWithHooks = () => {
  const [value, setValue] = useState('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <CustomInputField
      onChange={handleOnChange}
      value={value}
      type="text"
      name="name"
    />
  );
};

export const Primary: Story = {
  render: () => <InputWithHooks />
};

export const Secondary: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter Password',
    name: 'password',
    style: {
      input: 'text-solitaireQuaternary'
    }
  }
};
