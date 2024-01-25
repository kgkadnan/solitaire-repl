import React from 'react';
import {
  StyledSliderWrapper,
  ThumbComponent,
  TrackComponent
} from './styled-slider';

interface IRangeSliderProps {
  sliderValue: string[];
  handleSliderChange: (newValue: string[]) => void;
  rangeMin?: number;
  rangeMax?: number;
  steps?: number;
}

export const RangeSlider = ({
  sliderValue,
  handleSliderChange,
  rangeMin,
  rangeMax,
  steps
}: IRangeSliderProps) => {
  return (
    <StyledSliderWrapper
      value={sliderValue as any}
      onChange={handleSliderChange as any}
      renderTrack={TrackComponent}
      renderThumb={ThumbComponent}
      min={rangeMin ? rangeMin : 0}
      max={rangeMax ? rangeMax : 100}
      step={steps}
    />
  );
};
