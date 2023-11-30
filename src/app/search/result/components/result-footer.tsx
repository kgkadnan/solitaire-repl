import { CustomFooter } from '@/components/common/footer';
import React from 'react';
import styles from '../search-results.module.scss';
import { UseErrorStateManagement } from '../hooks/error-state-management';
import { ManageLocales } from '@/utils/translate';
import { CustomDropdown } from '@/components/common/dropdown';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { UseCheckboxStateManagement } from '../hooks/checkbox-state-management';
import { UseCommonDtateManagement } from '../hooks/common-state-management';
import { UseModalStateManagement } from '../hooks/modal-state-management';
import Image from 'next/image';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { downloadExcelFromBase64 } from '@/utils/download-excel-from-base64';
import { Product } from '../result-interface';
import { useAddCartMutation } from '@/features/api/cart';
import { useAppDispatch } from '@/hooks/hook';
import { notificationBadge } from '@/features/notification/notification-slice';
import { UseConfirmStoneStateManagement } from '../hooks/confirm-stone-state-management';

export const ResultFooter: React.FC<any> = ({ rows, refetchRow }) => {
  /* The above code is using the `useAppDispatch` hook from the Redux toolkit in a TypeScript React
  component. It is assigning the returned dispatch function to the `dispatch` constant. */
  const dispatch = useAppDispatch();

  let [downloadExcel] = useDownloadExcelMutation();
  const [addCart] = useAddCartMutation();

  const { errorState, errorSetState } = UseErrorStateManagement();
  const { isError, errorText } = errorState;
  const { setIsError, setErrorText } = errorSetState;

  const { checkboxState, checkboxSetState } = UseCheckboxStateManagement();
  const { isCheck, isCheckAll } = checkboxState;
  const { setIsCheck, setIsCheckAll } = checkboxSetState;

  const { commonState, commonSetState } = UseCommonDtateManagement();
  const { yourSelectionData, totalAmount, averageDiscount } = commonState;
  const { setYourSelectionData, setTotalAmount, setAverageDiscount } =
    commonSetState;

  const { modalState, modalSetState } = UseModalStateManagement();
  const { dialogContent, isDialogOpen, isInputDialogOpen, isSliderOpen } =
    modalState;
  const {
    setDialogContent,
    setIsDialogOpen,
    setIsInputDialogOpen,
    setIsSliderOpen,
  } = modalSetState;

  const { confirmStoneSetState } = UseConfirmStoneStateManagement();
  const { setConfirmStoneData } = confirmStoneSetState;

  /* The above code is a function called `performDownloadExcel` that takes an array of `productIds` as a
parameter. */
  const performDownloadExcel = (productIds: any[]) => {
    downloadExcel({ productIds })
      .unwrap()
      .then((res: any) => {
        let { data, fileName } = res;
        if (data) {
          setDialogContent(
            <>
              <div className="max-w-[380px] flex justify-center align-middle">
                <Image src={confirmImage} alt="vector image" />
              </div>
              <div className="max-w-[380px] flex justify-center align-middle text-solitaireTertiary">
                Download Excel Successfully
              </div>
            </>
          );
          setIsDialogOpen(true);
          downloadExcelFromBase64(data, fileName);
        }
      })
      .catch((e: any) => {
        console.log('error', e);
      });

    setIsCheck([]);
    setIsCheckAll(false);
    setIsError(false);
  };
  /**
   * The function `downloadExcelFunction` checks if a stone is selected and performs a download action if
   * it is.
   */
  const downloadExcelFunction = () => {
    if (isCheck.length === 0) {
      setIsError(true);
      setErrorText('Please select a stone to perform action.');
    } else if (isCheck.length) {
      performDownloadExcel(isCheck);
    }
  };

  /**
   * The function `compareStone` checks the number of selected stones and performs different actions
   * based on the number, including displaying error messages or opening a new window to compare the
   * selected stones.
   */
  const compareStone = () => {
    if (isCheck.length > 10) {
      setIsError(true);
      setErrorText('You can compare maximum of ten stones.');
    } else if (isCheck.length < 1) {
      setIsError(true);
      setErrorText('Please select a stone to perform action');
    } else if (isCheck.length < 2) {
      setIsError(true);
      setErrorText('Minimum 2 stone to compare.');
    } else {
      let comapreStone = isCheck.map((id) => {
        return rows.find((row: Product) => row.id === id);
      });

      localStorage.setItem('compareStone', JSON.stringify(comapreStone));
      window.open('/compare-stone', '_blank');
      setIsError(false);
      setErrorText('');
    }
  };

  /* The above code is defining a function called `addToCart` in a TypeScript React component. */
  const addToCart = () => {
    if (isCheck.length > 100) {
      setIsError(true);
      setErrorText('The cart does not allow more than 100 Stones.');
    } else if (isCheck.length < 1) {
      setIsError(true);
      setErrorText('Please select a stone to perform action');
    } else {
      let hasMemoOut = isCheck.some((id) => {
        return rows.some(
          (row: Product) => row.id == id && row.diamond_status === 'MemoOut'
        );
      });

      if (hasMemoOut) {
        setErrorText(
          'Some stones in your selection are not available, Please modify your selection.'
        );
        setIsError(true);
      } else {
        let variantIds = isCheck.map((id) => {
          const selectedRow = rows.find((row: Product) => row.id === id);
          return selectedRow?.variants[0]?.id;
        });
        if (variantIds.length) {
          addCart({
            variants: variantIds,
          })
            .unwrap()
            .then((res) => {
              setIsError(false);
              setErrorText('');
              setDialogContent(
                <>
                  <div className="w-[350px] flex justify-center align-middle">
                    <Image src={confirmImage} alt="vector image" />
                  </div>
                  <div className="w-[350px] flex justify-center text-center align-middle text-solitaireTertiary pb-7">
                    {res?.message}
                  </div>
                </>
              );
              setIsDialogOpen(true);
              refetchRow();
              dispatch(notificationBadge(true));
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

  /**
   * The function `handleConfirm` checks if any selected stones have a status of "MemoOut" and displays
   * an error message if so, otherwise it opens a slider and sets the selected stones data.
   * @param {string[]} [isCheck] - An optional array of strings representing the IDs of the stones that
   * are being checked.
   */
  const handleConfirm = (isCheck?: string[]) => {
    let hasMemoOut = isCheck?.some((id) => {
      return rows.some(
        (row: Product) => row.id == id && row.diamond_status === 'MemoOut'
      );
    });

    if (hasMemoOut) {
      setErrorText(
        'Some stones in your selection are not available, Please modify your selection.'
      );
      setIsError(true);
    } else if (isCheck?.length) {
      setIsError(false);
      setErrorText('Please select a stone to perform action.');
      setIsSliderOpen(true);
      const confirmStone = rows.filter(
        (item: Product) => isCheck?.includes(item.id)
      );
      setConfirmStoneData(confirmStone);
    } else {
      setIsError(true);
      setErrorText('Please select a stone to perform action.');
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
                displayButtonStyle: styles.transparent,
              }}
            />
          }
          dropdownMenu={[
            {
              label: 'Share',
              fn: '',
            },
            {
              label: 'Download Excel',
              fn: downloadExcelFunction,
            },
            {
              label: 'Find Matching Pair',
              fn: '',
            },
            {
              label: 'Compare Stone',
              fn: compareStone,
            },
          ]}
        />
      ),
    },
    {
      id: 2,
      displayButtonLabel: ManageLocales(
        'app.searchResult.footer.bookAppointment'
      ),
      style: styles.transparent,
      fn: () => {},
    },
    {
      id: 3,
      displayButtonLabel: ManageLocales('app.searchResult.footer.addToCart'),
      style: styles.transparent,
      fn: addToCart,
    },
    {
      id: 4,
      displayButtonLabel: ManageLocales('app.searchResult.footer.confirmStone'),
      style: styles.filled,
      fn: () => handleConfirm(isCheck),
    },
  ];

  return (
    <div className="sticky-bottom bg-solitairePrimary mt-3">
      <div className="flex border-t-2 border-solitaireSenary items-center py-3 gap-3">
        <div className="flex items-center gap-3">
          <span className="text-solitaireTertiary bg-solitaireSenary px-2 rounded-md">
            xxxxxxx
          </span>
          <p className="text-solitaireTertiary text-sm">Memo - Out</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-solitaireTertiary bg-[#614C4B] px-2 rounded-md">
            xxxxxxx
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
