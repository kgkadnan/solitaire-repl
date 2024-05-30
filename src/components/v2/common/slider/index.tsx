import React from 'react';
import {
  StyledSliderWrapper,
  ThumbComponent,
  TrackComponent
} from './styled-slider';

export interface IRangeSliderProps {
  sliderValue: string[];
  handleSliderChange: (_newValue: string[]) => void;
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
      value={sliderValue.map(data => (data ? parseInt(data) : 0)) as number[]}
      onChange={handleSliderChange as any}
      renderTrack={TrackComponent}
      renderThumb={ThumbComponent}
      min={rangeMin ? rangeMin : 0}
      max={rangeMax ? rangeMax : 100}
      step={steps}
    />
  );
};
