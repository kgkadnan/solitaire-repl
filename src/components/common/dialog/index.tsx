import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import confirmImage from '@public/assets/icons/confirmation.svg';
import Image from 'next/image';

interface IDialog {
  dialogContent: React.ReactNode;
  isOpens? : boolean
}

export const CustomDialog: React.FC<IDialog> = ({
  dialogContent,
  isOpens=false
}) => {
  return (
    <>
      <Dialog open={isOpens}>
        {/* <DialogTrigger>{dialogTrigger}</DialogTrigger> */}
        <DialogContent className="sm:max-w-[400px] h-[200px] bg-solitaireSecondary z-[1200]">
          {/* <div className="max-w-[400px] flex justify-center align-middle">
            <Image src={confirmImage} alt="vector image" />
          </div> */}
          {/* <div className="max-w-[400px] flex justify-center align-middle text-solitaireTertiary"> */}
            {dialogContent}
          {/* </div> */}
        </DialogContent>
      </Dialog>
    </>
  );
};