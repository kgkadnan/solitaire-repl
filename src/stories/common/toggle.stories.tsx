import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Tabs } from '@/components/v2/common/toggle';

// This is the metadata for your story
export default {
  title: 'Components/ToggleTabs',
  component: Tabs
} as Meta;

// This is the template for your story
const Template: Story<any> = args => <Tabs {...args} />;

// This is the default story
export const Default = Template.bind({});
Default.args = {
  handleChange: (newValue: string) => {
    console.log('Selected tab:', newValue);
  },
  options: [
    { label: 'Tab 1', value: 'tab1' },
    { label: 'Tab 2', value: 'tab2' },
    { label: 'Tab 3', value: 'tab3' }
  ]
};
