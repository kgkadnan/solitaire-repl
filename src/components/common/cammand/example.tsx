'use client';
import React from 'react';
import CustomCommand from '.';

const CustomCommandExample = () => {
  let items = [
    {
      value: 'backlog',
      label: 'Backlog',
    },
    {
      value: 'todo',
      label: 'Todo',
    },
    {
      value: 'in progress',
      label: 'In Progress',
    },
    {
      value: 'in ',
      label: 'In',
    },
  ];

  return <CustomCommand items={items} />;
};

export default CustomCommandExample;
