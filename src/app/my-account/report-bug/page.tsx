'use client';
import React, { useState } from 'react';
import { CustomSelectionButton } from '@/components/common/buttons/selection-button';
import styles from './report-bug.module.scss';
import { ManageLocales } from '@/utils/translate';

const ReportBug = () => {
  const [inputValue, setInputValue] = useState<string>();
  const [registerValue, setRegisterValue] = useState<string>();

  const handleInput = (event: any) => {
    let inputValue = event.target.value;
    setInputValue(inputValue);
  };

  let register = () => {
    setRegisterValue(inputValue);
  };

  let reset = () => {
    setInputValue('');
  };

  let selectionButtons = [
    {
      id: '1',
      label: ManageLocales('app.myaccount.reportBug.register'),
      fn: register,
      selectionButtonAllStyles: {
        selectionButtonStyle: styles.filled,
      },
    },
    {
      id: '2',
      label: ManageLocales('app.myaccount.reportBug.reset'),
      fn: reset,
      selectionButtonAllStyles: {
        selectionButtonStyle: styles.transparent,
      },
    },
  ];

  return (
    <div className="flex flex-col min-h-full">
      <p className="w-full">{ManageLocales('app.myaccount.reportBug')}</p>
      <div className="flex mt-[20px] gap-3">
        <textarea
          value={inputValue}
          name="textarea"
          rows={5}
          className="w-3/4 bg-solitaireSecondary text-solitaireTertiary rounded-xl resize-none focus:outline-none p-5"
          onChange={handleInput}
        />
        <div className="w-1/3 flex mt-auto">
          {selectionButtons.map(
            ({ id, label, fn, selectionButtonAllStyles }) => {
              return (
                <div key={id}>
                  <CustomSelectionButton
                    selectionButtonLabel={label}
                    handleClick={fn}
                    selectionButtonAllStyles={selectionButtonAllStyles}
                  />
                </div>
              );
            }
          )}
        </div>
      </div>

      <hr className="mt-6 border-1 border-solitaireSenary" />
    </div>
  );
};

export default ReportBug;
