'use client';
import React from 'react';
import { CustomCheckBox } from '.';

export const Example = () => {
  const data = { id: '1' };

  const handleClick = (id: string) => {
    console.log('id', id);
  };
  return (
    <div>{/* <CustomCheckBox data={data.id} onClick={handleClick} /> */}</div>
  );
};
