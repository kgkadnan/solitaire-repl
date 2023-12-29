'use client';

import React from 'react';
import { CustomSelectionButton } from '..';
import style from './example.module.scss';
import logger from 'logging/log-util';

const SelectionButtonExample = () => {
  const handleClick = () => {
    logger.info('click');
  };

  const myStyle = {
    selectionButtonStyle: style.buttonStyle,
    selectionButtonLabelStyle: style.labelStyle
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
