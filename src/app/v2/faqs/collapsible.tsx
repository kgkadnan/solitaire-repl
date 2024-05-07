'use client';
import React, { useState } from 'react';
import { Collapse, ThemeProvider, createTheme } from '@mui/material';
import ArrowDown from '@public/v2/assets/icons/arrow-down.svg?url';
import ArrowRight from '@public/v2/assets/icons/arrow-right.svg?url';

const Collapsible = ({ title, children }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const theme = createTheme({
    typography: {
      fontFamily: ['inherit'].join(',')
    }
  });
  return (
    <div className="border-b-[2px] border-[#E4E7EC] px-[22px] py-[9px] ">
      <div
        className="flex items-center cursor-pointer justify-between min-h-[76px]"
        onClick={handleToggle}
      >
        <div
          className={` ${
            isExpanded
              ? 'text-neutral800 text-lMedium'
              : 'text-neutral700 text-lRegular'
          } `}
        >
          {title}
        </div>
        {isExpanded ? <ArrowDown /> : <ArrowRight />}
      </div>
      <ThemeProvider theme={theme}>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <p
            className="text-neutral600 text-mRegular"
            style={{ fontFamily: 'inherit' }}
          >
            {' '}
            {children}
          </p>
        </Collapse>
      </ThemeProvider>
    </div>
  );
};

export default Collapsible;
