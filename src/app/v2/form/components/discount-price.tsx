'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { AccordionComponent } from '../../../../components/v2/common/accordion';
import { SliderWithMinMaxInput } from '../../../../components/v2/common/slider-with-min-max';
import { handleNumericRange } from '../helpers/handle-input-range-validation';
import { amount_range, discount, price_per_carat } from '@/constants/v2/form';

interface IShapeProps {
  setDiscountMin: Dispatch<SetStateAction<string>>;
  setDiscountMax: Dispatch<SetStateAction<string>>;
  setAmountRangeMin: Dispatch<SetStateAction<string>>;
  setAmountRangeMax: Dispatch<SetStateAction<string>>;
  setPricePerCaratMin: Dispatch<SetStateAction<string>>;
  setPricePerCaratMax: Dispatch<SetStateAction<string>>;
  setDiscountError: Dispatch<SetStateAction<string>>;
  setPricePerCaratError: Dispatch<SetStateAction<string>>;
  setAmountRangeError: Dispatch<SetStateAction<string>>;
  pricePerCaratError: string;
  discountMin: string;
  discountMax: string;
  amountRangeMin: string;
  amountRangeMax: string;
  pricePerCaratMin: string;
  pricePerCaratMax: string;
  discountError: string;
  amountRangeError: string;
}

export const DiscountPrice = ({
  setDiscountMin,
  setDiscountMax,
  setAmountRangeMin,
  setAmountRangeMax,
  setPricePerCaratMin,
  setPricePerCaratMax,
  setDiscountError,
  setPricePerCaratError,
  setAmountRangeError,
  pricePerCaratError,
  amountRangeError,
  discountMin,
  discountMax,
  amountRangeMin,
  amountRangeMax,
  pricePerCaratMin,
  pricePerCaratMax,
  discountError
}: IShapeProps) => {
  const discountPriceAmoutData = [
    {
      label: 'Discount %',
      minPlaceHolder: `${discount.range.gte}`,
      maxPlaceHolder: `${discount.range.lte}`,
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiscountMax(event.target.value);
        handleNumericRange({
          min: discountMin,
          max: event.target.value,
          setErrorState: setDiscountError,
          rangeCondition: discount.range
        });
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiscountMin(event.target.value);
        handleNumericRange({
          min: event.target.value,
          max: discountMax,
          setErrorState: setDiscountError,
          rangeCondition: discount.range
        });
      },
      handleSliderChange: (newValue: string[]) => {
        setDiscountMin(newValue[0]);
        setDiscountMax(newValue[1]);
        handleNumericRange({
          min: newValue[0],
          max: newValue[1],
          setErrorState: setDiscountError,
          rangeCondition: discount.range
        });
      },
      maxValue: discountMax,
      minValue: discountMin,
      sliderValue: [discountMin, discountMax],
      errorText: discountError,
      rangeMax: discount.range.lte,
      rangeMin: discount.range.gte,
      step: (discount.range.lte - discount.range.gte) / 100
    },

    {
      label: 'Price/Ct',
      minPlaceHolder: `${price_per_carat.range.gte}`,
      maxPlaceHolder: `${price_per_carat.range.lte}`,
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setPricePerCaratMax(event.target.value);
        handleNumericRange({
          min: pricePerCaratMin,
          max: event.target.value,
          setErrorState: setPricePerCaratError,
          rangeCondition: price_per_carat.range
        });
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setPricePerCaratMin(event.target.value);
        handleNumericRange({
          min: event.target.value,
          max: pricePerCaratMax,
          setErrorState: setPricePerCaratError,
          rangeCondition: price_per_carat.range
        });
      },
      handleSliderChange: (newValue: string[]) => {
        setPricePerCaratMin(newValue[0]);
        setPricePerCaratMax(newValue[1]);
        handleNumericRange({
          min: newValue[0],
          max: newValue[1],
          setErrorState: setPricePerCaratError,
          rangeCondition: price_per_carat.range
        });
      },
      maxValue: pricePerCaratMax,
      minValue: pricePerCaratMin,
      sliderValue: [pricePerCaratMin, pricePerCaratMax],
      errorText: pricePerCaratError,
      rangeMax: price_per_carat.range.lte,
      rangeMin: price_per_carat.range.gte,
      step: (price_per_carat.range.lte - price_per_carat.range.gte) / 100
    },
    {
      label: 'Amount Range',
      minPlaceHolder: `${amount_range.range.gte}`,
      maxPlaceHolder: `${amount_range.range.lte}`,
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmountRangeMax(event.target.value);
        handleNumericRange({
          min: amountRangeMin,
          max: event.target.value,
          setErrorState: setAmountRangeError,
          rangeCondition: amount_range.range
        });
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmountRangeMin(event.target.value);
        handleNumericRange({
          min: event.target.value,
          max: amountRangeMax,
          setErrorState: setAmountRangeError,
          rangeCondition: amount_range.range
        });
      },
      handleSliderChange: (newValue: string[]) => {
        setAmountRangeMin(newValue[0]);
        setAmountRangeMax(newValue[1]);
        handleNumericRange({
          min: newValue[0],
          max: newValue[1],
          setErrorState: setAmountRangeError,
          rangeCondition: amount_range.range
        });
      },
      maxValue: amountRangeMax,
      minValue: amountRangeMin,
      sliderValue: [amountRangeMin, amountRangeMax],
      errorText: amountRangeError,
      rangeMax: amount_range.range.lte,
      rangeMin: amount_range.range.gte,
      step: (amount_range.range.lte - amount_range.range.gte) / 100
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
                    minPlaceHolder={items.minPlaceHolder}
                    maxPlaceHolder={items.maxPlaceHolder}
                    label={items.label}
                    handleMaxChange={items.handleMaxChange}
                    handleMinChange={items.handleMinChange}
                    handleSliderChange={items.handleSliderChange}
                    maxValue={items.maxValue}
                    minValue={items.minValue}
                    sliderValue={items.sliderValue}
                    errorText={items.errorText}
                    rangeMax={items.rangeMax}
                    rangeMin={items.rangeMin}
                    steps={items.step}
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
