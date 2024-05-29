// src/components/RangeSlider/RangeSlider.stories.tsx

import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { RangeSlider, IRangeSliderProps } from '@/components/v2/common/slider';

export default {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  argTypes: {
    sliderValue: { control: 'array' },
    rangeMin: { control: 'number' },
    rangeMax: { control: 'number' },
    steps: { control: 'number' }
  }
} as Meta;

const Template: Story<IRangeSliderProps> = args => {
  const [sliderValue, setSliderValue] = useState<string[]>(args.sliderValue);

  const handleSliderChange = (newValue: string[]) => {
    setSliderValue(newValue);
    args.handleSliderChange(newValue);
  };

  return (
    <RangeSlider
      {...args}
      sliderValue={sliderValue}
      handleSliderChange={handleSliderChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  sliderValue: ['20', '80'],
  rangeMin: 0,
  rangeMax: 100,
  steps: 1
};

export const WithCustomRange = Template.bind({});
WithCustomRange.args = {
  sliderValue: ['10', '90'],
  rangeMin: 10,
  rangeMax: 90,
  steps: 5
};

export const SteppedSlider = Template.bind({});
SteppedSlider.args = {
  sliderValue: ['0', '50'],
  rangeMin: 0,
  rangeMax: 100,
  steps: 10
};

export const SingleValueSlider = Template.bind({});
SingleValueSlider.args = {
  sliderValue: ['50'],
  rangeMin: 0,
  rangeMax: 100,
  steps: 1
};
