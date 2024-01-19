import React, { useState } from 'react';
import { MinMaxInput } from '../min-max-input';

export const SliderWithMinMaxInput = ({ min, max, step }: any) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (event: any) => {
    const newMin = Math.min(Number(event.target.value), maxValue - step);
    setMinValue(newMin);
  };

  const handleMaxChange = (event: any) => {
    const newMax = Math.max(minValue + step, Number(event.target.value));
    setMaxValue(newMax);
  };

  const handleMinSliderChange = (event: any) => {
    handleMinChange(event);
  };

  return (
    <div>
      <MinMaxInput
        minInputData={{
          minValue: minValue,
          minPlaceHolder: 'Min',
          minOnchange: () => handleMinChange
        }}
        maxInputData={{
          maxValue: maxValue,
          maxPlaceHolder: 'Max',
          maxOnchange: () => handleMaxChange
        }}
        inputGap="gap-2" // This is an example, adjust the gap as needed
        errorText="" // Add any error handling as needed
      />
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          step={step}
          onChange={handleMinSliderChange}
          className="slider absolute"
          style={{ zIndex: '5' }}
        />
      </div>
    </div>
  );
};
