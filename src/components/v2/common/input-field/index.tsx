import React, { useRef } from 'react';
import { Input } from '@components/ui/input';
import { IInputFieldProps } from './interface';
export const InputField = ({
  type,
  name,
  value,
  label,
  errorText,
  styles,
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
    <div className={` text-left w-full gap-1 ${styles?.inputMain}`}>
      {label && <p className="text-mRegular text-neutral-900">{label}</p>}
      <div className="flex relative items-center">
        <Input
          ref={inputRef}
          style={{ boxShadow: 'var(--input-shadow) inset' }}
          className={`focus:outline-none bg-neutral25 text-neutral900 border-[1px] w-full p-2 rounded-[4px] ${styles?.input} ${
            errorText ? 'border-dangerMain' : 'border-neutral200'
          }`}
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
      <p className="text-dangerMain h-1">{errorText && errorText}</p>
    </div>
  );
};
