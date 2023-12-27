'use client';

import UserAuthenticationLayout from '@/components/common/user-authentication-layout';
import Image from 'next/image';
import React from 'react';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { ManageLocales } from '@/utils/translate';

const ConfirmationScreen = () => {
  const handleExploreWebsite = () => {};
  return (
    <UserAuthenticationLayout
      formData={
        <div className="flex justify-center flex-col w-[500px]">
          <div className="flex flex-col gap-[8px] mb-[20px] items-center">
            <Image src={confirmImage} alt="Banner image" />
            <div className="">
              <p className="text-solitaireTertiary mb-[20px] w-[90%] text-[16px]">
                {ManageLocales('app.confirmationScreen.message')}
              </p>
            </div>
          </div>

          {/* Input field for email */}
          <div className="flex flex-col gap-[40px]">
            <div>
              <CustomDisplayButton
                displayButtonLabel={ManageLocales(
                  'app.confirmationScreen.exploreWebsite'
                )}
                displayButtonAllStyle={{
                  displayButtonStyle:
                    'bg-[transparent] border-[1px] border-solitaireQuaternary mb-[20px] w-[500px] h-[54px]',
                  displayLabelStyle:
                    'text-solitaireTertiary text-[16px] font-medium'
                }}
                handleClick={handleExploreWebsite}
              />
              <CustomDisplayButton
                displayButtonLabel={ManageLocales(
                  'app.confirmationScreen.finishKycProcess'
                )}
                displayButtonAllStyle={{
                  displayButtonStyle:
                    'bg-solitaireQuaternary w-[500px] h-[54px]',
                  displayLabelStyle:
                    'text-solitaireTertiary text-[16px] font-medium'
                }}
                handleClick={handleExploreWebsite}
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default ConfirmationScreen;
