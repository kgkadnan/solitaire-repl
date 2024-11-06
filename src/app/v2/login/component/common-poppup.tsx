'use client';
import Image from 'next/image';
import React from 'react';
import errorIcon from '@public/v2/assets/icons/modal/error.svg';
import successIcon from '@public/v2/assets/icons/modal/confirm.svg';
import deleteIcon from '@public/v2/assets/icons/modal/bin.svg';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import { ManageLocales } from '@/utils/v2/translate';
import ActionButton from '@/components/v2/common/action-button';
import warningIcon from '@public/v2/assets/icons/modal/warning.svg';
import infoIcon from '@public/v2/assets/icons/modal/info.svg';

interface ICommonPoppupProps {
  content: React.ReactNode;
  handleClick?: () => void;
  header?: string;
  buttonText?: string;
  status?: string;
  actionButtonData?: {
    variant: 'secondary' | 'primary' | 'disable';
    svg?: any; // Assuming the type of 'svg' is string, update it accordingly
    label?: string;
    isDisable?: boolean;
    handler: () => void;
    isHidden?: boolean;
    customStyle?: string;
    tooltip?: string;
  }[];
  customPoppupBodyStyle?: string;
  customPoppupStyle?: string;
}

const CommonPoppup: React.FC<ICommonPoppupProps> = ({
  content,
  handleClick,
  header,
  buttonText,
  status,
  actionButtonData,
  customPoppupStyle,
  customPoppupBodyStyle
}) => {
  return (
    <div
      className={`flex gap-[12px] flex-col items-center ${customPoppupStyle}`}
    >
      <div className="absolute left-[-84px] top-[-84px]">
        <Image
          src={
            status === 'success'
              ? successIcon
              : status === 'warning'
              ? warningIcon
              : status === 'delete'
              ? deleteIcon
              : status === 'info'
              ? infoIcon
              : errorIcon
          }
          alt={
            status === 'success'
              ? 'successIcon'
              : status === 'warning'
              ? 'warningIcon'
              : status === 'delete'
              ? 'deleteIcon'
              : 'errorIcon'
          }
        />
      </div>
      <div
        className={`flex gap-[12px] flex-col mt-[80px] w-[100%] ${customPoppupBodyStyle}`}
      >
        {header && (
          <p className="text-headingS text-neutral900 font-medium">{header}</p>
        )}
        {content !== '' && (
          <div className="text-mRegular text-neutral600">
            <p>{content ?? 'Something went wrong'}</p>
          </div>
        )}
        {handleClick && (
          <IndividualActionButton
            onClick={handleClick}
            variant={'primary'}
            size={'custom'}
            className="rounded-[4px] w-[100%] h-10 z-[1]"
          >
            {buttonText ?? ManageLocales('app.modal.editSelection')}
          </IndividualActionButton>
        )}

        {actionButtonData && actionButtonData.length > 0 && (
          <ActionButton
            actionButtonData={actionButtonData}
            containerStyle="z-[1000]"
          />
        )}
      </div>
    </div>
  );
};

export default CommonPoppup;
