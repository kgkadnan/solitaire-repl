import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SavedSearchDropDown, {
  ISavedSearchDropDownProps
} from '@/components/v2/common/saved-search-dropdown';

export default {
  title: 'Components/SavedSearchDropDown',
  component: SavedSearchDropDown
} as Meta;

const Template: Story<ISavedSearchDropDownProps> = args => (
  <SavedSearchDropDown {...args} />
);

export const Default = Template.bind({});
Default.args = {
  handleClose: action('handleClose'),
  isOpen: true,
  options: [{ name: 'Search 1' }, { name: 'Search 2' }, { name: 'Search 3' }],
  onDropDownClick: action('onDropDownClick')
};
