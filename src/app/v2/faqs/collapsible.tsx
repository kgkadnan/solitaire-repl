'use client';
import React, { useState } from 'react';
import { Collapse } from '@mui/material';
import ArrowDown from '@public/v2/assets/icons/arrow-down.svg?url';
import ArrowRight from '@public/v2/assets/icons/arrow-right.svg?url';

const Collapsible = ({ title, children }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className=" border-b-[2px] border-[#E4E7EC] p-[22px]">
      <div
        className="flex items-center cursor-pointer justify-between"
        onClick={handleToggle}
      >
        <div className="text-lRegular text-neutral700">{title}</div>
        {isExpanded ? <ArrowDown /> : <ArrowRight />}
      </div>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <p className="text-neutral600 text-mRegular mt-5"> {children}</p>
      </Collapse>
    </div>
  );
};

export default Collapsible;
