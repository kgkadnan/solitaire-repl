'use client';
import React from 'react';
import { MinMaxInput } from '.';

export const MinMaxExample = () => {
  return (
    <MinMaxInput
      inputGap="gap-[20px]"
      errorText="Please enter both “From” & “To”"
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
