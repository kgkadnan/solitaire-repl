import { formatNumber } from '@/utils/fix-two-digit-number';
import { Dispatch, SetStateAction } from 'react';
interface IHandleNumericRange {
  min: string;
  max: string;
  setErrorState: Dispatch<SetStateAction<string>>;
  rangeCondition: { lte: number; gte: number };
  setMinMaxError?: any;
}
export const handleNumericRange = ({
  min,
  max,
  setErrorState,
  rangeCondition,
  setMinMaxError
}: IHandleNumericRange) => {
  const parsedMin = parseFloat(min);
  const parsedMax = parseFloat(max);

  if (!parsedMin && !parsedMax) {
    setErrorState('');
    setMinMaxError('');

    return;
  }

  if (parsedMin < rangeCondition.gte || parsedMax > rangeCondition.lte) {
    setErrorState(
      `Please enter a range between ${formatNumber(
        rangeCondition.gte
      )} to ${formatNumber(rangeCondition.lte)} only`
    );
    setMinMaxError(
      `Please enter a range between ${formatNumber(
        rangeCondition.gte
      )} to ${formatNumber(rangeCondition.lte)} only`
    );

    return;
  }

  if (isNaN(parsedMin) || isNaN(parsedMax)) {
    setErrorState('Please enter both “From” & “To”');
    setMinMaxError('Please enter both “From” & “To”');

    return;
  }

  if (parsedMin > parsedMax) {
    setErrorState('“From” should be less than “To”');
    setMinMaxError('“From” should be less than “To”');

    return;
  }

  setMinMaxError('');

  setErrorState('');
};
