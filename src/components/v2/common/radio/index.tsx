import React, { useRef } from 'react';
import styles from './input-radio.module.scss';

export const RadioButton: React.FC<any> = ({
  radioMetaData,
  onChange,
  handleInputChange,
  inputValue,
  customStyle
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
      onChange(value);
      inputRef.current.focus();
    }
  };

  return (
    <div className="radio-group ">
      <label htmlFor={value} className={`${styles.radio} ${customStyle.radio}`}>
        <input
          type="radio"
          id={value}
          name={name}
          value={value}
          checked={checked}
          onChange={handleRadioChange}
        />
        <p>{label}</p>
        <span></span>
      </label>

      {isInput && (
        <input
          className={`${styles.Border} ${inputStyle} bg-transparent focus:outline-none text-solitaireTertiary ml-2`}
          type="text"
          name={inputName}
          value={inputValue}
          onChange={e => {
            handleInputChange(e);
          }}
          onClick={handleInputClick}
          ref={inputRef}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
