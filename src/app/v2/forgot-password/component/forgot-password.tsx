import Image from 'next/image';
import React from 'react';
import keyIcon from '@public/v2/assets/icons/modal/key.svg';
import backArrow from '@public/v2/assets/icons/back-arrow.svg';

import { MobileInput } from '@/components/v2/common/input-field/mobile';
import { ManageLocales } from '@/utils/v2/translate';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import { useRouter, useSearchParams } from 'next/navigation';

const ForgotComponent = ({
  handlePhone,
  handleKeyDown,
  handleForgotPassword,
  state,
  setState,
  value,
  errorText
}: any) => {
  const router = useRouter();
  const pathName = useSearchParams().get('path');

  return (
    <div className="flex items-center text-center">
      <div className="flex flex-col w-[450px]  p-8 gap-[24px] mt-[-60px]">
        <div className="flex flex-col items-center">
          <Image src={keyIcon} alt="keyIcon" />
        </div>

        <div className="text-headingM text-neutral900 font-medium mt-[-170px]">
          {ManageLocales('app.forgotPassword')}
        </div>

        <div className="text-mRegular text-neutral900">
          {ManageLocales('app.forgotPassword.title')}
        </div>

        <MobileInput
          label={ManageLocales('app.register.mobileNumber')}
          onChange={event => handlePhone(event)}
          type="number"
          name="mobileNumber"
          errorText={errorText}
          placeholder={ManageLocales('app.register.mobileNumber.placeholder')}
          registerFormState={state}
          setRegisterFormState={setState}
          value={value}
          onKeyDown={handleKeyDown}
        />
        <div className="flex flex-col gap-1">
          <IndividualActionButton
            onClick={handleForgotPassword}
            variant={'primary'}
            size={'custom'}
            className="rounded-[4px] w-[100%]"
          >
            {ManageLocales('app.sendOTP')}
          </IndividualActionButton>

          <IndividualActionButton
            onClick={() => {
              pathName === 'login'
                ? router.back()
                : router.replace('/v2/login');
            }}
            variant={'secondary'}
            size={'custom'}
            className="border-none w-[100%]"
          >
            <div className="text-mMedium font-medium flex items-center gap-2">
              <Image src={backArrow} alt="backArrow" />
              <p className="text-neutral900">
                {ManageLocales('app.goBackToLogin')}
              </p>
            </div>
          </IndividualActionButton>
        </div>
      </div>
    </div>
  );
};

export default ForgotComponent;
