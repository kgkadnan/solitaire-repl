import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import CaratTile, { ICaratTileProps } from '@/components/v2/common/carat-tile';

// This is the metadata for your story
export default {
  title: 'Components/CaratTile',
  component: CaratTile
} as Meta;

// This is the template for your story
const Template: Story<ICaratTileProps> = args => {
  // We'll use useState to simulate the state changes
  const [selectedcaratTile, setSelectedcaratTile] = useState<string[]>([]);

  return (
    <CaratTile
      {...args}
      selectedcaratTile={selectedcaratTile}
      setSelectedcaratTile={setSelectedcaratTile}
    />
  );
};

// This is the default story
export const Default = Template.bind({});
Default.args = {
  caratTileData: ['Option 1', 'Option 2', 'Option 3'],
  handlecaratTileClick: (data: any) => {
    console.log('Clicked on:', data);
  }
};

// Additional stories can be added to simulate different scenarios or actions
export const WithSelectedOption = Template.bind({});
WithSelectedOption.args = {
  ...Default.args,
  selectedcaratTile: ['Option 2'] // Simulating one option already selected
};

export const WithNoOptions = Template.bind({});
WithNoOptions.args = {
  ...Default.args,
  caratTileData: [] // Simulating no options available
};

export const WithLongList = Template.bind({});
WithLongList.args = {
  ...Default.args,
  caratTileData: Array.from({ length: 10 }, (_, i) => `Option ${i + 1}`) // Simulating a long list of options
};
