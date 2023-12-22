'use client';

import OtpInput from '@/components/common/otp-verification';
import { useState } from 'react';

export default function Home() {
  // const logger = getLogger('home');
  // logger.error('a error message from _app');
  // logger.debug('a debug message from _app');
  const [otpValues, setOtpValues] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    ''
  ]);
  const correctOtp = '123456'; // Example correct OTP. In a real application, this should be dynamically obtained.

  const verifyOtp = () => {
    const enteredOtp = otpValues.join('');
    if (enteredOtp === correctOtp) {
      alert('OTP Verified Successfully!');
      // Additional logic for successful verification
    } else {
      alert('Incorrect OTP. Please try again.');
      // Additional logic for failed verification
    }
  };

  return (
    <>
      <h1
        style={{
          fontSize: '100px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '180px'
        }}
      >
        Welcome to KGK live 2.O
      </h1>
      <h1
        style={{
          fontSize: '30px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        Building Digital Diamond Platform
      </h1>
      <OtpInput setOtpValues={setOtpValues} otpValues={otpValues} />
      <button onClick={verifyOtp} className="verify-button">
        Verify
      </button>
    </>
  );
}
