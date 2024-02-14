import React, { useState } from 'react';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { ShareDialog } from './share-dialog';
import { IndividualActionButton } from '../action-button/individual-button';

const Share = () => {
  const { modalState, modalSetState } = useModalStateManagement();
  const { isInputDialogOpen } = modalState;
  const [copied, setCopied] = useState(false);

  const { setIsInputDialogOpen } = modalSetState;
  const [selectAll, setSelectAll] = useState<boolean>(true);
  const handleClear = () => {
    setSelectAll(false);
  };

  const handleSelectAll = () => {
    setSelectAll(true);
  };

  const copyToClipboard = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOptions = ['Stock No', 'Shape'];

  const renderContentWithInput = () => {
    return (
      <div className="flex flex-col gap-[24px]">
        <div className="flex justify-between">
          <p className="text-headingS font-medium text-neutral-900">
            Share Diamond Details
          </p>
          <div onClick={() => setIsInputDialogOpen(false)}>cross</div>
        </div>
        <div className="flex justify-between">
          <p className="text-lMedium font-medium text-neutral-900">
            Select Columns to share
          </p>
          <div
            className="text-infoMain text-mRegular cursor-pointer"
            onClick={selectAll ? handleClear : handleSelectAll}
          >
            {selectAll ? 'Clear' : 'Select All'}
          </div>
        </div>
        <div>
          {shareOptions.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
        <div className="flex  gap-[16px]">
          <IndividualActionButton
            onClick={() => {
              setIsInputDialogOpen(false);
            }}
            variant={'secondary'}
            size={'custom'}
            className="rounded-[4px] w-[450px]"
          >
            Cancel
          </IndividualActionButton>
          <IndividualActionButton
            onClick={() => {
              copyToClipboard('hii');
              setIsInputDialogOpen(false);
            }}
            variant={'primary'}
            size={'custom'}
            className="rounded-[4px] w-[450px]"
          >
            Copy
          </IndividualActionButton>
        </div>
      </div>
    );
  };

  return (
    <>
      <ShareDialog
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
      />
      <div onClick={() => setIsInputDialogOpen(true)}>hello</div>
      {copied && <span>Copied!</span>}
    </>
  );
};

export default Share;
