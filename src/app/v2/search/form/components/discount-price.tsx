'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { handleNumericRange } from '../helpers/handle-input-range-validation';
import { amountRange, discount, pricePerCarat } from '@/constants/v2/form';
import { SliderWithMinMaxInput } from '@/components/v2/common/slider-with-min-max';
import { AccordionComponent } from '@/components/v2/common/accordion';
import { formatNumber } from '@/utils/fix-two-digit-number';

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
  setMinMaxError?: any;
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
  discountError,
  setMinMaxError
}: IShapeProps) => {
  const discountPriceAmoutData = [
    {
      label: 'Discount %',
      minPlaceHolder: `${discount.range.gte}`,
      maxPlaceHolder: `${discount.range.lte}`,
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setDiscountMax(event.target.value);
          handleNumericRange({
            min: discountMin,
            max: event.target.value,
            setErrorState: setDiscountError,
            rangeCondition: discount.range,
            setMinMaxError
          });
        }
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^-?\d*\.?\d{0,2}$/.test(event.target.value)) {
          setDiscountMin(event.target.value);
          handleNumericRange({
            min: event.target.value,
            max: discountMax,
            setErrorState: setDiscountError,
            rangeCondition: discount.range,
            setMinMaxError
          });
        }
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
          rangeCondition: discount.range,
          setMinMaxError
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
      maxPlaceHolder: `${formatNumber(pricePerCarat.range.lte)}`,
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setPricePerCaratMax(event.target.value);
          handleNumericRange({
            min: pricePerCaratMin,
            max: event.target.value,
            setErrorState: setPricePerCaratError,
            rangeCondition: pricePerCarat.range,
            setMinMaxError
          });
        }
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setPricePerCaratMin(event.target.value);
          handleNumericRange({
            min: event.target.value,
            max: pricePerCaratMax,
            setErrorState: setPricePerCaratError,
            rangeCondition: pricePerCarat.range,
            setMinMaxError
          });
        }
      },
      handleSliderChange: (newValue: string[]) => {
        if (Number(newValue[0]) === 0 && Number(newValue[1]) === 0) {
          setPricePerCaratMin('');
          setPricePerCaratMax('');
        } else {
          setPricePerCaratMin(newValue[0]);
          setPricePerCaratMax(formatNumber(Number(newValue[1])));
        }

        handleNumericRange({
          min: newValue[0],
          max: newValue[1],
          setErrorState: setPricePerCaratError,
          rangeCondition: pricePerCarat.range,
          setMinMaxError
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
      maxPlaceHolder: `${formatNumber(amountRange.range.lte)}`,
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setAmountRangeMax(event.target.value);
          handleNumericRange({
            min: amountRangeMin,
            max: event.target.value,
            setErrorState: setAmountRangeError,
            rangeCondition: amountRange.range,
            setMinMaxError
          });
        }
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setAmountRangeMin(event.target.value);
          handleNumericRange({
            min: event.target.value,
            max: amountRangeMax,
            setErrorState: setAmountRangeError,
            rangeCondition: amountRange.range,
            setMinMaxError
          });
        }
      },
      handleSliderChange: (newValue: string[]) => {
        if (Number(newValue[0]) === 0 && Number(newValue[1]) === 0) {
          setAmountRangeMin('');
          setAmountRangeMax('');
        } else {
          setAmountRangeMin(newValue[0]);
          setAmountRangeMax(formatNumber(Number(newValue[1])));
        }
        handleNumericRange({
          min: newValue[0],
          max: newValue[1],
          setErrorState: setAmountRangeError,
          rangeCondition: amountRange.range,
          setMinMaxError
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
          <div className="flex flex-wrap justify-between px-[16px] py-[24px] gap-[16px] ">
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
