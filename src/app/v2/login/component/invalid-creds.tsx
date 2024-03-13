'use client';
import Image from 'next/image';
import React from 'react';
import errorIcon from '@public/v2/assets/icons/modal/error.svg';
import successIcon from '@public/v2/assets/icons/modal/confirm.svg';

import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import { ManageLocales } from '@/utils/v2/translate';

interface IInvalidCredsProps {
  content: React.ReactNode;
  handleClick?: () => void;
  header?: string;
  buttonText?: string;
  status?: string;
}

const InvalidCreds: React.FC<IInvalidCredsProps> = ({
  content,
  handleClick,
  header,
  buttonText,
  status
}) => {
  return (
    <div className="flex gap-[12px] flex-col items-center">
      <div className="absolute left-[-84px] top-[-84px]">
        <Image
          src={status === 'success' ? successIcon : errorIcon}
          alt="errorIcon"
        />
      </div>
      <div className="flex gap-[12px] flex-col mt-[80px] w-[100%]">
        {header && (
          <p className="text-headingS text-neutral900 font-medium">{header}</p>
        )}
        <div className="text-mRegular text-neutral600">
          <p>{content ?? 'Something went wrong'}</p>
        </div>
        {handleClick && (
          <IndividualActionButton
            onClick={handleClick}
            variant={'primary'}
            size={'custom'}
            className="rounded-[4px] w-[100%] h-10"
          >
            {buttonText ?? ManageLocales('app.modal.editSelection')}
          </IndividualActionButton>
        )}
      </div>
    </div>
  );
};

export default InvalidCreds;
