import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Pill from '@/components/v2/common/search-breadcrum/pill';

export default {
  title: 'Components/Pill',
  component: Pill
} as Meta;

const Template: Story<any> = args => <Pill {...args} />;

export const Default = Template.bind({});
Default.args = {
  isActive: false,
  label: 'Sample Label',
  handlePillClick: action('handlePillClick'),
  handlePillEdit: action('handlePillEdit'),
  handlePillDelete: action('handlePillDelete')
};

export const Active = Template.bind({});
Active.args = {
  isActive: true,
  label: 'Active Label',
  handlePillClick: action('handlePillClick'),
  handlePillEdit: action('handlePillEdit'),
  handlePillDelete: action('handlePillDelete')
};

export const LongLabel = Template.bind({});
LongLabel.args = {
  isActive: false,
  label:
    'This is a very long label that exceeds the character limit for the pill component',
  handlePillClick: action('handlePillClick'),
  handlePillEdit: action('handlePillEdit'),
  handlePillDelete: action('handlePillDelete')
};
