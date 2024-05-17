import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Tab, { ITabProps } from '@/components/v2/common/bid-tabs';

export default {
  title: 'Components/Tab',
  component: Tab
} as Meta;

const Template: Story<ITabProps> = args => <Tab {...args} />;

export const Default = Template.bind({});
Default.args = {
  labels: ['Bids', 'Active', 'History'],
  activeIndex: 0,
  onTabClick: action('Tab clicked'),
  activeCount: 5,
  bidCount: 10,
  historyCount: 15
};

export const ActiveTab = Template.bind({});
ActiveTab.args = {
  ...Default.args,
  activeIndex: 1
};

export const HistoryTab = Template.bind({});
HistoryTab.args = {
  ...Default.args,
  activeIndex: 2
};

export const NoCounts = Template.bind({});
NoCounts.args = {
  labels: ['Bids', 'Active', 'History'],
  activeIndex: 0,
  onTabClick: action('Tab clicked'),
  activeCount: 0,
  bidCount: 0,
  historyCount: 0
};

export const CustomLabels = Template.bind({});
CustomLabels.args = {
  labels: ['First', 'Second', 'Third'],
  activeIndex: 1,
  onTabClick: action('Tab clicked'),
  activeCount: 8,
  bidCount: 12,
  historyCount: 3
};
