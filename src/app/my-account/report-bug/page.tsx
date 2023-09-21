'use client';
import React, { useState } from 'react';
import { CustomSelectionButton } from '@/components/common/buttons/selection-button';
import styles from './report-bug.module.scss';
import { ManageLocales } from '@/utils/translate';

const MAX_CHARACTERS = 1000;

const ReportBug = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [reportBug, setReportBug] = useState<string>('');

  const handleInput = (event: any) => {
    let inputValue = event.target.value;
    if (inputValue.length <= MAX_CHARACTERS) {
      setInputValue(inputValue);
    }
  };

  let report = () => {
    setReportBug(inputValue);
  };

  let reset = () => {
    setInputValue('');
  };

  let selectionButtons = [
    {
      id: '1',
      label: ManageLocales('app.myaccount.reportBug.report'),
      fn: report,
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
          placeholder="Write Description (max 1000 characters)"
          className="w-3/4 bg-solitaireOctonary text-solitaireTertiary rounded-xl resize-none focus:outline-none p-5 placeholder:text-solitaireSenary"
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
