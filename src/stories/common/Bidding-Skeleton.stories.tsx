import React from 'react';
import { Meta, Story } from '@storybook/react';
import BiddingSkeleton from '@/components/v2/skeleton/bidding';

export default {
  title: 'Modules/NewArrival/BiddingSkeleton',
  component: BiddingSkeleton
} as Meta;

const Template: Story = args => <BiddingSkeleton {...args} />;

export const Default = Template.bind({});
Default.args = {};
