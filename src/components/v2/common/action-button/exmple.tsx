import React from 'react';
import ActionButton from '.';
import bookmarkAdd from '@public/v2/assets/icons/bookmark-add-01.svg';
import searchIcon from '@public/v2/assets/icons/searchIcon.svg';

interface IActionButtonDataItem {
  variant: 'secondary' | 'primary' | 'disable';
  svg: string; // Assuming the type of 'svg' is string, update it accordingly
  label: string;
  isDisable?: boolean;
  handler: () => void;
}

const ExampleCTA = () => {
  let actionButtonData: IActionButtonDataItem[] = [
    {
      variant: 'secondary',
      svg: bookmarkAdd,
      label: 'Save Search',
      handler: () => {}
    },
    { variant: 'primary', svg: searchIcon, label: 'Search', handler: () => {} },
    {
      variant: 'disable',
      svg: bookmarkAdd,
      label: 'Save Search',
      isDisable: true,
      handler: () => {}
    }
  ];
  return (
    <div>
      <ActionButton actionButtonData={actionButtonData} />
    </div>
  );
};

export default ExampleCTA;
