import React from 'react';
import { InputLabel } from '../input-label';
import { InputField } from '../input-field';
import { IMinMaxInput } from './interface';

export const MinMaxInput = ({
  minInputData,
  maxInputData,
  inputGap,
  errorText
}: IMinMaxInput) => {
  const minMaxData = ['min', 'max'];
  const { minValue, minPlaceHolder, minOnchange } = minInputData;
  const { maxValue, maxPlaceHolder, maxOnchange } = maxInputData;

  return (
    <>
      <div className={`flex my-[16px] ${inputGap}`}>
        {minMaxData.map(type => (
          <div
            key={type}
            className="flex items-center border-[1px] border-neutral200 rounded"
          >
            <div className="px-2">
              <InputLabel
                htmlFor={type}
                label={type === 'min' ? 'Min' : 'Max'}
              />
            </div>
            <InputField
              type="number"
              value={type === 'min' ? minValue : maxValue}
              name={type}
              placeholder={type === 'min' ? minPlaceHolder : maxPlaceHolder}
              onChange={type === 'min' ? minOnchange : maxOnchange}
              styles={{
                input:
                  'h-full p-2 rounded-l-none flex-grow block w-full min-w-0 rounded-r-sm text-[14px] border-l-[1px] w-[92px]'
              }}
            />
          </div>
        ))}
      </div>
      <p className="text-dangerMain text-[12px] mt-1 font-light">{errorText}</p>
    </>
  );
};
