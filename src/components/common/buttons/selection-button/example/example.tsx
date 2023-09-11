'use client';

import React from 'react';
import { CustomSelectionButton } from '..';
import style from './example.module.scss';

const SelectionButtonExample = () => {
  const handleClick = () => {
    console.log("It'sworing");
  };

  const myStyle = {
    selectionButtonStyle: style.buttonStyle,
    selectionButtonLabelStyle: style.labelStyle,
  };

  return (
    <>
      <CustomSelectionButton
        selectionButtonAllStyles={myStyle}
        selectionButtonLabel="Button"
        handleClick={handleClick}
      />
    </>
  );
};

export default SelectionButtonExample;
