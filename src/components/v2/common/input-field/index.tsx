import React, { useRef } from 'react';
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
  onKeyDown
}: IInputFieldProps) => {
  function disableWheel(e: any) {
    e.preventDefault();
  }
  const inputRef = useRef<any>(null);
  return (
    <div className={`${styles?.inputMain}`}>
      <Input
        ref={inputRef}
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
        onFocus={() => {
          if (inputRef.current) {
            inputRef.current.addEventListener('wheel', disableWheel);
          }
        }}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
