import React, { useEffect, useState } from 'react';
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
  formKey,
  setState,
  defaultSelected = false, // New prop for default radio selection
  defaultValue = '', // New prop for default input value
  onError
}: any) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Check if this radio button should be selected by default
    if (defaultSelected) {
      onSelect(value, formKey, setState);
    }
    // Set the default input value
    setInputValue(defaultValue);
  }, []);

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
          onClick={() => onSelect(value, formKey, setState)}
        />
        <div className={`${onError && 'text-dangerMain'}`}>{label}</div>
        <span
          style={{ border: onError && '1px solid var(--danger-main)' }}
        ></span>
      </label>

      <div className="absolute top-[30px]">
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
