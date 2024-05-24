import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import '../components/carat-tile.module.scss'; // Ensure this path is correct for your styles
import CaratTile, { ICaratTileProps } from '@/components/v2/common/carat-tile';

export default {
  title: 'Components/CaratTile',
  component: CaratTile
} as Meta;

const caratTileData = ['1.0', '1.5', '2.0', '2.5', '3.0'];

const Template: Story<ICaratTileProps> = args => {
  const [selectedcaratTile, setSelectedcaratTile] = useState<string[]>([]);

  const handlecaratTileClick = ({
    data,
    selectedcaratTile,
    setSelectedcaratTile
  }: {
    data: string;
    selectedcaratTile: string[];
    setSelectedcaratTile: React.Dispatch<React.SetStateAction<string[]>>;
  }) => {
    const newSelectedTiles = selectedcaratTile.includes(data)
      ? selectedcaratTile.filter(item => item !== data)
      : [...selectedcaratTile, data];
    setSelectedcaratTile(newSelectedTiles);
    action('CaratTile clicked')({ data, newSelectedTiles });
  };

  return (
    <CaratTile
      {...args}
      selectedcaratTile={selectedcaratTile}
      setSelectedcaratTile={setSelectedcaratTile}
      handlecaratTileClick={handlecaratTileClick}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  caratTileData
};

export const SomeTilesSelected = Template.bind({});
SomeTilesSelected.args = {
  caratTileData,
  selectedcaratTile: ['1.0', '2.5'],
  setSelectedcaratTile: action('setSelectedcaratTile'),
  handlecaratTileClick: action('handlecaratTileClick')
};

export const AllTilesSelected = Template.bind({});
AllTilesSelected.args = {
  caratTileData,
  selectedcaratTile: ['1.0', '1.5', '2.0', '2.5', '3.0'],
  setSelectedcaratTile: action('setSelectedcaratTile'),
  handlecaratTileClick: action('handlecaratTileClick')
};
