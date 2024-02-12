import React, { useRef, useState, useEffect } from 'react';
import { Input } from '@components/ui/input';
import { IInputFieldProps } from './interface';
import EyeSlash from '@public/v2/assets/icons/eye-slash.svg?url';
import Eye from '@public/v2/assets/icons/eye.svg?url';
import PasswordSuccess from '@public/v2/assets/icons/password/password-success.svg?url';
import PasswordFail from '@public/v2/assets/icons/password/password-fail.svg?url';
import PasswordDefault from '@public/v2/assets/icons/password/password-default.svg?url'; // Default check icon, replace with your icon

type IPasswordInputProps = Omit<IInputFieldProps, 'type'>;
interface IPasswordProps extends IPasswordInputProps {
  isConfirmPassword?: boolean;
}
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
  onKeyDown,
  isConfirmPassword
}: IPasswordProps) => {
  const inputRef = useRef<any>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordRules, setPasswordRules] = useState<{
    'Must be at least 8 characters': boolean | null;
    'Use minimum 1 Number (0-9)': boolean | null;
    'Use minimum 1 uppercase letter': boolean | null;
    'Use minimum 1 lowercase letter': boolean | null;
  }>({
    'Must be at least 8 characters': null,
    'Use minimum 1 Number (0-9)': null,
    'Use minimum 1 uppercase letter': null,
    'Use minimum 1 lowercase letter': null
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  function disableWheel(e: any) {
    e.preventDefault();
  }

  useEffect(() => {
    const validatePassword = (password: string) => {
      setPasswordRules({
        'Must be at least 8 characters':
          password.length >= 8 ? true : password.length > 0 ? false : null,
        'Use minimum 1 Number (0-9)': /\d/.test(password)
          ? true
          : password.length > 0
          ? false
          : null,
        'Use minimum 1 uppercase letter': /[A-Z]/.test(password)
          ? true
          : password.length > 0
          ? false
          : null,
        'Use minimum 1 lowercase letter': /[a-z]/.test(password)
          ? true
          : password.length > 0
          ? false
          : null
      });
    };

    validatePassword(value.toString());
  }, [value]);

  const renderIcon = (isValid: boolean | null) => {
    if (isValid === null) {
      return <PasswordDefault />; // Default icon when rule is unchecked
    }
    return isValid ? <PasswordSuccess /> : <PasswordFail />;
  };

  return (
    <div className={`text-left w-full gap-1 ${styles?.inputMain}`}>
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
          className="absolute right-2 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? <EyeSlash /> : <Eye />}
        </div>
      </div>
      <div className="mt-2">
        {!isConfirmPassword ? (
          Object.entries(passwordRules).map(([rule, isValid]) => (
            <div key={rule} className="flex items-center">
              {renderIcon(isValid)}
              <span className={`text-neutral-900 ml-1`}>{rule}</span>
            </div>
          ))
        ) : (
          <p className="text-dangerMain h-1">{errorText && errorText}</p>
        )}
      </div>
    </div>
  );
};
