import React, { useState } from 'react';
import { RangeSlider } from '.';

export const SliderExample = () => {
  const [sliderValue, setSliderValue] = useState(['0', '0']);

  const handleSliderChange = (newValue: string[]) => {
    setSliderValue(newValue);
  };

  return (
    <RangeSlider
      handleSliderChange={handleSliderChange}
      sliderValue={sliderValue}
    />
  );
};
