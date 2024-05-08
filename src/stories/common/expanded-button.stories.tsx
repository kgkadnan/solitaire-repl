// IndividualActionButton.stories.tsx

import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  IButtonProps,
  IndividualActionButton
} from '@/components/v2/common/action-button/individual-button';

export default {
  title: 'Components/IndividualActionButton',
  component: IndividualActionButton
} as Meta;

const Template: Story<IButtonProps> = args => (
  <IndividualActionButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Default Button'
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  variant: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary Button',
  variant: 'secondary'
};

export const Destructive = Template.bind({});
Destructive.args = {
  children: 'Destructive Button',
  variant: 'destructive'
};

export const Link = Template.bind({});
Link.args = {
  children: 'Link Button',
  variant: 'link'
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Button',
  size: 'sm'
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Button',
  size: 'lg'
};

export const Icon = Template.bind({});
Icon.args = {
  children: 'Icon Button',
  size: 'icon'
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  children: 'Custom Size Button',
  size: 'custom'
};
