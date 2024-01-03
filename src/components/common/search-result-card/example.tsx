import React from 'react';
import CustomSearchResultCard from '.';
import Edit from '@public/assets/icons/edit.svg';
import ImageTileExample from '../image-tile/example';

const SearchResultCardExample = () => {
  const cardData = {
    id: '1',
    cardIcon: Edit,
    cardhandleIcon: Edit,
    cardHeader: <p style={{ color: 'hsl(var(--solitaire-error))' }}>header</p>,
    cardDescription: <p>desc</p>,
    cardContent: <ImageTileExample />
  };
  return (
    <CustomSearchResultCard cardData={cardData} defaultCardPosition={false} />
  );
};

export default SearchResultCardExample;
