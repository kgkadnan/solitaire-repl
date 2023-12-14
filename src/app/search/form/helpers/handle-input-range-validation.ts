import { Dispatch, SetStateAction } from 'react';
interface IHandleNumericRange {
  from: string;
  to: string;
  setErrorState: Dispatch<SetStateAction<string>>;
  rangeCondition: { lte: number; gte: number };
}
export const handleNumericRange = ({
  from,
  to,
  setErrorState,
  rangeCondition
}: IHandleNumericRange) => {
  const parsedFrom = parseFloat(from);
  const parsedTo = parseFloat(to);

  if (isNaN(parsedFrom) || isNaN(parsedTo)) {
    setErrorState('Please provide valid numeric values for "From" and "To".');
    return;
  }

  if (parsedFrom > parsedTo) {
    setErrorState('"From" value cannot be greater than "To" value.');
    return;
  }

  if (parsedFrom < rangeCondition.gte || parsedTo > rangeCondition.lte) {
    setErrorState(
      `Values must be between ${rangeCondition.gte} and ${rangeCondition.lte}.`
    );
    return;
  }

  setErrorState('');
};
