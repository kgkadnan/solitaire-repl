'use client';
import React, { useState } from 'react';
import { Typography, IconButton, Collapse } from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';

const Collapsible = ({ title, children }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className="flex items-center cursor-pointer" onClick={handleToggle}>
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography> */}
        <div>{title}</div>
        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </div>
  );
};

export default Collapsible;
