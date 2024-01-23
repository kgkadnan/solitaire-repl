import React from 'react';
import SwitchSelector from 'react-switch-selector';

export const Tabs = ({ handleChange, options, ...stylingProps }: any) => {
  return (
    <SwitchSelector
      onChange={handleChange}
      options={options}
      {...stylingProps}
    />
  );
};
