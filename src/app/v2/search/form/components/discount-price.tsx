'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { handleNumericRange } from '../helpers/handle-input-range-validation';
import { amountRange, discount, pricePerCarat } from '@/constants/v2/form';
import { SliderWithMinMaxInput } from '@/components/v2/common/slider-with-min-max';
import { AccordionComponent } from '@/components/v2/common/accordion';

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
        if (Number(newValue[0]) === 0 && Number(newValue[1]) === 0) {
          setDiscountMin('');
          setDiscountMax('');
        } else {
          setDiscountMin(newValue[0]);
          setDiscountMax(newValue[1]);
        }

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
      minPlaceHolder: `${pricePerCarat.range.gte}`,
      maxPlaceHolder: `${pricePerCarat.range.lte}`,
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setPricePerCaratMax(event.target.value);
        handleNumericRange({
          min: pricePerCaratMin,
          max: event.target.value,
          setErrorState: setPricePerCaratError,
          rangeCondition: pricePerCarat.range
        });
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setPricePerCaratMin(event.target.value);
        handleNumericRange({
          min: event.target.value,
          max: pricePerCaratMax,
          setErrorState: setPricePerCaratError,
          rangeCondition: pricePerCarat.range
        });
      },
      handleSliderChange: (newValue: string[]) => {
        if (Number(newValue[0]) === 0 && Number(newValue[1]) === 0) {
          setPricePerCaratMin('');
          setPricePerCaratMax('');
        } else {
          setPricePerCaratMin(newValue[0]);
          setPricePerCaratMax(newValue[1]);
        }

        handleNumericRange({
          min: newValue[0],
          max: newValue[1],
          setErrorState: setPricePerCaratError,
          rangeCondition: pricePerCarat.range
        });
      },
      maxValue: pricePerCaratMax,
      minValue: pricePerCaratMin,
      sliderValue: [pricePerCaratMin, pricePerCaratMax],
      errorText: pricePerCaratError,
      rangeMax: pricePerCarat.range.lte,
      rangeMin: pricePerCarat.range.gte,
      step: (pricePerCarat.range.lte - pricePerCarat.range.gte) / 100
    },
    {
      label: 'Amount Range',
      minPlaceHolder: `${amountRange.range.gte}`,
      maxPlaceHolder: `${amountRange.range.lte}`,
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmountRangeMax(event.target.value);
        handleNumericRange({
          min: amountRangeMin,
          max: event.target.value,
          setErrorState: setAmountRangeError,
          rangeCondition: amountRange.range
        });
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmountRangeMin(event.target.value);
        handleNumericRange({
          min: event.target.value,
          max: amountRangeMax,
          setErrorState: setAmountRangeError,
          rangeCondition: amountRange.range
        });
      },
      handleSliderChange: (newValue: string[]) => {
        if (Number(newValue[0]) === 0 && Number(newValue[1]) === 0) {
          setAmountRangeMin('');
          setAmountRangeMax('');
        } else {
          setAmountRangeMin(newValue[0]);
          setAmountRangeMax(newValue[1]);
        }
        handleNumericRange({
          min: newValue[0],
          max: newValue[1],
          setErrorState: setAmountRangeError,
          rangeCondition: amountRange.range
        });
      },
      maxValue: amountRangeMax,
      minValue: amountRangeMin,
      sliderValue: [amountRangeMin, amountRangeMax],
      errorText: amountRangeError,
      rangeMax: amountRange.range.lte,
      rangeMin: amountRange.range.gte,
      step: (amountRange.range.lte - amountRange.range.gte) / 100
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
