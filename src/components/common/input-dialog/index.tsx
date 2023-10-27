import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CustomDisplayButton } from '../buttons/display-button';
import { CustomInputField } from '../input-field';
import { CustomInputlabel } from '../input-label';
import styles from './input-dialog.module.scss';

interface IDialog {
  customInputDialogData: any;
}

export const CustomInputDialog: React.FC<IDialog> = ({
  customInputDialogData,
}) => {
  let {
    isOpens,
    setIsOpen,
    label,
    name,
    inputValue,
    setInputvalue,
    displayButtonLabel2,
    displayButtonFunction,
  } = customInputDialogData;

  const onclose = (open: boolean) => {
    setIsOpen(open);
  };
  return (
    <>
      <Dialog open={isOpens} onOpenChange={onclose} defaultOpen={false}>
        <DialogContent className="sm:max-w-[400px] h-[200px] bg-solitaireSecondary z-[1200]">
          {label && (
            <div className="max-w-[400px] flex justify-center align-middle text-solitaireTertiary">
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
              onChange={(e) => setInputvalue(e.target.value)}
              value={inputValue}
              name={name}
              style={{
                inputMain: 'w-full',
                input: styles.input,
              }}
            />
          </div>
          <div className="max-w-[400px] flex justify-around align-middle text-solitaireTertiary z-[1200]">
            <CustomDisplayButton
              displayButtonLabel="Cancel"
              handleClick={() => {
                setIsOpen(false);
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonTransparent,
              }}
            />
            <CustomDisplayButton
              displayButtonLabel={displayButtonLabel2}
              handleClick={() => {
                displayButtonFunction();
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonFilled,
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
