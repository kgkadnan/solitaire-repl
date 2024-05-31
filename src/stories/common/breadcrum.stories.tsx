import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Breadcrum from '@/components/v2/common/search-breadcrum/breadcrum';

export default {
  title: 'Components/Breadcrum',
  component: Breadcrum
} as Meta;

const Template: Story<any> = args => {
  const [activeTab, setActiveTab] = useState(1);
  const [_isLoading, setIsLoading] = useState(false);

  return (
    <Breadcrum
      {...args}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      setIsLoading={setIsLoading}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  searchParameters: [
    { saveSearchName: 'Search 1' },
    { saveSearchName: 'Search 2' },
    { saveSearchName: '' }
  ],
  handleCloseSpecificTab: action('handleCloseSpecificTab')
};
