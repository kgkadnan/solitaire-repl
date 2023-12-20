import React, { KeyboardEventHandler } from 'react';
import styles from './floating-input.module.scss';

interface FloatingLabelInputProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  value: string | number;
  errorText?: string;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  onChange,
  type,
  name,
  onKeyDown,
  value,
  errorText
}) => {
  return (
    <div className="relative z-0 w-[500px]">
      <input
        type={type}
        name={name}
        className={`${
          !errorText ? styles.input : styles.errorInput
        } block py-2.5 px-0 w-full bg-transparent border-0 appearance-none focus:outline-none peer`}
        placeholder=""
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <label
        htmlFor=""
        className={`${
          !errorText ? styles.label : styles.errorLabel
        } absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-solitaireSenary-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
      >
        {label}
      </label>
      <div style={{ color: '#983131' }} className=" flex text-left h-[5px]">
        {errorText}
      </div>
    </div>
  );
};
