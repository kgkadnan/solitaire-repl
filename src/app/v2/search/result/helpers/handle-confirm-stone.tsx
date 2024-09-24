import {
  AVAILABLE_STATUS,
  HOLD_STATUS,
  MEMO_STATUS
} from '@/constants/business-logic';

import {
  SELECT_STONE_TO_PERFORM_ACTION,
  SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH,
  STONE_NOT_AVAILABLE,
  STONE_NOT_AVAILABLE_MODIFY_SEARCH
} from '@/constants/error-messages/confirm-stone';
import { Dispatch, SetStateAction } from 'react';
import { IProduct } from '../../interface';
import { setConfirmStoneTrack } from '@/features/confirm-stone-track/confirm-stone-track-slice';
import CommonPoppup from '@/app/v2/login/component/common-poppup';
import { ManageLocales } from '@/utils/v2/translate';

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
  checkProductAvailability?: any;
  modalSetState?: any;
  router?: any;
  setIsLoading: any;
  refreshSearchResults?: any;
  setSelectedCheckboxes?: any;
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
  dispatch,
  checkProductAvailability,
  modalSetState,
  router,
  setIsLoading,
  refreshSearchResults,
  setSelectedCheckboxes
}: IHandleConfirmStone) => {
  let selectedIds = Object.keys(selectedRows);
  // const hasMemoOut = selectedIds?.some(id => {
  //   return rows?.some(
  //     row => row.id === id && row.diamond_status === MEMO_STATUS
  //   );
  // });

  const hasHold = selectedIds?.some(id => {
    return rows?.some(
      row => row.id === id && row.diamond_status === HOLD_STATUS
    );
  });
  // Check for stones with AVAILABLE_STATUS
  const hasAvailable = selectedIds.some(id => {
    return rows.some(
      row => row.id === id && row.diamond_status === AVAILABLE_STATUS
    );
  });

  if (hasHold && hasAvailable) {
    setErrorText(SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH);
    setIsError(true);
    // } else if (hasMemoOut) {
    //   setErrorText(
    //     identifier === 'detailPage'
    //       ? STONE_NOT_AVAILABLE
    //       : STONE_NOT_AVAILABLE_MODIFY_SEARCH
    //   );
    //   setIsError(true);
  } else if (hasHold) {
    setIsError(true);
    setErrorText(
      identifier === 'detailPage'
        ? STONE_NOT_AVAILABLE
        : STONE_NOT_AVAILABLE_MODIFY_SEARCH
    );
  } else if (selectedIds?.length) {
    setIsLoading(true);
    setIsError(false);

    const confirmStone = rows?.filter(item => selectedIds?.includes(item.id));

    const variantIds: string[] = [];

    confirmStone.forEach((ids: any) => {
      variantIds.push(ids.variants[0].id);
    });

    checkProductAvailability({
      variants: variantIds
    })
      .unwrap()
      .then((res: any) => {
        const availableStones = confirmStone.filter((stone: any) => {
          const variantKey = `${stone.variants[0].id}`;

          return res.data[variantKey]?.status === 'Available';
        });

        if (res.status === 'available') {
          setIsConfirmStone(true);
          setConfirmStoneData(confirmStone);
          setIsDetailPage && setIsDetailPage(false);
          confirmStoneTrack &&
            dispatch &&
            dispatch(setConfirmStoneTrack(confirmStoneTrack));
        } else if (res.status === 'unavailable') {
          modalSetState.setIsDialogOpen(true);
          modalSetState.setDialogContent(
            <CommonPoppup
              content={res.message}
              status="info"
              customPoppupBodyStyle="!mt-[70px]"
              header={res.title}
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: ManageLocales('app.confirmStone.updateSelection'),
                  handler: () => {
                    modalSetState.setIsDialogOpen(false);
                  },
                  customStyle: 'flex-1'
                },
                {
                  variant: 'primary',
                  label: ManageLocales('app.confirmStone.refreshSearchResults'),
                  handler: () => {
                    modalSetState.setIsDialogOpen(false);
                    if (
                      (identifier === 'dashboard' ||
                        identifier === 'detailPage' ||
                        identifier === 'compare-stone' ||
                        identifier === 'match-pair-detail') &&
                      refreshSearchResults
                    ) {
                      setSelectedCheckboxes && setSelectedCheckboxes([]);
                      setIsLoading(true);
                      refreshSearchResults();
                    } else {
                      router.refresh();
                    }
                  },
                  customStyle: 'flex-1'
                }
              ]}
            />
          );
        } else if (res.status === 'some-available') {
          modalSetState.setIsDialogOpen(true);
          modalSetState.setDialogContent(
            <CommonPoppup
              content={res.message}
              status="info"
              customPoppupBodyStyle="!mt-[70px]"
              header={res.title}
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: ManageLocales('app.confirmStone.updateSelection'),
                  handler: () => {
                    modalSetState.setIsDialogOpen(false);
                  },
                  customStyle: 'flex-1'
                },
                {
                  variant: 'primary',
                  label: ManageLocales(
                    'app.confirmStone.confirmRemainingStones'
                  ),
                  handler: () => {
                    modalSetState.setIsDialogOpen(false);
                    setIsConfirmStone(true);
                    setConfirmStoneData(availableStones);
                    setIsDetailPage && setIsDetailPage(false);
                    confirmStoneTrack &&
                      dispatch &&
                      dispatch(setConfirmStoneTrack(confirmStoneTrack));
                  },
                  customStyle: 'flex-1'
                }
              ]}
            />
          );
        }
        setIsLoading(false);
      })
      .catch((err: any) => {
        setIsLoading(false);
        console.log('err', err);
      });
  } else {
    setIsError(true);
    setErrorText(SELECT_STONE_TO_PERFORM_ACTION);
  }
};
