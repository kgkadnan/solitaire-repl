'use client';
import React from 'react';
import { CustomInputlabel } from '.';
import styles from './example.module.scss';

export const Example = () => {
  //example
  const className = {
    label: styles.label
  };

  return (
    <div>
      <CustomInputlabel
        htmlfor="text"
        label="Password"
        overriddenStyles={className}
      />
    </div>
  );
};
