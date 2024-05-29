import React from 'react';
import { Story, Meta } from '@storybook/react';
import empty from '@public/v2/assets/icons/saved-search/empty-screen-saved-search.svg';
import EmptyScreen, {
  IEmptyScreenProps
} from '@/components/v2/common/empty-screen';

// This is the metadata for your story
export default {
  title: 'Components/EmptyScreen',
  component: EmptyScreen
} as Meta;

// This is the template for your story
const Template: Story<IEmptyScreenProps> = args => <EmptyScreen {...args} />;

// This is the default story
export const Default = Template.bind({});
Default.args = {
  message: 'No items found.',
  label: 'Retry',
  imageSrc: empty,
  onClickHandler: () => {
    console.log('Retry button clicked.');
  }
};
