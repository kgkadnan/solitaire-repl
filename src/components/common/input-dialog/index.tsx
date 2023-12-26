import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CustomDisplayButton } from '../buttons/display-button';
import { CustomInputField } from '../input-field';
import { CustomInputlabel } from '../input-label';
import styles from './input-dialog.module.scss';
import { IInputDialog } from './interface';

export const CustomInputDialog: React.FC<IInputDialog> = ({
  customInputDialogData,
  isError,
  setIsError,
  setErrorContent,
  errorContent,
  handleClose
}) => {
  const {
    isOpens,
    setIsOpen,
    label,
    name,
    inputValue,
    setInputvalue,
    displayButtonLabel2,
    displayButtonFunction
  } = customInputDialogData;

  const onclose = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpens} onOpenChange={onclose} defaultOpen={false}>
      <DialogContent className="max-w-[450px] h-[200px] bg-solitairePrimary z-[1200] rounded-lg">
        {label && (
          <div className="max-w-[450px] flex justify-center align-middle text-solitaireTertiary">
            <CustomInputlabel
              label={label}
              htmlfor={name}
              overriddenStyles={{ label: styles.customLabel }}
            />
          </div>
        )}
        <div className="w-full">
          <CustomInputField
            placeholder="Search Title* (Max 150 characters)"
            type="text"
            onChange={e => {
              setErrorContent('');
              setIsError(false);
              setInputvalue(e.target.value);
            }}
            value={inputValue}
            name={name}
            style={{
              inputMain: 'w-full',
              input: styles.input
            }}
            maxLength={150}
          />
        </div>

        <div className="text-red-500 h-1">{isError && errorContent}</div>

        <div className="max-w-[400px] flex justify-around align-middle text-solitaireTertiary z-[1200]">
          <CustomDisplayButton
            displayButtonLabel="Cancel"
            handleClick={() => {
              handleClose();
            }}
            displayButtonAllStyle={{
              displayButtonStyle: styles.showResultButtonTransparent
            }}
          />
          <CustomDisplayButton
            displayButtonLabel={displayButtonLabel2}
            handleClick={() => {
              if (inputValue.length > 0) {
                displayButtonFunction();
              } else {
                setErrorContent('Please enter name');
                setIsError(true);
              }
            }}
            displayButtonAllStyle={{
              displayButtonStyle: styles.showResultButtonFilled
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
