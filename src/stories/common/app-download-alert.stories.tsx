// AppDownloadPopup.stories.tsx

import React from 'react';
import { Meta, Story } from '@storybook/react';
import AppDownloadPopup from '@/components/v2/common/alert-pop-for-mobile';

export default {
  title: 'Components/AppDownloadAlert',
  component: AppDownloadPopup
} as Meta;

const Template: Story = args => <AppDownloadPopup {...args} />;

export const MobileView: Story = Template.bind({});
MobileView.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
};
