import React, { useState, useEffect, useRef } from 'react';

interface OTPInputProps {
  length: number;
  autoFocus?: boolean;
  isNumberInput?: boolean;
  disabled?: boolean;
  clear: boolean; // This is a new prop
  onChange: (otp: string) => void;

  inputClassName?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  autoFocus = false,
  isNumberInput = true,
  disabled = false,
  clear,
  onChange,

  inputClassName
}) => {
  const [otp, setOtp] = useState(Array<string>(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    const otpValue = otp.join('');
    onChange(otpValue);
  }, [otp, length, onChange]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNumberInput && !value.match(/^[0-9]$/)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      const nextSibling = document.querySelector(
        `input[name='otp-${index + 1}']`
      ) as HTMLInputElement;
      nextSibling && nextSibling.focus();
    }
  };

  useEffect(() => {
    if (clear) {
      setOtp(Array<string>(length).fill(''));
    }
  }, [clear, length]);

  const handleBackspace = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === 'Backspace') {
      if (otp[index] || index === 0) {
        // Clear the current input
        setOtp(otp.map((val, idx) => (idx === index ? '' : val)));
      } else if (index > 0) {
        // Clear the previous input and focus it
        setOtp(otp.map((val, idx) => (idx === index - 1 ? '' : val)));
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData
      .getData('text/plain')
      .slice(0, length)
      .split('');
    if (
      pastedData.length === length &&
      pastedData.every(char => (isNumberInput ? char.match(/[0-9]/) : true))
    ) {
      setOtp(pastedData);
    }
  };

  return (
    <div className={`flex space-x-2 `}>
      {otp.map((_, index) => (
        <input
          key={index}
          ref={ref => (inputsRef.current[index] = ref)} // Add refs to each input
          name={`otp-${index}`}
          value={otp[index]}
          onChange={e => handleChange(e.target, index)}
          onKeyDown={e => handleBackspace(e, index)}
          onPaste={handlePaste}
          type={isNumberInput ? 'tel' : 'text'}
          autoFocus={autoFocus && index === 0}
          disabled={disabled}
          className={`border p-2 text-center ${inputClassName}`}
          // Tailwind styling for the input fields
        />
      ))}
    </div>
  );
};

export default OTPInput;
