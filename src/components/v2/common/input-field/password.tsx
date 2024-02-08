import React, { useRef, useState } from 'react';
import { Input } from '@components/ui/input';
import { IInputFieldProps } from './interface';
import EyeSlash from '@public/v2/assets/icons/eye-slash.svg?url';
import Eye from '@public/v2/assets/icons/eye.svg?url';
type IPasswordInputProps = Omit<IInputFieldProps, 'type'>;

export const PasswordField = ({
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
}: IPasswordInputProps) => {
  function disableWheel(e: any) {
    e.preventDefault();
  }
  const inputRef = useRef<any>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

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
          type={isPasswordVisible ? 'text' : 'password'}
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

        <div
          className="absolute right-2 cursor-pointer "
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? <EyeSlash /> : <Eye />}
        </div>
      </div>
      <p className="text-dangerMain">{errorText && errorText}</p>
    </div>
  );
};
