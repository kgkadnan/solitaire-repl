import React, { useRef } from 'react';
import styles from './custom-input-radio.module.scss';

export const RadioButton: React.FC<any> = ({
  radioMetaData,
  onChange,
  handleInputChange,
  inputValue,
  errorText
}) => {
  const {
    label,
    value,
    name,
    checked,
    isInput,
    inputName,
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
      onChange(value);
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
        <p className={`${errorText ? 'text-[red]' : ''}`}>{label}</p>
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
