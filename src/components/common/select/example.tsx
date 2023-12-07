'use client';
import React from 'react';
import { CustomSelect } from '.';
import styles from './select.module.scss';

export const Example = () => {
  const data = [
    { id: 1, value: 'Dubai' },
    { id: 2, value: 'India' },
    { id: 3, value: 'Belgium' }
  ];

  const className = {
    selectcontent: styles.selectContent,
    selectTrigger: styles.selectTrigger
  };

  return (
    <>
      <CustomSelect data={data} placeholder="location" style={className} />
    </>
  );
};
