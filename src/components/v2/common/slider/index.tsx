import React from 'react';
import {
  StyledSliderWrapper,
  ThumbComponent,
  TrackComponent
} from './styled-slider';

interface IRangeSliderProps {
  sliderValue: string[];
  handleSliderChange: (newValue: string[]) => void;
}

export const RangeSlider = ({
  sliderValue,
  handleSliderChange
}: IRangeSliderProps) => {
  return (
    <StyledSliderWrapper
      value={sliderValue as any}
      onChange={handleSliderChange as any}
      renderTrack={TrackComponent}
      renderThumb={ThumbComponent}
    />
  );
};
