'use client';

import React from 'react';
import style from './example.module.scss';
import { CustomDisplayButton } from '..';
import logger from 'logging/log-util';

export const DisplayButtonExample = () => {
  const handleClick = () => {
    logger.info('click');
  };
  const classes = {
    displayButtonStyle: style?.button,
    displayLabelStyle: style?.label
  };
  return (
    <>
      <CustomDisplayButton
        displayButtonLabel="25 Stones"
        displayButtonAllStyle={classes}
        handleClick={handleClick}
      />
    </>
  );
};
