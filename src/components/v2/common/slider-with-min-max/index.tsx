import React from 'react';
import { MinMaxInput } from '../min-max-input';
import { RangeSlider } from '../slider';

interface ISliderWithMinMaxInputProps {
  minValue: string;
  maxValue: string;
  sliderValue: string[];
  handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSliderChange: (newValue: string[]) => void;
  errorText?: string;
}

export const SliderWithMinMaxInput: React.FC<ISliderWithMinMaxInputProps> = ({
  minValue,
  maxValue,
  sliderValue,
  handleMinChange,
  handleMaxChange,
  handleSliderChange,
  errorText
}) => {
  return (
    <div>
      <MinMaxInput
        minInputData={{
          minValue: minValue,
          minPlaceHolder: 'Min',
          minOnchange: handleMinChange
        }}
        maxInputData={{
          maxValue: maxValue,
          maxPlaceHolder: 'Max',
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
