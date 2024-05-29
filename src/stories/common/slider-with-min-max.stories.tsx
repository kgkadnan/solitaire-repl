import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import {
  SliderWithMinMaxInput,
  ISliderWithMinMaxInputProps
} from '@/components/v2/common/slider-with-min-max';

export default {
  title: 'Components/SliderWithMinMaxInput',
  component: SliderWithMinMaxInput
} as Meta;

const Template: Story<ISliderWithMinMaxInputProps> = args => {
  const [minValue, setMinValue] = useState(args.minValue);
  const [maxValue, setMaxValue] = useState(args.maxValue);
  const [sliderValue, setSliderValue] = useState(args.sliderValue);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinValue(event.target.value);
    args.handleMinChange(event);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxValue(event.target.value);
    args.handleMaxChange(event);
  };

  const handleSliderChange = (newValue: string[]) => {
    setSliderValue(newValue);
    args.handleSliderChange(newValue);
  };

  return (
    <SliderWithMinMaxInput
      {...args}
      minValue={minValue}
      maxValue={maxValue}
      sliderValue={sliderValue}
      handleMinChange={handleMinChange}
      handleMaxChange={handleMaxChange}
      handleSliderChange={handleSliderChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  minValue: '10',
  maxValue: '50',
  sliderValue: ['10', '50'],
  handleMinChange: () => {},
  handleMaxChange: () => {},
  handleSliderChange: () => {},
  errorText: '',
  label: 'Select Range',
  minPlaceHolder: 'Min',
  maxPlaceHolder: 'Max',
  rangeMin: 0,
  rangeMax: 100,
  steps: 1
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  errorText: 'Error: Value out of range'
};
