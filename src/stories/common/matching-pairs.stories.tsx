import React from 'react';
import { Meta, Story } from '@storybook/react';
import MatchingPair from '@/app/v2/matching-pair/page';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';

export default {
  title: 'Modules/Matching-Pairs/MatchingPair',
  component: MatchingPair,
  decorators: [
    Story => (
      <Provider store={setupStore()}>
        <Story />
      </Provider>
    )
  ]
} as Meta;

const Template: Story = args => <MatchingPair {...args} />;

export const MatchingPairStory = Template.bind({});
MatchingPairStory.args = {};
