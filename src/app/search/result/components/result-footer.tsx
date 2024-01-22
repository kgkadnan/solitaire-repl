import { CustomFooter } from '@/components/common/footer';
import React from 'react';
import styles from '../search-results.module.scss';
import { ManageLocales } from '@/utils/translate';
import { CustomDropdown } from '@/components/common/dropdown';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { IResultFooterProps } from '../result-interface';
import { useAddCartMutation } from '@/features/api/cart';
import { useAppDispatch } from '@/hooks/hook';
import { handleConfirmStone } from '@/components/common/confirm-stone/helper/handle-confirm';
import { performDownloadExcel } from '@/utils/perform-download-excel';
import { handleCompareStone } from '@/utils/compare-stone';
import { SELECT_STONE_TO_PERFORM_ACTION } from '@/constants/error-messages/search';
import { handleAddToCart } from '@/utils/my-cart';

export const ResultFooter: React.FC<IResultFooterProps> = ({
  rows,
  refetchRow,
  modalSetState,
  checkboxState,
  checkboxSetState,
  errorSetState,
  errorState,
  confirmStoneSetState
}) => {
  /* The above code is using the `useAppDispatch` hook from the Redux toolkit in a TypeScript React
  component. It is assigning the returned dispatch function to the `dispatch` constant. */
  const dispatch = useAppDispatch();

  const [downloadExcel] = useDownloadExcelMutation();
  const [addCart] = useAddCartMutation();

  const { isError, errorText } = errorState;
  const { setIsError, setErrorText } = errorSetState;
  const {
    setDialogContent,
    setIsDialogOpen,
    setIsSliderOpen,
    setPersistDialogContent,
    setIsPersistDialogOpen
  } = modalSetState;
  const { isCheck } = checkboxState;
  const { setIsCheck, setIsCheckAll } = checkboxSetState;
  const { setConfirmStoneData, setIsComeFromConfirmStone } =
    confirmStoneSetState;

  /**
   * The function `downloadExcelFunction` checks if a stone is selected and performs a download action if
   * it is.
   */
  const downloadExcelFunction = () => {
    if (isCheck.length === 0) {
      setIsError(true);
      setErrorText(SELECT_STONE_TO_PERFORM_ACTION);
    } else if (isCheck.length) {
      performDownloadExcel({
        products: isCheck,
        downloadExcelApi: downloadExcel,
        setDialogContent,
        setIsDialogOpen,
        setIsCheck,
        setIsCheckAll,
        setIsError
      });
    }
  };

  const downloadAllTabsExcel = () => {
    const searchTabsData = JSON.parse(localStorage.getItem('Search')!);
    const allTabsIds = searchTabsData.map((tab: any) => tab.searchId);

    performDownloadExcel({
      previousSearch: allTabsIds,
      downloadExcelApi: downloadExcel,
      setDialogContent,
      setIsDialogOpen,
      setIsCheck,
      setIsCheckAll,
      setIsError
    });
  };

  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: (
        <CustomDropdown
          dropdownTrigger={
            <CustomDisplayButton
              displayButtonLabel={ManageLocales('app.searchResult.footer.more')}
            />
          }
          dropdownMenu={[
            {
              label: 'Share',
              fn: ''
            },
            {
              label: 'Download Excel',
              fn: downloadExcelFunction
            },
            {
              label: 'Find Matching Pair',
              fn: ''
            },
            {
              label: 'Compare Stone',
              fn: () =>
                handleCompareStone({
                  isCheck,
                  setIsError,
                  setErrorText,
                  activeCartRows: rows
                })
            }
          ]}
        />
      )
    },
    {
      id: 2,
      displayButtonLabel: ManageLocales(
        'app.searchResult.footer.downloadAllResults'
      ),
      style: styles.transparent,
      fn: downloadAllTabsExcel
    },
    {
      id: 3,
      displayButtonLabel: ManageLocales(
        'app.searchResult.footer.bookAppointment'
      ),
      style: styles.transparent,
      fn: () => {}
    },
    {
      id: 4,
      displayButtonLabel: ManageLocales('app.searchResult.footer.addToCart'),
      style: styles.transparent,
      fn: () =>
        handleAddToCart({
          isCheck,
          setIsError,
          setErrorText,
          rows: rows,
          addCart,
          setIsPersistDialogOpen,
          setPersistDialogContent,
          dispatch,
          setIsCheck,
          refetchRow
        })
    },
    {
      id: 5,
      displayButtonLabel: ManageLocales('app.searchResult.footer.confirmStone'),
      style: styles.filled,
      fn: () =>
        handleConfirmStone(
          isCheck,
          rows,
          setErrorText,
          setIsError,
          setIsSliderOpen,
          setConfirmStoneData,
          setIsComeFromConfirmStone
        )
    }
  ];

  const legendsData = [
    {
      label: ManageLocales('app.searchResult.footer.memo'),
      backGroundColor: 'bg-solitaireSenary'
    },
    {
      label: ManageLocales('app.searchResult.footer.inCart'),
      backGroundColor: 'bg-[#614C4B]'
    },
    {
      label: ManageLocales('app.searchResult.footer.onHold'),
      backGroundColor: 'bg-solitaireQuaternary'
    }
  ];

  return (
    <div className="sticky-bottom bg-solitairePrimary mt-3">
      <div className="flex border-t-2 border-solitaireSenary items-center py-3 gap-3">
        {legendsData.map(items => {
          return (
            <div className="flex items-center gap-3" key={items && items.label}>
              <span
                className={`text-solitaireTertiary px-2 rounded-[2px] ${
                  items && items.backGroundColor
                }`}
              >
                0000000000
              </span>
              <p className="text-solitaireTertiary text-sm">
                {items && items.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex border-t-2 border-solitaireSenary items-center justify-between">
        {isError && (
          <div className="w-[30%]">
            <p className="text-solitaireError text-base ">{errorText}</p>
          </div>
        )}
        <CustomFooter
          footerButtonData={footerButtonData}
          noBorderTop={styles.paginationContainerStyle}
        />
      </div>
    </div>
  );
};
