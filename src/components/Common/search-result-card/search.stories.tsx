import React from 'react'
import CustomSearchResultCard from '.'
import Edit from "../../../../public/assets/icons/edit.png";
import ImageTileExample from '../image-tile/example';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'CustomSearchResultCard',
  component: CustomSearchResultCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof CustomSearchResultCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const cardData = {
  cardId:"1",
          cardIcon: Edit,
          cardhandleIcon:Edit,
          cardHeader:<h1>Header</h1>,
          // cardDescription:<p>desc</p>,
          cardContent:<ImageTileExample/>, 
        }

export const DefaultCustomSearchResultCard: Story = {

  args: {
    cardData: cardData,
  },
};

export const VariationCustomSearchResultCard: Story = {

  args: {
    cardData: cardData,
    defaultCardPosition:false

  },
};
