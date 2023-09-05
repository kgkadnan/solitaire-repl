import { Meta, StoryObj } from '@storybook/react';
import { CustomToast } from '.';
import Error from '@public/assets/icons/error.svg?url';

const meta = {
  title: 'components/CustomToast',
  component: CustomToast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToastWithMessage: Story = {
  args: {
    message: 'test',
  },
};

export const ToastWithMessageAndIcon: Story = {
  args: {
    message: 'test',
    icon: Error,
  },
};
