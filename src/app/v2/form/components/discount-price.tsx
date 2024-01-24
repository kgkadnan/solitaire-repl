'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { AccordionComponent } from '../../../../components/v2/common/accordion';
import { SliderWithMinMaxInput } from '../../../../components/v2/common/slider-with-min-max';

interface IShapeProps {
  setDiscountMin: Dispatch<SetStateAction<string>>;
  setDiscountMax: Dispatch<SetStateAction<string>>;
  setAmountRangeMin: Dispatch<SetStateAction<string>>;
  setAmountRangeMax: Dispatch<SetStateAction<string>>;
  setPricePerCaratMin: Dispatch<SetStateAction<string>>;
  setPricePerCaratMax: Dispatch<SetStateAction<string>>;
  discountMin: string;
  discountMax: string;
  amountRangeMin: string;
  amountRangeMax: string;
  pricePerCaratMin: string;
  pricePerCaratMax: string;
}

export const DiscountPrice = ({
  setDiscountMin,
  setDiscountMax,
  setAmountRangeMin,
  setAmountRangeMax,
  setPricePerCaratMin,
  setPricePerCaratMax,
  discountMin,
  discountMax,
  amountRangeMin,
  amountRangeMax,
  pricePerCaratMin,
  pricePerCaratMax
}: IShapeProps) => {
  const discountPriceAmoutData = [
    {
      label: 'Discount %',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiscountMax(event.target.value);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiscountMin(event.target.value);
      },
      handleSliderChange: (newValue: string[]) => {
        setDiscountMin(newValue[0]);
        setDiscountMax(newValue[1]);
      },
      maxValue: discountMax,
      minValue: discountMin,
      sliderValue: [discountMin, discountMax],
      errorText: ''
    },
    {
      label: 'Price/Ct',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setPricePerCaratMax(event.target.value);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setPricePerCaratMin(event.target.value);
      },
      handleSliderChange: (newValue: string[]) => {
        setPricePerCaratMin(newValue[0]);
        setPricePerCaratMax(newValue[1]);
      },
      maxValue: pricePerCaratMax,
      minValue: pricePerCaratMin,
      sliderValue: [pricePerCaratMin, pricePerCaratMax],
      errorText: ''
    },
    {
      label: 'Amount Range',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmountRangeMax(event.target.value);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmountRangeMin(event.target.value);
      },
      handleSliderChange: (newValue: string[]) => {
        setAmountRangeMin(newValue[0]);
        setAmountRangeMax(newValue[1]);
      },
      maxValue: amountRangeMax,
      minValue: amountRangeMin,
      sliderValue: [amountRangeMin, amountRangeMax],
      errorText: ''
    }
  ];

  return (
    <div id="Discount% Price/Ct Amount Range">
      <AccordionComponent
        value="Discount% Price/Ct Amount Range"
        isDisable={true}
        accordionContent={
          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-between px-[16px] py-[24px] gap-[16px] ">
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
    </div>
  );
};
