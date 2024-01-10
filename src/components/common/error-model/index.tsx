'use client';
import Image from 'next/image';
import React from 'react';
import ErrorImage from '@public/assets/icons/error.svg';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';

interface IErrorModelProps {
  content: React.ReactNode;
  handleClick?: () => void;
}

const ErrorModel: React.FC<IErrorModelProps> = ({ content, handleClick }) => {
  return (
    <div className="flex gap-[20px] flex-col items-center justify-center">
      <div className="flex">
        <Image src={ErrorImage} alt="Error Image" />
        <p className="text-[20px] text-[#C51A2D] ml-[8px]">Error</p>
      </div>
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

export default ErrorModel;
