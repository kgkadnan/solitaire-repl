import React from 'react';
import { Story, Meta } from '@storybook/react';
import Tile, { ITileProps } from '@/components/v2/common/tile';

// This is the metadata for your story
export default {
  title: 'Components/Tile',
  component: Tile
} as Meta;

// This is the template for your story
const Template: Story<ITileProps> = args => <Tile {...args} />;

// This is the default story
export const Default = Template.bind({});
Default.args = {
  tileData: ['Tile 1', 'Tile 2', 'Tile 3'], // Example tile data
  handleTileClick: (data: any) => {
    console.log('Clicked tile:', data);
  },
  selectedTile: [] // No tiles selected initially
};

// Additional stories can be added to simulate different scenarios
export const WithTooltip = Template.bind({});
WithTooltip.args = {
  ...Default.args,
  tileData: [
    { title: 'Title 1', short_name: 'T1' },
    { title: 'Title 2', short_name: 'T2' },
    { title: 'Title 3', short_name: 'T3' }
  ]
};
