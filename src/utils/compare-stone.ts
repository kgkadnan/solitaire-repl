import { ProductItem } from '@/app/my-cart/interface';
import {
  MAX_COMPARE_STONE,
  MIN_COMPARE_STONE
} from '@/constants/business-logic';

// Define an interface for the function parameters
interface CompareStoneParams {
  isCheck: string[];
  setIsError: (value: boolean) => void;
  setErrorText: (text: string) => void;
  activeCartRows: ProductItem[];
}

export const handleCompareStone = ({
  isCheck,
  setIsError,
  setErrorText,
  activeCartRows
}: CompareStoneParams) => {
  const maxStones = MAX_COMPARE_STONE;
  const minStones = MIN_COMPARE_STONE;

  if (isCheck.length > maxStones) {
    setIsError(true);
    setErrorText(`You can compare a maximum of ${maxStones} stones`);
  } else if (isCheck.length < minStones) {
    setIsError(true);
    setErrorText(`Minimum ${minStones} stones are required to compare`);
  } else {
    const compareStones = isCheck.map((id: string) => {
      return activeCartRows.find((row: ProductItem) => row.id === id);
    });

    localStorage.setItem('compareStone', JSON.stringify(compareStones));
    window.open('/compare-stone', '_blank');

    setIsError(false);
    setErrorText('');
  }
};
