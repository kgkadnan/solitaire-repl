'use client';
import Image from 'next/image';
import React from 'react';
import handImage from '@public/assets/images/noto_waving-hand.png';
import { ManageLocales } from '@/utils/translate';
import UserAuthenticationLayout from '@/components/common/user-authentication-layout';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import Link from 'next/link';
import confirmImage from '@public/assets/icons/confirmation.svg';

const successfullyCreated = () => {
  return (
    <UserAuthenticationLayout
      formData={
        <div className="flex justify-center gap-5 flex-col w-[500px]">
          <div className="flex flex-col justify-around  mb-[10px] items-center h-[20vh]">
            <Image src={confirmImage} alt="Banner image" />
            <p className="text-solitaireTertiary text-[18px]">
              Your account has been successfully <br />
              created!
            </p>
          </div>

          <div className="mt-10">
            <div className="flex flex-col gap-3">
              {/* Button to trigger the register action */}
              <div className="flex flex-col justify-center bg-transparent  border-2 border-solitaireQuaternary w-[500px] h-[64px] cursor-pointer">
                <Link
                  href={'/'}
                  className="text-[16px] font-medium text-solitaireTertiary"
                >
                  {ManageLocales('app.successfullyCreated.exploreWebsite')}
                </Link>
              </div>
              <div className="flex flex-col justify-center bg-solitaireQuaternary w-[500px] h-[64px] cursor-pointer">
                <Link
                  href={'/my-account/kyc'}
                  className="text-[16px] font-medium text-solitaireTertiary"
                >
                  {ManageLocales('app.successfullyCreated.finishKYCProcess')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default successfullyCreated;
