'use client';
import Image from 'next/image';
import React from 'react';
import errorIcon from '@public/v2/assets/icons/modal/error.svg';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';

interface IInvalidCredsProps {
  content: React.ReactNode;
  handleClick?: () => void;
}

const InvalidCreds: React.FC<IInvalidCredsProps> = ({
  content,
  handleClick
}) => {
  return (
    <div className="flex gap-[12px] flex-col items-center">
      <Image src={errorIcon} alt="errorIcon" />

      <div className="text-[16px] text-solitaireTertiary">
        <p>{content}</p>
      </div>
      {handleClick && (
        <CustomDisplayButton
          displayButtonAllStyle={{
            displayButtonStyle: 'bg-solitaireQuaternary w-[150px] h-[36px]',
            displayLabelStyle: 'text-solitaireTertiary text-[16px] font-medium'
          }}
          displayButtonLabel="Okay!"
          handleClick={handleClick}
        />
      )}
    </div>
  );
};

export default InvalidCreds;
