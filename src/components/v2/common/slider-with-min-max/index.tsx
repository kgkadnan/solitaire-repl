import React from 'react';
import { MinMaxInput } from '../min-max-input';
import { RangeSlider } from '../slider';
import { InputLabel } from '../input-label';

export interface ISliderWithMinMaxInputProps {
  minValue: string;
  maxValue: string;
  sliderValue: string[];
  handleMinChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSliderAfterChange: () => void;
  handleSliderChange: (_newValue: string[]) => void;
  errorText?: string;
  label: string;
  minPlaceHolder: string;
  maxPlaceHolder: string;
  rangeMin: number;
  rangeMax: number;
  steps: number;
}

export const SliderWithMinMaxInput: React.FC<ISliderWithMinMaxInputProps> = ({
  minValue,
  maxValue,
  handleSliderAfterChange,
  sliderValue,
  handleMinChange,
  handleMaxChange,
  handleSliderChange,
  errorText,
  label,
  minPlaceHolder,
  maxPlaceHolder,
  rangeMin,
  rangeMax,
  steps
}) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <InputLabel
        label={label}
        htmlFor=""
        styles="text-neutral900 text-sRegular font-regular mb-[10px]"
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
        isShowError={false}
      />
      {/* <RangeSlider
        handleSliderChange={handleSliderChange}
        handleSliderAfterChange={handleSliderAfterChange}
        sliderValue={sliderValue}
        rangeMax={rangeMax}
        rangeMin={rangeMin}
        steps={steps}
      /> */}
    </div>
  );
};
