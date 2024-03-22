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

  if (isNaN(parsedMin) || isNaN(parsedMax)) {
    setErrorState('Please enter both “Min” & “Max”');
    setMinMaxError('Please enter both “Min” & “Max”');

    return;
  }

  if (parsedMin > parsedMax) {
    setErrorState('“Min” should be less than “Max”');
    setMinMaxError('“Min” should be less than “Max”');

    return;
  }

  if (parsedMin < rangeCondition.gte || parsedMax > rangeCondition.lte) {
    setErrorState(
      `Please enter a range between ${rangeCondition.gte} to ${rangeCondition.lte} only`
    );
    setMinMaxError(
      `Please enter a range between ${rangeCondition.gte} to ${rangeCondition.lte} only`
    );

    return;
  }
  setMinMaxError('');

  setErrorState('');
};
