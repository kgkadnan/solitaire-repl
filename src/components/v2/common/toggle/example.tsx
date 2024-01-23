'use client';
import React, { useState } from 'react';
import { Tabs } from '.';

export const FormToggle = () => {
  const [colorToggle, setColorToggle] = useState<string>('white');

  const handleChange = (nextChecked: string) => {
    setColorToggle(nextChecked);
  };

  const options = [
    {
      label: 'White',
      value: 'white'
    },
    {
      label: 'Fancy',
      value: 'fancy'
    }
  ];

  return (
    <>
      <div className="w-[120px] h-[30px]">
        <Tabs
          onChange={handleChange}
          options={options}
          backgroundColor={'var(--neutral-0)'}
          fontColor={'var(--neutral-900)'}
          fontSize="10"
          selectedFontColor={'var(--neutral-25)'}
          selectedBackgroundColor={'var(--primary-main)'}
          border={'1px solid var(--neutral-200)'}
          wrapperBorderRadius={'8px'}
          optionBorderRadius={
            colorToggle === 'white' ? '8px 0px 0px 8px' : '0px 8px 8px 0px'
          }
        />
      </div>

      {colorToggle === 'white' ? 'white' : 'fancy'}
    </>
  );
};
