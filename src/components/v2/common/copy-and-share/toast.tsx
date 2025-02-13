import { kycStatus } from '@/constants/enums/kyc';
import React from 'react';

export const Toast = ({ message, show, isSuccess = true }: any) => {
  // Dismiss the toast after 3 seconds

  if (!show) return null;

  return (
    <div
      className={`fixed w-[320px] right-[16px]  border-[1px]  rounded-[8px] shadow-md text-mMedium medium p-4 text-neutral900 transition-all duration-500 transform z-[1000] ${
        show ? '' : 'translate-x-full'
      }
      ${
        isSuccess
          ? 'bg-successSurface border-successBorder'
          : 'bg-dangerSurface border-dangerBorder'
      }
    ${'top-[74px]'}
    `}
    >
      {message}
    </div>
  );
};
