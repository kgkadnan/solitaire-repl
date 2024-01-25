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
  const [priceStep, setPriceStep] = useState<number>(1);
  const [amountStep, setAmountStep] = useState<number>(1);
  const [discountStep, setDiscountStep] = useState<number>(1);
  const handleRangeChange = (minValue: string, maxValue: string) => {
    const range = parseInt(maxValue) - parseInt(minValue);

    if (range <= 100) {
      return 1;
    } else if (range <= 101) {
      return 10;
    } else if (range <= 10000) {
      return 50;
    } else if (range <= 50000) {
      return 100;
    } else {
      return 500;
    }
  };

  const discountPriceAmoutData = [
    {
      label: 'Discount %',
      minPlaceHolder: '0',
      maxPlaceHolder: '100',
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
        const step = handleRangeChange(discountMin, discountMax);
        setDiscountStep(step);
      },
      maxValue: discountMax,
      minValue: discountMin,
      sliderValue: [discountMin, discountMax],
      errorText: discountError,
      rangeMax: 100,
      rangeMin: 0,
      step: discountStep
    },
    {
      label: 'Price/Ct',
      minPlaceHolder: '0',
      maxPlaceHolder: '999999',
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
        const step = handleRangeChange(pricePerCaratMin, pricePerCaratMax);
        setPriceStep(step);
      },
      maxValue: pricePerCaratMax,
      minValue: pricePerCaratMin,
      sliderValue: [pricePerCaratMin, pricePerCaratMax],
      errorText: pricePerCaratError,
      rangeMax: 999999,
      rangeMin: 0,
      step: priceStep
    },
    {
      label: 'Amount Range',
      minPlaceHolder: '0',
      maxPlaceHolder: '999999',
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
        const step = handleRangeChange(pricePerCaratMin, pricePerCaratMax);
        setAmountStep(step);
      },
      maxValue: amountRangeMax,
      minValue: amountRangeMin,
      sliderValue: [amountRangeMin, amountRangeMax],
      errorText: amountRangeError,
      rangeMax: 999999,
      rangeMin: 0,
      step: amountStep
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
