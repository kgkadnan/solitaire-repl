import { HOLD_STATUS, MEMO_STATUS } from '@/constants/business-logic';

import {
  SELECT_STONE_TO_PERFORM_ACTION,
  SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH,
  STONE_NOT_AVAILABLE
} from '@/constants/error-messages/confirm-stone';
import { Dispatch, SetStateAction } from 'react';
import { IProduct } from '../../interface';
import { setConfirmStoneTrack } from '@/features/confirm-stone-track/confirm-stone-track-slice';
import { useAppDispatch } from '@/hooks/hook';

/**
 * Handles the confirmation of selected stones.
 * @param {string[]} isCheck - An array of IDs representing the selected stones.
 * @param {IProduct[]} rows - An array of IProduct objects representing all available stones.
 * @param {Dispatch<SetStateAction<string>>} setErrorText - A state setter function for the error text.
 * @param {Dispatch<SetStateAction<boolean>>} setIsError - A state setter function for the error flag.
 * @param {Dispatch<SetStateAction<boolean>>} setIsSliderOpen - A state setter function for the slider flag.
 * @param {Dispatch<SetStateAction<IProduct[]>>} setConfirmStoneData - A state setter function for the confirmed stones data.
 * @returns None
 */

interface IHandleConfirmStone {
  selectedRows: {};
  rows: IProduct[];
  setErrorText: Dispatch<SetStateAction<string>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
  setIsConfirmStone: Dispatch<SetStateAction<boolean>>;
  setConfirmStoneData: Dispatch<SetStateAction<IProduct[]>>;
  setIsDetailPage?: any;
  identifier?: string;
  confirmStoneTrack?: string;
  dispatch?: any;
}
export const handleConfirmStone = ({
  selectedRows,
  rows,
  setErrorText,
  setIsError,
  setIsConfirmStone,
  setConfirmStoneData,
  setIsDetailPage,
  identifier,
  confirmStoneTrack,
  dispatch
}: IHandleConfirmStone) => {
  let selectedIds = Object.keys(selectedRows);
  const hasMemoOut = selectedIds?.some(id => {
    return rows?.some(
      row => row.id === id && row.diamond_status === MEMO_STATUS
    );
  });

  const hasHold = selectedIds?.some(id => {
    return rows?.some(
      row => row.id === id && row.diamond_status === HOLD_STATUS
    );
  });

  if (hasMemoOut) {
    setErrorText(
      identifier === 'detailPage'
        ? STONE_NOT_AVAILABLE
        : SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH
    );
    setIsError(true);
  } else if (hasHold) {
    setIsError(true);
    setErrorText(
      identifier === 'detailPage'
        ? STONE_NOT_AVAILABLE
        : SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH
    );
  } else if (selectedIds?.length) {
    setIsError(false);
    setIsConfirmStone(true);
    const confirmStone = rows?.filter(item => selectedIds?.includes(item.id));
    setConfirmStoneData(confirmStone);
    setIsDetailPage && setIsDetailPage(false);
    confirmStoneTrack &&
      dispatch &&
      dispatch(setConfirmStoneTrack(confirmStoneTrack));
  } else {
    setIsError(true);
    setErrorText(SELECT_STONE_TO_PERFORM_ACTION);
  }
};
