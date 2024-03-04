import React, { useState } from 'react';
import styles from './input-radio.module.scss';
import { InputField } from '../input-field';

const RadioButtonWithInput = ({
  name,
  label,
  value,
  requiresInput,
  selectedOption,
  onSelect,
  onInputValueChange,
  customStyle,
  placeholder,
  inputName,
  formKey
}: any) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: any) => {
    onInputValueChange(value, e.target.value, formKey);
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-[10px] relative">
      <label
        htmlFor={value}
        className={`${styles.radio} ${customStyle?.radio}`}
      >
        <input
          type="radio"
          id={value}
          name={name}
          value={value}
          checked={selectedOption === value}
          onClick={() => onSelect(value, formKey)}
        />
        <div>{label}</div>
        <span></span>
      </label>

      <div className="absolute top-[100%]">
        {requiresInput && selectedOption === value && (
          <InputField
            onChange={e => handleInputChange(e)}
            type="text"
            name={inputName}
            value={inputValue}
            placeholder={placeholder}
            styles={{
              inputMain: `h-64px !w-[380px]`
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RadioButtonWithInput;
