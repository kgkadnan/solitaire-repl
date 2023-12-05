import { Product } from '@/app/search/result/result-interface';
import { ICardData } from '@/app/search/saved-interface';
import { Dispatch, SetStateAction } from 'react';

//Selecting All Checkbox Function
interface IhandleSelectAllCheckbox {
  setIsCheck?: Dispatch<SetStateAction<string[]>>;
  setIsCheckAll?: Dispatch<SetStateAction<boolean>>;
  isCheckAll?: boolean;
  data: Product[] | ICardData[];
}

export const handleSelectAllCheckbox = ({
  setIsCheckAll,
  isCheckAll,
  setIsCheck,
  data,
}: IhandleSelectAllCheckbox) => {
  setIsCheckAll?.(!isCheckAll);

  setIsCheck?.(data?.map((item: Product | ICardData) => item.id));
  if (isCheckAll) {
    setIsCheck?.([]);
  }
};
