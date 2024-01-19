import React from 'react';
import { MinMaxInput } from '.';

export const MinMaxExample = () => {
  return (
    <MinMaxInput
      inputGap="gap-[20px]"
      errorText="Please enter both “Min” & “Max”"
      minInputData={{
        minPlaceHolder: '0',
        minOnchange: () => '',
        minValue: ''
      }}
      maxInputData={{
        maxPlaceHolder: '100',
        maxOnchange: () => '',
        maxValue: ''
      }}
    />
  );
};
