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
        style={{ boxShadow: '1px 2px 2px 0px var(--input-shadow) inset' }}
        className={`focus:outline-none bg-neutral25 text-neutral500 ${styles?.input}`}
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
