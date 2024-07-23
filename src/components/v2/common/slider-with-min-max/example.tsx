'use client';
import React, { useState } from 'react';
import { SliderWithMinMaxInput } from '.';

export const SliderWithInputExample = () => {
  const [minValue, setMinValue] = useState<string>('0');
  const [maxValue, setMaxValue] = useState<string>('0');
  const [sliderValue, setSliderValue] = useState<string[]>(['0', '0']);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMinValue(value);
    setSliderValue([value, maxValue]);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMaxValue(value);
    setSliderValue([minValue, value]);
  };

  const handleSliderAfterChange = () => {};

  const handleSliderChange = (newValue: string[]) => {
    setSliderValue(newValue);
    setMinValue(newValue[0]);
    setMaxValue(newValue[1]);
  };
  return (
    <SliderWithMinMaxInput
      minPlaceHolder="0"
      maxPlaceHolder="100"
      label="test"
      handleMaxChange={handleMaxChange}
      handleMinChange={handleMinChange}
      handleSliderChange={handleSliderChange}
      handleSliderAfterChange={handleSliderAfterChange}
      maxValue={maxValue}
      minValue={minValue}
      sliderValue={sliderValue}
      errorText="Please enter both “From” & “To”"
      rangeMin={0}
      rangeMax={0}
      steps={0}
    />
  );
};
