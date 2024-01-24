import React from 'react';
import { MinMaxInput } from '../min-max-input';
import { RangeSlider } from '../slider';
import { InputLabel } from '../input-label';

interface ISliderWithMinMaxInputProps {
  minValue: string;
  maxValue: string;
  sliderValue: string[];
  handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSliderChange: (newValue: string[]) => void;
  errorText?: string;
  label: string;
  minPlaceHolder: string;
  maxPlaceHolder: string;
}

export const SliderWithMinMaxInput: React.FC<ISliderWithMinMaxInputProps> = ({
  minValue,
  maxValue,
  sliderValue,
  handleMinChange,
  handleMaxChange,
  handleSliderChange,
  errorText,
  label,
  minPlaceHolder,
  maxPlaceHolder
}) => {
  return (
    <div className='flex flex-col gap-[16px]'>
      <InputLabel
        label={label}
        htmlFor=""
        styles="text-neutral900 text-sRegular font-regular"
      />
      <MinMaxInput
        minInputData={{
          minValue: minValue,
          minPlaceHolder: minPlaceHolder,
          minOnchange: handleMinChange
        }}
        maxInputData={{
          maxValue: maxValue,
          maxPlaceHolder: maxPlaceHolder,
          maxOnchange: handleMaxChange
        }}
        inputGap="gap-[121px]"
        errorText={errorText}
      />
      <RangeSlider
        handleSliderChange={handleSliderChange}
        sliderValue={sliderValue}
      />
    </div>
  );
};
