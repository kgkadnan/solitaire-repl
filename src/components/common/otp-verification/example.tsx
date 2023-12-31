import React, { useState } from 'react';
import OtpInput from '.';

const OtpInputExample = () => {
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
      <OtpInput setOtpValues={setOtpValues} otpValues={otpValues} />
      <button onClick={verifyOtp} className="verify-button">
        Verify
      </button>
    </>
  );
};

export default OtpInputExample;
