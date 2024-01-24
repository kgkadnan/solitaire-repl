import { Dispatch, SetStateAction } from 'react';
interface IHandleNumericRange {
  min: string;
  max: string;
  setErrorState: Dispatch<SetStateAction<string>>;
  rangeCondition: { lte: number; gte: number };
}
export const handleNumericRange = ({
  min,
  max,
  setErrorState,
  rangeCondition
}: IHandleNumericRange) => {
  const parsedMin = parseFloat(min);
  const parsedMax = parseFloat(max);

  if (isNaN(parsedMin) || isNaN(parsedMax)) {
    setErrorState('Please enter both "Min" and "Max".');
    return;
  }

  if (parsedMin > parsedMax) {
    setErrorState('"Min" value cannot be greater than "Max" value.');
    return;
  }

  if (parsedMin < rangeCondition.gte || parsedMax > rangeCondition.lte) {
    setErrorState(
      `Values must be between ${rangeCondition.gte} and ${rangeCondition.lte}.`
    );
    return;
  }

  setErrorState('');
};
