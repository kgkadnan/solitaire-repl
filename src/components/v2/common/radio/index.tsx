import React, { useRef } from 'react';
import styles from './input-radio.module.scss';
import { InputField } from '../input-field';

export const RadioButton: React.FC<any> = ({
  radioMetaData,
  onChange,
  onError,
  customStyle
}) => {
  const { label, value, name, checked, inputs, inputCustomStyle, disabled } =
    radioMetaData;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleRadioChange = () => {
    onChange(value);
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
          checked={checked}
          onClick={handleRadioChange}
          disabled={disabled}
        />
        <div className={`${onError && 'text-dangerMain'}`}>{label}</div>
        <span
          style={{ border: onError && '1px solid var(--danger-main)' }}
        ></span>
      </label>

      <div className={`absolute top-[100%] ${inputCustomStyle}`}>
        {checked &&
          inputs &&
          inputs.map((input: any, index: number) => (
            <InputField
              key={input.id}
              onChange={input.onInputChange}
              type={input.type}
              name={input.name}
              value={input.value}
              errorText={input.error}
              placeholder={input.placeholder}
              styles={{
                inputMain: `h-64px !w-[380px] ${index > 0 && 'mt-[14px]'} ${
                  input.error?.length && 'mb-[22px]'
                }`,
                input: `${
                  input.error ? 'border-dangerMain' : 'border-neutral200'
                }`
              }}
            />
          ))}
      </div>
    </div>
  );
};
