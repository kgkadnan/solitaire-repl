import { kycStatus } from '@/constants/enums/kyc';
import React from 'react';

export const Toast = ({ message, show }: any) => {
  // Dismiss the toast after 3 seconds

  if (!show) return null;
  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  let isKycVerified = JSON.parse(localStorage.getItem('user')!);

  return (
    // <div className="fixed  w-[320px]  top-[64px]  transform -translate-x-1/2 bg-successSurface border-[1px] border-successBorder rounded-[8px] shadow-md text-mMedium medium p-4 text-neutral900">
    <div
      className={`fixed w-[320px] right-[32px] bg-successSurface border-[1px] border-successBorder rounded-[8px] shadow-md text-mMedium medium p-4 text-neutral900 transition-all duration-500 transform ${
        show ? '' : 'translate-x-full'
      }
    ${
      isNudge &&
      (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
        isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
        ? 'top-[134px]'
        : 'top-[74px]'
    }
    `}
      // onTransitionEnd={handleTransitionEnd}
    >
      {message}
    </div>
  );
};
