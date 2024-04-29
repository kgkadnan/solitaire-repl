import {
  MAX_COMPARE_STONE,
  MIN_COMPARE_STONE
} from '@/constants/business-logic';

// Define an interface for the function parameters
interface ICompareStoneParams {
  isCheck: string[];
  setIsError: (value: boolean) => void;
  setErrorText: (text: string) => void;
  activeCartRows: any;
  footerCheck?: string;
  setIsCompareStone: any;
  setCompareStoneData: any;
}

export const handleCompareStone = ({
  isCheck,
  setIsError,
  setErrorText,
  activeCartRows,
  footerCheck,
  setIsCompareStone,
  setCompareStoneData
}: ICompareStoneParams) => {
  console.log('called', isCheck);
  const maxStones = MAX_COMPARE_STONE;
  const minStones = MIN_COMPARE_STONE;
  let newCheck = Object.keys(isCheck);
  console.log(newCheck, 'newCheck');
  if (newCheck.length > maxStones) {
    setIsError(true);
    setErrorText(`You can compare a maximum of ${maxStones} stones`);
  } else if (newCheck.length < minStones) {
    setIsError(true);
    setErrorText(`Minimum ${minStones} stones are required to compare`);
  } else {
    const compareStones = newCheck?.map((id: string) => {
      return activeCartRows.find((row: any) => row.id === id);
    });

    setIsCompareStone(true);
    setCompareStoneData(
      compareStones.filter(value => value !== null && value !== undefined)
    );
    // window.open(
    //   `/v2/compare-stone${footerCheck ? '?source=' + footerCheck : ''}`,
    //   '_blank'
    // );
    setIsError(false);
    setErrorText('');
  }
};
