import { CustomFooter } from '@/components/common/footer';
import React from 'react';
import styles from '../search-results.module.scss';
import { ManageLocales } from '@/utils/translate';
import { CustomDropdown } from '@/components/common/dropdown';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';

import Image from 'next/image';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { IResultFooterProps, Product } from '../result-interface';
import { useAddCartMutation } from '@/features/api/cart';
import { useAppDispatch } from '@/hooks/hook';
import { notificationBadge } from '@/features/notification/notification-slice';
import { handleConfirmStone } from '@/components/common/confirm-stone/helper/handle-confirm';
import { performDownloadExcel } from '@/utils/perform-download-excel';
import Link from 'next/link';
import { handleCompareStone } from '@/utils/compare-stone';
import {
  NOT_MORE_THAN_100,
  SELECT_STONE_TO_PERFORM_ACTION,
  SOME_STONES_NOT_AVAILABLE
} from '@/constants/error-messages/search';

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

  /* The above code is defining a function called `addToCart` in a TypeScript React component. */
  const addToCart = () => {
    if (isCheck.length > 100) {
      setIsError(true);
      setErrorText(NOT_MORE_THAN_100);
    } else if (isCheck.length < 1) {
      setIsError(true);
      setErrorText(SELECT_STONE_TO_PERFORM_ACTION);
    } else {
      const hasMemoOut = isCheck.some((id: string) => {
        return rows.some(
          (row: Product) => row.id === id && row.diamond_status === 'MemoOut'
        );
      });

      if (hasMemoOut) {
        setErrorText(SOME_STONES_NOT_AVAILABLE);
        setIsError(true);
      } else {
        const variantIds = isCheck.map((id: string) => {
          const selectedRow = rows.find((row: Product) => row.id === id);
          return selectedRow?.variants[0]?.id;
        });
        if (variantIds.length) {
          addCart({
            variants: variantIds
          })
            .unwrap()
            .then(res => {
              setIsError(false);
              setErrorText('');
              setPersistDialogContent(
                <div className="text-center  flex flex-col justify-center items-center ">
                  <div className="w-[350px] flex justify-center items-center mb-3">
                    <Image src={confirmImage} alt="vector image" />
                  </div>
                  <div className="w-[350px]  text-center text-solitaireTertiary pb-3">
                    {res?.message}
                  </div>
                  <Link
                    href={'/my-cart?active-tab=active'}
                    className={` p-[6px] w-[150px] bg-solitaireQuaternary text-[#fff] text-[14px] rounded-[5px]`}
                  >
                    Go To Cart
                  </Link>
                </div>
              );
              setIsPersistDialogOpen(true);
              dispatch(notificationBadge(true));
              refetchRow();
            })
            .catch((error: any) => {
              setIsError(true);
              setErrorText(error?.data?.message);
            });
          setIsCheck([]);
          setIsCheckAll(false);
        }
      }
    }
  };

  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: (
        <CustomDropdown
          dropdownTrigger={
            <CustomDisplayButton
              displayButtonLabel={ManageLocales('app.searchResult.footer.more')}
              displayButtonAllStyle={{
                displayButtonStyle: styles.transparent
              }}
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
        'app.searchResult.footer.bookAppointment'
      ),
      style: styles.transparent,
      fn: () => {}
    },
    {
      id: 3,
      displayButtonLabel: ManageLocales('app.searchResult.footer.addToCart'),
      style: styles.transparent,
      fn: addToCart
    },
    {
      id: 4,
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

  return (
    <div className="sticky-bottom bg-solitairePrimary mt-3">
      <div className="flex border-t-2 border-solitaireSenary items-center py-3 gap-3">
        <div className="flex items-center gap-3">
          <span className="text-solitaireTertiary bg-solitaireSenary px-2 rounded-[2px]">
            0000000000
          </span>
          <p className="text-solitaireTertiary text-sm">Memo</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-solitaireTertiary bg-[#614C4B] px-2 rounded-[2px]">
            0000000000
          </span>
          <p className="text-solitaireTertiary text-sm">In Cart</p>
        </div>
      </div>

      <div className="flex border-t-2 border-solitaireSenary items-center justify-between">
        {isError && (
          <div className="w-[30%]">
            <p className="text-red-700 text-base ">{errorText}</p>
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
