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
    <div className={`text-left w-full gap-1   h-[63px] ${styles?.inputMain}`}>
      {label && <p className="text-mRegular text-neutral900">{label}</p>}
      <div className="flex relative items-center">
        <Input
          ref={inputRef}
          style={{ boxShadow: 'var(--input-shadow) inset' }}
          className={`h-[40px] focus:outline-none focus:border-[3px] focus:border-[#CFD1D4] focus-visible:border-[#CFD1D4] hover:border-neutral900 bg-neutral25 text-neutral900 border-[1px] w-full p-2 rounded-[4px] ${
            disabled &&
            'cursor-not-allowed bg-neutral-100 text-neutral-400 hover:border-neutral-200'
          } ${
            errorText
              ? 'border-dangerMain hover:border-dangerMain focus:border-dangerMain focus-visible:border-dangerMain'
              : 'border-neutral200'
          } ${styles?.input} `}
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
