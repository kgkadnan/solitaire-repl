'use client';
import React from 'react';
import styles from './input-field.module.scss';
import { Input } from '@components/ui/input';
import { InputFieldProps } from './interface';

export const CustomInputField: React.FC<InputFieldProps> = ({
  style,
  type,
  value,
  name,
  onChange,
  dataTestId = 'custom-input',
  placeholder,
  disable,
  onBlur,
  maxLength,
  onFocus,
  onKeyDown
}) => {
  return (
    <div className={`${style?.inputMain}`}>
      <Input
        data-testid={`${dataTestId}`}
        className={`${styles.defaultInputStyle} ${style?.input}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disable}
        onBlur={onBlur}
        maxLength={maxLength}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
