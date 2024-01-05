import React from 'react';
import Image from 'next/image';
import confirmImage from '@public/assets/icons/confirmation.svg';

interface IConfirmScreen {
  message: string;
  buttons: React.ReactNode;
}
const ConfirmScreen = ({ message, buttons }: IConfirmScreen) => {
  return (
    <div className="flex justify-center flex-col w-[500px]">
      <div className="flex flex-col gap-[8px] mb-[20px] items-center">
        <Image src={confirmImage} alt="Banner image" />
        <div className="">
          <p className="text-solitaireTertiary mb-[20px] w-[90%] text-[16px]">
            {message}
          </p>
        </div>
      </div>

      {/* Input field for email */}
      <div className="flex flex-col gap-[20px]">{buttons}</div>
    </div>
  );
};

export default ConfirmScreen;
