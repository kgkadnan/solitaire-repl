import React from 'react';
import { Input } from '@components/ui/input';
import { IInputFieldProps } from './interface';

export const InputField = ({
  styles,
  type,
  value,
  name,
  onChange,
  placeholder,
  disabled,
  onBlur,
  maxLength,
  onFocus,
  onKeyDown
}: IInputFieldProps) => {
  return (
    <div className={`${styles?.inputMain}`}>
      <Input
        style={{ boxShadow: '1px 2px 2px 0px rgba(16, 24, 40, 0.12) inset' }}
        className={`focus:outline-none bg-[#FFF] text-[#667085] ${styles?.input}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onBlur={onBlur}
        maxLength={maxLength}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
