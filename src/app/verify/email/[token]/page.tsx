'use client';
import { statusCode } from '@/constants/enums/status-code';
import { useVerifyEmailMutation } from '@/features/api/verify-email';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, ReactNode } from 'react';

const EmailVerificationPage = () => {
  const pathName = usePathname();
  const [, , , token] = pathName.split('/');
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [verifyEmail] = useVerifyEmailMutation();

  useEffect(() => {
    const emailVerify = async () => {
      const res: any = await verifyEmail({ token: token || '' });

      if (res?.data?.statusCode === statusCode.NO_CONTENT) {
        setIsEmailVerified(true);
        setContent(
          <>
            <h1 className="text-3xl text-green-600 font-bold mb-4">
              Email Verified Successfully!
            </h1>
            <p className="text-gray-600">
              Thank you for using our service. If you have any issues, please
              contact support.
            </p>
          </>
        );
      } else {
        setIsEmailVerified(true);
        setContent(
          <>
            <h1 className="text-3xl text-red-600 font-bold mb-4">
              Email Verification Failed!
            </h1>
            <p className="text-gray-600">
              Thank you for using our service. If you have any issues, please
              contact support.
            </p>
          </>
        );
      }
    };

    emailVerify();
  }, [token, verifyEmail]);

  return isEmailVerified ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        {content}
      </div>
    </div>
  ) : null;
};

export default EmailVerificationPage;
