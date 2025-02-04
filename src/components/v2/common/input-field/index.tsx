import React, { useRef } from 'react';
import { IInputFieldProps } from './interface';
import { Input } from '../../ui/input';
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
  onKeyDown,
  autoComplete,
  showError = true
}: IInputFieldProps) => {
  function disableWheel(e: any) {
    e.preventDefault();
  }
  const inputRef = useRef<any>(null);

  return (
    <div className={`text-left w-full gap-1  ${styles?.inputMain}`}>
      {label && <p className="text-mRegular text-neutral900">{label}</p>}
      <div className="flex relative items-center">
        <Input
          ref={inputRef}
          style={{ boxShadow: 'var(--input-shadow) inset' }}
          className={`h-[40px] focus:outline-none focus:border-[3px] focus:border-[#CFD1D4] focus-visible:border-[#CFD1D4] hover:border-neutral900 bg-neutral25 text-neutral900 border-[1px] w-full p-2 rounded-[4px] disabled:bg-neutral-100 disabled:text-neutral-500  ${
            disabled &&
            'cursor-not-allowed bg-neutral-100 text-neutral-500 hover:border-neutral-200'
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
          title=""
          maxLength={maxLength}
          onFocus={() => {
            if (inputRef.current) {
              inputRef.current.addEventListener('wheel', disableWheel);
            }
          }}
          onKeyDown={onKeyDown}
          autoComplete={autoComplete}
        />
      </div>
      <p className="text-dangerMain h-auto pt-[4px] leading-[1.2] text-sMedium">
        {errorText && showError && errorText}
      </p>
    </div>
  );
};
