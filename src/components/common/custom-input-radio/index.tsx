import React, { ChangeEvent, ReactNode } from 'react';
import styles from './custom-input-radio.module.scss';

interface RadioButtonProps {
  radioMetaData: {
    label: string | ReactNode;
    value: string;
    checked?: boolean;
    onChange: (value: string) => void;
    name: string;
  };
}

export const RadioButton: React.FC<RadioButtonProps> = ({ radioMetaData }) => {
  const { label, value, name, checked, onChange } = radioMetaData;

  const handleInputChange = () => {
    onChange(value);
  };

  return (
    <div className="radio-group">
      <label htmlFor={value} className={styles.radio}>
        <input
          type="radio"
          id={value}
          name={name}
          value={value}
          checked={checked}
          onChange={handleInputChange}
        />
        {label}
        <span></span>
      </label>
    </div>
  );
};
