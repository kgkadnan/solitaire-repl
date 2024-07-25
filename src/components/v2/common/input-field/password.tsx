import React, { useRef, useState, useEffect } from 'react';
import { IInputFieldProps } from './interface';
import { Input } from '../../ui/input';
import { MINIMUM_CHAR_PASSWORD } from '@/constants/error-messages/change-password';

// Inline SVGs or use a component approach
const EyeSlash = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Your EyeSlash SVG content here */}
    <path d="M12 2C6.48 2 1.73 5.61.29 11c1.44 5.39 6.19 9 11.71 9 5.52 0 10.27-3.61 11.71-9C22.27 5.61 17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
  </svg>
);

const Eye = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Your Eye SVG content here */}
    <path d="M12 2C6.48 2 1.73 5.61.29 11c1.44 5.39 6.19 9 11.71 9 5.52 0 10.27-3.61 11.71-9C22.27 5.61 17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
  </svg>
);

const PasswordSuccess = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Your PasswordSuccess SVG content here */}
    <path d="M12 2C6.48 2 1.73 5.61.29 11c1.44 5.39 6.19 9 11.71 9 5.52 0 10.27-3.61 11.71-9C22.27 5.61 17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
  </svg>
);

const PasswordFail = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Your PasswordFail SVG content here */}
    <path d="M12 2C6.48 2 1.73 5.61.29 11c1.44 5.39 6.19 9 11.71 9 5.52 0 10.27-3.61 11.71-9C22.27 5.61 17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
  </svg>
);

const PasswordDefault = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Your PasswordDefault SVG content here */}
    <path d="M12 2C6.48 2 1.73 5.61.29 11c1.44 5.39 6.19 9 11.71 9 5.52 0 10.27-3.61 11.71-9C22.27 5.61 17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
  </svg>
);

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
