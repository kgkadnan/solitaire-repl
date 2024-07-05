import React, { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogContent } from '../../ui/dialog';
import Image from 'next/image';
import KgkIcon from '@public/v2/assets/icons/sidebar-icons/vector.svg';
import { IndividualActionButton } from '../action-button/individual-button';

export interface IDialog {
  isOpens: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  dialogStyle?: {
    dialogContent?: string;
  };
}

export const KgkDiamondLaunchDialog: React.FC<IDialog> = ({
  isOpens,
  dialogStyle,
  setIsDialogOpen
}) => {
  return (
    <Dialog open={isOpens} defaultOpen={false}>
      {/*Remove onOpenChange to prevent the dialog from closing when clicking outside the dialog*/}
      <DialogContent
        className={`bg-neutral25 flex min-w-[637px] w-[637px] flex-col gap-[24px] justify-center items-center  !rounded-[8px] p-[24px] ${dialogStyle?.dialogContent}`}
      >
        <div>
          <Image src={KgkIcon} alt="KgkIcon" width={69} height={92} />
        </div>
        <div>
          <hr className="border-solid border-[1px] border-neutral200 w-[576px]" />
        </div>

        <div className="flex flex-col items-center gap-[24px]">
          <h1 className="text-headingL text-neutral800 font-semibold">
            NOTICE
          </h1>
          <div className="flex flex-col gap-[12px]">
            <h1 className="text-headingS  text-center font-medium text-neutral900">
              We are excited to announce the launch of our new platform, KGK
              Diamonds.
            </h1>
            <div className="text-neutral600   text-center text-mMedium font-normal">
              <p className="">
                KGK Diamonds will be available in your region starting in
                September. Until then, please coordinate with your sales
                representative for inventory details and assistance.
              </p>
              <p> Thank you for your understanding.</p>
            </div>
          </div>
        </div>
        <IndividualActionButton
          onClick={() => {
            setIsDialogOpen(false);
          }}
          variant={'primary'}
          size={'custom'}
          className="border-none w-[100%] rounded-[4px] h-[40px]"
          type="button"
        >
          Okay
        </IndividualActionButton>
      </DialogContent>
    </Dialog>
  );
};
