import React, { ReactNode, useRef } from 'react';
import styles from './custom-input-radio.module.scss';

export const RadioButton: React.FC<any> = ({ radioMetaData }) => {
  const {
    label,
    value,
    name,
    checked,
    onChange,
    isInput,
    inputValue,
    inputName,
    handleInputChange,
    placeholder,
    inputStyle
  } = radioMetaData;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleRadioChange = () => {
    onChange(value);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      handleRadioChange();
    }
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
          onChange={handleRadioChange}
        />
        {label}
        <span></span>
      </label>

      {isInput && (
        <input
          className={`${styles.Border} ${inputStyle} bg-transparent focus:outline-none text-solitaireTertiary ml-2`}
          type="text"
          name={inputName}
          value={inputValue}
          onChange={() => handleInputChange}
          onClick={handleInputClick}
          ref={inputRef}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
