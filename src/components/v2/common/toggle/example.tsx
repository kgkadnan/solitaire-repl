'use client';
import React, { useState } from 'react';
import { Toggle } from '.';
import Switch from 'react-switch';

export const FormToggle = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (nextChecked: boolean) => {
    console.log('handleChange called with', nextChecked);
    setChecked(nextChecked);
  };

  //   console.log('checked', checked);

  //   return (
  //     <Toggle
  //       checked={checked}
  //       className="h-[30px] rounded-lg"
  //       id=""
  //       onClick={handleChange}
  //     />
  //   );

  return (
    <label htmlFor="small-radius-switch">
      <span>A switch all available styling options</span>
      <Switch
        checked={checked}
        onChange={handleChange}
        offColor="#fff"
        onColor="#000"
        offHandleColor="#000"
        onHandleColor="#fff"
        handleDiameter={30}
        height={30}
        width={120}
        borderRadius={6}
        activeBoxShadow="0px 0px 1px 2px #fffc35"
        uncheckedIcon={
          <div style={{ color: 'orange', fontSize: '10px' }}>White</div>
        }
        checkedIcon={
          <div style={{ color: 'blue', fontSize: '10px' }}>White</div>
        }
        uncheckedHandleIcon={<div style={{ fontSize: '10px' }}>Fancy</div>}
        checkedHandleIcon={
          <div style={{ fontSize: '10px', color: 'red' }}>Fancy</div>
        }
        className="react-switch"
        id="custom-switch"
      />
    </label>
  );
};
