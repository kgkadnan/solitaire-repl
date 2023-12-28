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
        <div
          style={{
            backgroundColor: 'hsl(var(--solitaire-quaternary))',
            width: '150px',
            height: '35px',
            color: 'hsl(var(--solitaire-tertiary))',
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px'
          }}
        >
          <CustomDisplayButton
            displayButtonLabel="Okay!"
            handleClick={handleClick}
          />
        </div>
      )}
    </div>
  );
};

export default ErrorModel;
