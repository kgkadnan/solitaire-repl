import React from 'react';
import './CustomSwitch.css';

const CustomSwitch = ({
  isOn,
  handleToggle,
  onLabel = 'On',
  offLabel = 'Off'
}: any) => {
  return (
    <div
      className={`custom-switch ${isOn ? 'on' : ''}`}
      onClick={handleToggle}
      role="checkbox"
      aria-checked={isOn}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') handleToggle();
      }}
    >
      <div className="custom-switch-thumb" />
      <span
        style={{ position: 'absolute', left: '60px', fontSize: '14px' }}
      ></span>
    </div>
  );
};

export default CustomSwitch;
