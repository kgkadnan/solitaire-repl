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
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '40px',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Image src={confirmImage} alt="Banner image" />
            <div className="">
              <p className="text-solitaireTertiary mb-[20px] w-[90%]">
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
                    'bg-[transparent] border-[1px] border-solitaireQuaternary mb-[20px] w-[500px] h-[64px]',
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
                  displayButtonStyle: 'bg-[#9f8b75] w-[500px] h-[64px]',
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
