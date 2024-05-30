// ActionButton.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ActionButton, {
  IActionButtonData
} from '@/components/v2/common/action-button';
import searchIcon from '@public/v2/assets/icons/data-table/search-icon.svg';

export default {
  title: 'Components/ActionButton',
  component: ActionButton,
  parameters: {
    layout: 'centered' // Centering the stories
  }
} as Meta;

const Template: Story<IActionButtonData> = args => <ActionButton {...args} />;

export const PrimaryDefaultButton: Story<IActionButtonData> = Template.bind({});
PrimaryDefaultButton.args = {
  actionButtonData: [
    {
      variant: 'primary',
      label: 'Primary Button',
      handler: action('Primary Button Clicked!')
    }
  ],
  containerStyle:
    'border-[1px] border-[black] rounded-[8px] bg-[#354545] text-[white]'
};

export const SecondaryDefaultButton: Story<IActionButtonData> = Template.bind(
  {}
);
SecondaryDefaultButton.args = {
  actionButtonData: [
    {
      variant: 'secondary',
      label: 'Secondary Button',
      handler: action('Secondary Button Clicked!')
    }
  ],
  containerStyle: 'text-[black]'
};

export const DisabledButton: Story<IActionButtonData> = Template.bind({});
DisabledButton.args = {
  actionButtonData: [
    {
      variant: 'disable',
      label: 'Disabled Button',
      isDisable: true,
      handler: action('This button is disabled!')
    }
  ]
};

export const ButtonWithIcon: Story<IActionButtonData> = Template.bind({});
ButtonWithIcon.args = {
  actionButtonData: [
    {
      variant: 'secondary',
      label: 'Secondary Button',
      svg: searchIcon,
      handler: action('Button with Icon Clicked!')
    }
  ],
  containerStyle: 'text-[black]'
};

export const GroupedButton: Story<IActionButtonData> = Template.bind({});
GroupedButton.args = {
  actionButtonData: [
    {
      variant: 'secondary',
      label: 'Primary Button',
      handler: action('Primary Button Clicked!')
    },
    {
      variant: 'secondary',
      label: 'Secondary Button',
      svg: searchIcon,
      handler: action('Secondary Button Clicked!')
    }
  ],
  containerStyle: 'text-[black]'
};

export const IconButton: Story<IActionButtonData> = Template.bind({});
IconButton.args = {
  actionButtonData: [
    {
      variant: 'secondary',
      svg: searchIcon,
      handler: action('IconButton Clicked!')
    }
  ],
  containerStyle: 'text-[black]'
};
