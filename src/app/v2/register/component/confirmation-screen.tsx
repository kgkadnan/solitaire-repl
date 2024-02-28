import React from 'react';
import Image from 'next/image';
import successIcon from '@public/v2/assets/icons/modal/confirm.svg';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import { useRouter } from 'next/navigation';

const ConfirmScreen = () => {
  const router = useRouter();

  return (
    <div className="flex items-center text-center text-neutral900 ">
      <div className="flex flex-col w-[500px] p-8 gap-[24px] items-center text-center">
        <Image src={successIcon} alt="success" />
        <p className="text-headingM text-neutral900 font-medium mt-[-100px]">
          Your account as a guest user has been successfully created.{' '}
        </p>
        <p className="text-lRegular">
          To unlock full access and enhance your experience, please complete
          your KYC verification.
        </p>
        <IndividualActionButton
          onClick={() => {
            router.push(`/v2/kyc`);
          }}
          variant={'primary'}
          size={'custom'}
          className="rounded-[4px] w-[450px]"
        >
          Finish KYC Process
        </IndividualActionButton>
        <IndividualActionButton
          onClick={() => {
            router.push(`/v2/`);
          }}
          className="rounded-[4px] text-neutral-600 w-[450px]"
          size={'custom'}
        >
          Explore website as a guest
        </IndividualActionButton>
      </div>
    </div>
  );
};

export default ConfirmScreen;
