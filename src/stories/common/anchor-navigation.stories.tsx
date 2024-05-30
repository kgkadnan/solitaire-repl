// AnchorLinkNavigation.stories.tsx

import React from 'react';
import { Meta, Story } from '@storybook/react';
import AnchorLinkNavigation, {
  IAnchorLinkNavigation
} from '@/components/v2/common/anchor-tag-navigation';

export default {
  title: 'Components/AnchorLinkNavigation',
  component: AnchorLinkNavigation
} as Meta;

const Template: Story<IAnchorLinkNavigation> = args => (
  <AnchorLinkNavigation {...args} />
);

export const Default = Template.bind({});
Default.args = {
  anchorNavigations: ['Home', 'About', 'Services', 'Contact']
};

export const WithCustomAnchors = Template.bind({});
WithCustomAnchors.args = {
  anchorNavigations: ['Section 1', 'Section 2', 'Section 3', 'Section 4']
};

export const WithKycInProgress = Template.bind({});
WithKycInProgress.args = {
  anchorNavigations: ['Section 1', 'Section 2', 'Section 3', 'Section 4']
};

export const WithKycRejected = Template.bind({});
WithKycRejected.args = {
  anchorNavigations: ['Section 1', 'Section 2', 'Section 3', 'Section 4']
};
