import React from 'react';
import Cta from '.';
import bookmarkAdd from '@public/v2/assets/icons/bookmark-add-01.svg';
import searchIcon from '@public/v2/assets/icons/searchIcon.svg';

interface ICtaDataItem {
  variant: 'secondary' | 'primary' | 'disable';
  svg: string; // Assuming the type of 'svg' is string, update it accordingly
  label: string;
  isDisable?: boolean;
}

const ExampleCTA = () => {
  let ctaData: ICtaDataItem[] = [
    { variant: 'secondary', svg: bookmarkAdd, label: 'Save Search' },
    { variant: 'primary', svg: searchIcon, label: 'Search' },
    {
      variant: 'disable',
      svg: bookmarkAdd,
      label: 'Save Search',
      isDisable: true
    }
  ];
  return (
    <div>
      <Cta ctaData={ctaData} />
    </div>
  );
};

export default ExampleCTA;
