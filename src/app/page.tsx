'use client';

import OTPInput from '@/components/common/otp-verification';
import { useState } from 'react';

export default function Home() {
  // const logger = getLogger('home');
  // logger.error('a error message from _app');
  // logger.debug('a debug message from _app');
  // logger.info('a info message from _app');
  const [otp, setOtp] = useState('');
  const [clearInput, setClearInput] = useState(false);

  const handleOTPChange = (otpValue: string) => {
    setOtp(otpValue);
  };

  const handleVerifyClick = async () => {
    // Simulate an asynchronous OTP verification
    const isValid = await verifyOTP(otp);
    if (isValid) {
      console.log('OTP is correct');
      // Close the modal and proceed with the workflow for a correct OTP
    } else {
      console.error('OTP is incorrect');
      // If the OTP is incorrect, reset the OTPInput fields
      setClearInput(true);
      setTimeout(() => setClearInput(false), 0); // Allow for re-entry
    }
  };

  const verifyOTP = async (otpValue: string) => {
    // Simulated verification logic
    // Replace this with your actual API call
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate an API call delay
    return otpValue === '123456';
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
      <div className="flex flex-col items-center justify-center p-6">
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Enter OTP
          </label>
          <OTPInput
            length={6}
            onChange={handleOTPChange}
            clear={clearInput}
            autoFocus
            inputClassName="w-12 h-12 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="button"
          onClick={handleVerifyClick}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Verify OTP
        </button>
      </div>
    </>
  );
}
