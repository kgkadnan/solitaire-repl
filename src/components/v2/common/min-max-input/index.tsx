import React from 'react';
import { InputLabel } from '../input-label';
import { InputField } from '../input-field';
import { IMinMaxInput } from './interface';

export const MinMaxInput = ({
  minInputData,
  maxInputData,
  inputGap,
  errorText,
  isShowError = true
}: IMinMaxInput) => {
  const minMaxData = ['from', 'to'];
  const { minValue, minPlaceHolder, minOnchange } = minInputData;
  const { maxValue, maxPlaceHolder, maxOnchange } = maxInputData;

  return (
    <>
      <div
        className={`flex ${errorText ? 'mb-[5px]' : 'mb-[16px]'} ${inputGap}`}
      >
        {minMaxData.map(type => (
          <div key={type} className="flex items-baseline">
            <div className="">
              <InputLabel
                htmlFor={type}
                label={type === 'from' ? 'From' : 'To'}
                styles="border-y-[1px] border-l-[1px] text-neutral500 border-neutral200 rounded-l-[4px] p-2 mb-[4px]"
              />
              <p className="h-1"></p>
            </div>
            <InputField
              type="number"
              name={type}
              value={type === 'from' ? minValue : maxValue}
              placeholder={type === 'from' ? minPlaceHolder : maxPlaceHolder}
              onChange={type === 'from' ? minOnchange : maxOnchange}
              styles={{
                input: `h-full p-2 flex-grow block w-full min-w-0 rounded-r-sm text-mRegular shadow-[var(--input-shadow)] border-[1px] border-neutral200 w-[92px] rounded-r-[4px] rounded-l-[0px] focus:border-[1px] 
                ${errorText ? 'border-dangerMain' : 'border-neutral200'}`
              }}
            />
          </div>
        ))}
      </div>
      {errorText && isShowError && (
        <p className="text-dangerMain text-sRegular font-regular mb-[5px]">
          {errorText}
        </p>
      )}
    </>
  );
};
