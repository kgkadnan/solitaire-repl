import React, { useState } from 'react';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { ShareDialog } from './share-dialog';
import { IndividualActionButton } from '../action-button/individual-button';
import CheckboxComponent from '../checkbox';
import { useAppDispatch } from '@/hooks/hook';
import { updateShare } from '@/features/share';
import { useSelector } from 'react-redux';

const Share = () => {
  const { modalState, modalSetState } = useModalStateManagement();
  const { isInputDialogOpen } = modalState;
  const [copied, setCopied] = useState(false);
  const {
    stockNo,
    shape,
    carat,
    color,
    clarity,
    cut,
    polish,
    symmetry,
    fluorescence,
    measurements,
    table,
    depth,
    rapVal,
    rap,
    disc,
    prct,
    amt,
    publicURL
  } = useSelector((state: any) => state);

  const { setIsInputDialogOpen } = modalSetState;
  const [selectAll, setSelectAll] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const handleClear = () => {
    console.log('jyoti');
    setSelectAll(false);
    shareOptions.map(item => {
      dispatch(
        updateShare({
          name: item.state,
          value: false
        })
      );
    });
  };

  const handleSelectAll = () => {
    setSelectAll(true);
    shareOptions.map(item => {
      dispatch(
        updateShare({
          name: item.state,
          value: true
        })
      );
    });
  };
  const copyToClipboard = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOptions = [
    { name: 'Stock No', state: 'stockNo', value: stockNo },
    { name: 'Shape', state: 'shape', value: shape },
    { name: 'Carat', state: 'carat', value: carat },
    { name: 'Color', state: 'color', value: color },
    { name: 'Clarity', state: 'clarity', value: clarity },
    { name: 'Cut', state: 'cut', value: cut },
    { name: 'Polish', state: 'polish', value: polish },
    { name: 'Symmetry', state: 'symmetry', value: symmetry },
    { name: 'Fluorescence', state: 'fluorescence', value: fluorescence },
    { name: 'Measurements', state: 'measurements', value: measurements },
    { name: 'Table %', state: 'table', value: table },
    { name: 'Depth %', state: 'depth', value: depth },
    { name: 'Rap Val ($)', state: 'rapVal', value: rapVal },
    { name: 'Rap ($)', state: 'rap', value: rap },
    { name: 'Disc%', state: 'disc', value: disc },
    { name: 'Pr/Ct', state: 'prct', value: prct },
    { name: 'Amt ($)', state: 'amt', value: amt },
    { name: 'Public URL', state: 'publicURL', value: publicURL }
  ];

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
            onClick={() => {
              selectAll ? handleClear() : handleSelectAll();
            }}
          >
            {selectAll ? 'Clear' : 'Select All'}
          </div>
        </div>
        <div className="flex gap-[14px] flex-wrap items-center">
          {shareOptions.map((item, index) => (
            <div
              key={index}
              className={`w-[187px] border-[1px]  text-mMedium font-medium flex items-center rounded-[4px] border-neutral-200 ${
                item.name === 'Public URL'
                  ? 'text-infoMain'
                  : 'text-neutral-900'
              }`}
            >
              <div className="p-[6px]">
                <CheckboxComponent
                  onClick={() => {
                    dispatch(
                      updateShare({
                        name: item.state,
                        value: !item.state
                      })
                    );
                  }}
                  isChecked={item.value}
                  styles={'&:focus-visible {  border:none}'}
                />
              </div>
              <p className="py-1 pr-1">{item.name}</p>
            </div>
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
