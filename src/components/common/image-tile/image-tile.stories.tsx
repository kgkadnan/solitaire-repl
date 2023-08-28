'use client';
import CustomImageTile, { IImageTileProps } from '.';
import Round from '@public/assets/images/round.png';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/CustomImageTile',
  component: CustomImageTile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomImageTile>;

export default meta;
type Story = StoryObj<typeof meta>;

const imageData: IImageTileProps[] = [
  {
    src: Round,
    title: 'Round',
  },
  {
    src: Round,
    title: 'Pear',
  },
  {
    src: Round,
    title: 'Emerald',
  },
];

export const ImageTile: Story = {
  args: {
    imageTileData: imageData,
    selectedTile: ['Pear'],
    handleSelectTile: () => {},
  },
};
