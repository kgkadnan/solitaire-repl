import React, {
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent
} from 'react';
import styles from './otp.module.scss';
import { Events } from '@/constants/enums/event';

interface IOtpInput {
  setOtpValues: React.Dispatch<React.SetStateAction<string[]>>;
  otpValues: string[];
  error?: string;
  setError?: any;
}

const OtpInput: React.FC<IOtpInput> = ({
  setOtpValues,
  otpValues,
  error,
  setError
}) => {
  const otpFieldsRef = useRef<HTMLInputElement[]>([]);

  const handleInput = (index: number, value: string) => {
    setError && setError('');
    if (value.length > 1) {
      return;
    }
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value.length === 1 && index < otpValues.length - 1) {
      otpFieldsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (index: number) => {
    setError && setError('');
    if (otpValues[index] !== '') {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = '';
      setOtpValues(newOtpValues);
    } else if (index > 0) {
      otpFieldsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    setError &&  setError('');
    const pasteData = event.clipboardData
      .getData('text')
      .trim()
      .split('')
      .filter((_, idx) => idx < otpValues.length);
    if (pasteData.length === otpValues.length) {
      setOtpValues(pasteData);
      otpFieldsRef.current[pasteData.length - 1].focus();
    }
  };

  return (
    <div className="flex text-center flex-col">
      <div className={styles.otpContainer}>
        {otpValues.map((value, index) => (
          <input
            key={index}
            type="number"
            maxLength={1}
            className={`${
              error ? 'border-dangerMain' : 'border-neutral200'
            } border-[1px] ${styles.otpInput}`}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInput(index, e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === Events.BACKSPACPE) {
                handleBackspace(index);
              }
            }}
            onPaste={handlePaste}
            ref={el => {
              otpFieldsRef.current[index] = el as HTMLInputElement;
            }}
          />
        ))}
      </div>
      <p className="text-dangerMain">{error}</p>
    </div>
  );
};

export default OtpInput;
