import { INVALID_INPUT } from '@/constants/error-messages/confirm-stone';
import React, { Dispatch, SetStateAction } from 'react';

interface IHandleRadioDayValue {
  event: React.ChangeEvent<HTMLInputElement>;
  setInputError: Dispatch<SetStateAction<boolean>>;
  setSelectedDaysInputValue: Dispatch<SetStateAction<string>>;
  setInputErrorContent: Dispatch<SetStateAction<string>>;
}

/**
 * The function handles the change event of a radio input and updates the state based on the input
 * value.
 * @param event - The event parameter is of type React.ChangeEvent<HTMLInputElement>. It represents the
 * event that occurred when the radio button value is changed.
 */
export const handleRadioDayValue = ({
  event,
  setInputError,
  setSelectedDaysInputValue,
  setInputErrorContent
}: IHandleRadioDayValue) => {
  const inputValue = parseFloat(event.target.value);
  if (inputValue >= 121) {
    setInputError(true);
    setInputErrorContent(INVALID_INPUT);
    const formattedValue = event.target.value;
    setSelectedDaysInputValue(formattedValue);
  } else if (inputValue) {
    setInputError(false);
    setInputErrorContent('');
    const formattedValue = event.target.value;
    setSelectedDaysInputValue(formattedValue);
  } else if (event.target.value === '') {
    setInputError(false);
    setInputErrorContent('');
    // If the input is empty, clear the state
    setSelectedDaysInputValue('');
  }
};
