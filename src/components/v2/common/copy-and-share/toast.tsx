import { kycStatus } from '@/constants/enums/kyc';
import React from 'react';

export const Toast = ({ message, show, isSuccess = true }: any) => {
  // Dismiss the toast after 3 seconds

  if (!show) return null;
  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  let isKycVerified = JSON.parse(localStorage.getItem('user')!);

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
    ${
      isNudge &&
      (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
        isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
        ? 'top-[134px]'
        : 'top-[74px]'
    }
    `}
    >
      {message}
    </div>
  );
};
