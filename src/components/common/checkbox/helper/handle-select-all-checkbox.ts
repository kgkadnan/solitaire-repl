import { IProduct } from '@/app/search/result/result-interface';
import { ICardData } from '@/app/search/saved/saved-interface';
import { Dispatch, SetStateAction } from 'react';

//Selecting All Checkbox Function
interface IHandleSelectAllCheckbox {
  setIsCheck?: Dispatch<SetStateAction<string[]>>;
  setIsCheckAll?: Dispatch<SetStateAction<boolean>>;
  isCheckAll?: boolean;
  data: IProduct[] | ICardData[];
}

export const handleSelectAllCheckbox = ({
  setIsCheckAll,
  isCheckAll,
  setIsCheck,
  data
}: IHandleSelectAllCheckbox) => {
  setIsCheckAll?.(!isCheckAll);

  setIsCheck?.(data?.map((item: IProduct | ICardData) => item.id));
  if (isCheckAll) {
    setIsCheck?.([]);
  }
};
