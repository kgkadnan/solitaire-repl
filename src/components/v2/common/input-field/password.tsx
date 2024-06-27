import React, { useRef, useState, useEffect } from 'react';
import { IInputFieldProps } from './interface';
import EyeSlash from '@public/v2/assets/icons/eye-slash.svg?url';
import Eye from '@public/v2/assets/icons/eye.svg?url';
import PasswordSuccess from '@public/v2/assets/icons/password/password-success.svg?url';
import PasswordFail from '@public/v2/assets/icons/password/password-fail.svg?url';
import PasswordDefault from '@public/v2/assets/icons/password/password-default.svg?url'; // Default check icon, replace with your icon
import { Input } from '../../ui/input';
import { MINIMUM_CHAR_PASSWORD } from '@/constants/error-messages/change-password';

type IPasswordInputProps = Omit<IInputFieldProps, 'type'>;
interface IPasswordProps extends IPasswordInputProps {
  isConfirmPassword?: boolean;
  isFromChangePassword?: boolean;
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
  isConfirmPassword,
  isFromChangePassword = false,
  autoComplete
}: IPasswordProps) => {
  const inputRef = useRef<any>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

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
  const allRulesValid = Object.values(passwordRules).every(
    isValid => isValid === true
  );

  return (
    <div className={`text-left w-full gap-1 ${styles?.inputMain}`}>
      {label && <p className="text-mRegular text-neutral900">{label}</p>}
      <div className="flex relative items-center">
        <Input
          ref={inputRef}
          style={{ boxShadow: 'var(--input-shadow) inset' }}
          className={` h-[40px] focus:outline-none focus:border-[3px] focus:border-[#CFD1D4] focus-visible:border-[#CFD1D4] hover:border-neutral900 bg-neutral25 text-neutral900 border-[1px] w-full p-2 rounded-[4px] ${styles?.input} ${
            errorText
              ? 'border-dangerMain hover:border-dangerMain focus:border-dangerMain focus-visible:border-dangerMain'
              : 'border-neutral200'
          }`}
          type={isPasswordVisible ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={() => {
            setIsInputFocused(false);
            onBlur;
          }}
          maxLength={maxLength}
          onFocus={() => {
            if (inputRef.current) {
              inputRef.current.addEventListener('wheel', disableWheel);
            }
            setIsInputFocused(true);
          }}
          onKeyDown={onKeyDown}
          autoComplete={autoComplete}
        />
        <div
          className="absolute right-2 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? <Eye /> : <EyeSlash />}
        </div>
      </div>
      <div className="mt-1">
        {!isConfirmPassword ? (
          isInputFocused ? (
            !allRulesValid &&
            Object.entries(passwordRules).map(([rule, isValid]) => (
              <div key={rule} className="flex items-center">
                {renderIcon(isValid)}
                <span className={`text-neutral900 ml-1`}>{rule}</span>
              </div>
            ))
          ) : (
            isFromChangePassword && (
              <p className="text-dangerMain">
                {errorText !== MINIMUM_CHAR_PASSWORD && errorText}
              </p>
            )
          )
        ) : (
          <p className="text-dangerMain">
            {errorText !== MINIMUM_CHAR_PASSWORD && errorText}
          </p>
        )}
      </div>
    </div>
  );
};
