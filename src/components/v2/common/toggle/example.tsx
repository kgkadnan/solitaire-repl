'use client';
import React, { useState } from 'react';
import SwitchSelector from 'react-switch-selector';

export const FormToggle = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (nextChecked: boolean) => {
    console.log('handleChange called with', nextChecked);
    setChecked(nextChecked);
  };

  const options = [
    {
      label: 'White',
      value: 'White'
    },
    {
      label: 'Fancy',
      value: 'Fancy'
    }
  ];

  return (
    <div className="w-[120px] h-[30px]">
      <SwitchSelector
        onChange={handleChange}
        options={options}
        backgroundColor={'var(--neutral-0)'}
        fontColor={'var(--neutral-900)'}
        fontSize="10"
        selectedFontColor={'var(--neutral-25)'}
        selectedBackgroundColor={'var(--primary-main)'}
        border={'1px solid var(--neutral-200)'}
        wrapperBorderRadius={'8px'}
        optionBorderRadius={'8px'}
      />
    </div>
  );
};
