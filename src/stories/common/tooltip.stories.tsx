import React from 'react';
import { Story, Meta } from '@storybook/react';
import Tooltip, { ITooltip } from '@/components/v2/common/tooltip';

// This is the metadata for your story
export default {
  title: 'Components/Tooltip',
  component: Tooltip
} as Meta;

// This is the template for your story
const Template: Story<ITooltip> = args => <Tooltip {...args} />;

// This is the default story
export const Default = Template.bind({});
Default.args = {
  tooltipTrigger: <button>Hover me</button>,
  tooltipContent: 'Tooltip content'
};

// Additional stories can be added to simulate different scenarios
export const CustomPosition = Template.bind({});
CustomPosition.args = {
  ...Default.args,
  tooltipContentSide: 'right' // Customize tooltip position
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  ...Default.args,
  tooltipContentStyles: 'custom-tooltip-styles' // Add custom styles to tooltip content
};
