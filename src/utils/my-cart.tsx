import { IProduct } from '@/app/search/result/result-interface';
import { HOLD_STATUS, MEMO_STATUS } from '@/constants/business-logic';
import { NO_STONES_SELECTED } from '@/constants/error-messages/cart';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { NO_STONES_AVAILABLE } from '@/constants/error-messages/compare-stone';
import Image from 'next/image';
import Link from 'next/link';
import { notificationBadge } from '@/features/notification/notification-slice';
import {
  NOT_MORE_THAN_100,
  SOME_STONES_ARE_ON_HOLD_MODIFY_SEARCH
} from '@/constants/error-messages/search';

interface IHandleAddToCart {
  isCheck: any;
  setIsError: any;
  setErrorText: any;
  rows: any;
  addCart: any;
  setIsPersistDialogOpen: any;
  setPersistDialogContent: any;
  dispatch: any;
  setIsCheck: any;
  setIsCheckAll?: any;
  refetchRow?: any;
}

export const handleAddToCart = ({
  isCheck,
  setIsError,
  setErrorText,
  rows,
  addCart,
  setIsPersistDialogOpen,
  setPersistDialogContent,
  dispatch,
  setIsCheck,
  setIsCheckAll,
  refetchRow
}: IHandleAddToCart) => {
  if (isCheck.length > 100) {
    setIsError(true);
    setErrorText(NOT_MORE_THAN_100);
  } else if (!isCheck.length) {
    setIsError(true);
    setErrorText(NO_STONES_SELECTED);
  } else {
    const hasMemoOut = isCheck.some((id: string) => {
      return rows.some(
        (row: IProduct) => row.id === id && row.diamond_status === MEMO_STATUS
      );
    });

    const hasHold = isCheck.some((id: string) => {
      return rows.some(
        (row: IProduct) => row.id === id && row.diamond_status === HOLD_STATUS
      );
    });

    if (hasMemoOut) {
      setErrorText(NO_STONES_AVAILABLE);
      setIsError(true);
    } else if (hasHold) {
      setIsError(true);
      setErrorText(SOME_STONES_ARE_ON_HOLD_MODIFY_SEARCH);
    } else {
      // Extract variant IDs for selected stones
      const variantIds = isCheck?.map((id: string) => {
        const myCartCheck: IProduct | object =
          rows.find((row: IProduct) => {
            return row?.id === id;
          }) ?? {};

        if (myCartCheck && 'variants' in myCartCheck) {
          return myCartCheck.variants[0]?.id;
        }

        return null;
      });

      // If there are variant IDs, add to the cart
      if (variantIds.length) {
        addCart({
          variants: variantIds
        })
          .unwrap()
          .then((res: any) => {
            // On success, show confirmation dialog and update badge
            setIsError(false);
            setErrorText('');
            setIsPersistDialogOpen(true);
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
                  Go To &quot;MyCart&quot;
                </Link>
              </div>
            );
            dispatch(notificationBadge(true));
            refetchRow();
          })
          .catch((error: any) => {
            // On error, set error state and error message
            setIsError(true);
            setErrorText(error?.data?.message);
          });
        // Clear the selected checkboxes
        setIsCheck([]);
        setIsCheckAll && setIsCheckAll(false);
      }
    }
  }
};
