'use client';
import React, { useState } from 'react';
import { AccordionComponent } from '../accordion';
import { SliderWithMinMaxInput } from '../slider-with-min-max';

export const DiscountPrice = () => {
  const [discountMinValue, setDiscountMinValue] = useState<string>('');
  const [discountMaxValue, setDiscountMaxValue] = useState<string>('');

  const [priceMinValue, setPriceMinValue] = useState<string>('');
  const [priceMaxValue, setPriceMaxValue] = useState<string>('');

  const [amountMinValue, setAmountMinValue] = useState<string>('');
  const [amountMaxValue, setAmountMaxValue] = useState<string>('');

  const [discountSliderValue, setDiscountSliderValue] = useState<string[]>([
    '0',
    '0'
  ]);
  const [priceSliderValue, setPriceSliderValue] = useState<string[]>([
    '0',
    '0'
  ]);
  const [amountSliderValue, setAmountSliderValue] = useState<string[]>([
    '0',
    '0'
  ]);

  const discountPriceAmoutData = [
    {
      label: 'Discount %',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiscountMaxValue(event.target.value);
        setDiscountSliderValue([discountMinValue, event.target.value]);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiscountMinValue(event.target.value);
        setDiscountSliderValue([event.target.value, discountMaxValue]);
      },
      handleSliderChange: (newValue: string[]) => {
        setDiscountSliderValue(newValue);
        setDiscountMinValue(newValue[0]);
        setDiscountMaxValue(newValue[1]);
      },
      maxValue: discountMaxValue,
      minValue: discountMinValue,
      sliderValue: discountSliderValue,
      errorText: ''
    },
    {
      label: 'Price/Ct',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceMaxValue(event.target.value);
        setPriceSliderValue([priceMinValue, event.target.value]);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceMinValue(event.target.value);
        setPriceSliderValue([event.target.value, priceMaxValue]);
      },
      handleSliderChange: (newValue: string[]) => {
        setPriceSliderValue(newValue);
        setPriceMinValue(newValue[0]);
        setPriceMaxValue(newValue[1]);
      },
      maxValue: priceMaxValue,
      minValue: priceMinValue,
      sliderValue: priceSliderValue,
      errorText: ''
    },
    {
      label: 'Amount Range',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmountMaxValue(event.target.value);
        setAmountSliderValue([amountMinValue, event.target.value]);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmountMinValue(event.target.value);
        setAmountSliderValue([event.target.value, amountMaxValue]);
      },
      handleSliderChange: (newValue: string[]) => {
        setAmountSliderValue(newValue);
        setAmountMinValue(newValue[0]);
        setAmountMaxValue(newValue[1]);
      },
      maxValue: amountMaxValue,
      minValue: amountMinValue,
      sliderValue: amountSliderValue,
      errorText: ''
    }
  ];

  return (
    <AccordionComponent
      value="Discount% Price/Ct Amount Range"
      isDisable={true}
      accordionContent={
        <div className="flex justify-between">
          {discountPriceAmoutData.map(items => {
            return (
              <div key={items.label}>
                <SliderWithMinMaxInput
                  minPlaceHolder="0"
                  maxPlaceHolder="100"
                  label={items.label}
                  handleMaxChange={items.handleMaxChange}
                  handleMinChange={items.handleMinChange}
                  handleSliderChange={items.handleSliderChange}
                  maxValue={items.maxValue}
                  minValue={items.minValue}
                  sliderValue={items.sliderValue}
                  errorText={items.errorText}
                />
              </div>
            );
          })}
        </div>
      }
      accordionTrigger={'Discount% Price/Ct Amount Range'}
      hasError={false}
    />
  );
};
