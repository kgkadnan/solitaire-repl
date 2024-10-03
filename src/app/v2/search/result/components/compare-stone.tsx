import React, { useEffect, useState } from 'react';
import { useCheckboxStateManagement } from '@/components/v2/common/checkbox/hooks/checkbox-state-management';
import { IProduct } from '../../interface';
import backWardArrow from '@public/v2/assets/icons/my-diamonds/backwardArrow.svg';
import Image from 'next/image';
import styles from './compare.module.scss';
import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '@/utils/v2/translate';
import { FILE_URLS } from '@/constants/v2/detail-page';
import {
  MINIMUM_STONES,
  NO_STONES_SELECTED
} from '@/constants/error-messages/compare-stone';
import CloseButton from '@public/v2/assets/icons/close.svg';
import CheckboxComponent from '@/components/v2/common/checkbox';
import Media from '@public/v2/assets/icons/data-table/Media.svg';
import { NOT_MORE_THAN_300 } from '@/constants/error-messages/search';
import { useAddCartMutation } from '@/features/api/cart';
import { useRouter } from 'next/navigation';
import { handleConfirmStone } from '../helpers/handle-confirm-stone';
import NoImageFound from '@public/v2/assets/icons/compare-stone/fallback.svg';
import CommonPoppup from '@/app/v2/login/component/common-poppup';
import { formatNumber } from '@/utils/fix-two-digit-number';
import { formatNumberWithCommas } from '@/utils/format-number-with-comma';
import { RednderLocation } from '@/components/v2/table/helpers/render-cell';
import { useCheckProductAvailabilityMutation } from '@/features/api/product';
import { HOLD_STATUS, MEMO_STATUS } from '@/constants/business-logic';
import { getShapeDisplayName } from '@/utils/v2/detail-page';

const CompareStone = ({
  rows,
  columns,
  goBackToListView,
  activeTab,
  isFrom,
  handleDetailImage,
  setCompareStoneData,
  compareStoneData,
  setIsError,
  setErrorText,
  setIsLoading,
  setIsDialogOpen,
  setDialogContent,
  setIsConfirmStone,
  setConfirmStoneData,
  setIsDetailPage,
  isMatchingPair = false,
  modalSetState,
  refreshCompareStone
}: any) => {
  const [mappingColumn, setMappingColumn] = useState<any>({});
  const [checkProductAvailability] = useCheckProductAvailabilityMutation({});
  const [breadCrumLabel, setBreadCrumLabel] = useState('');
  const [imageLoadingStatus, setImageLoadingStatus] = useState<any>([]);
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { selectedCheckboxes } = checkboxState;
  const { setSelectedCheckboxes } = checkboxSetState;
  const [addCart] = useAddCartMutation();
  const router = useRouter();

  useEffect(() => {
    if (rows.length > 0) {
      setImageLoadingStatus(new Array(rows.length).fill(true));
    }
  }, []);

  const handleImageLoad = (index: number) => {
    // Set the specific image as loaded
    setImageLoadingStatus((prevState: any) => {
      const newStatus = [...prevState];
      newStatus[index] = false;
      return newStatus;
    });
  };

  useEffect(() => {
    if (isFrom === 'My Cart') {
      setBreadCrumLabel('My Cart');
    }
    if (isFrom.length) {
      setBreadCrumLabel(isFrom);
    } else {
      const storedSelection = isMatchingPair
        ? localStorage.getItem('MatchingPair')
        : localStorage.getItem('Search');

      if (!storedSelection) return;

      if (activeTab <= 0) return;

      const selections = JSON.parse(storedSelection);

      const isExcist = selections[activeTab - 1]?.saveSearchName;

      if (isExcist?.length > 0) {
        setBreadCrumLabel(isExcist);
      } else {
        setBreadCrumLabel(`Result ${activeTab}`);
      }
    }
  }, []);
  useEffect(() => {
    updateState(columns);
  }, [columns]);
  function updateState(column: any) {
    const updatedObj: any = { ...mappingColumn }; // Create a copy of newObj
    column?.forEach((obj: any) => {
      // Check if the key already exists in updatedObj
      if (!(obj.accessor in updatedObj)) {
        updatedObj[obj.accessor] = obj.short_label; // Use the dynamic key to update the object
      }
    });
    // Remove the 'details' key from updatedObj
    delete updatedObj.details;

    setMappingColumn(updatedObj); // Update the state with the updated object
  }

  type HandleCloseType = (_event: React.MouseEvent, _id: string) => void;

  const handleClick = (id: string) => {
    let updatedIsCheck = [...selectedCheckboxes];

    if (updatedIsCheck.includes(id)) {
      updatedIsCheck = updatedIsCheck.filter(item => item !== id);
    } else {
      updatedIsCheck.push(id);
    }
    setSelectedCheckboxes(updatedIsCheck);
    setIsError(false);
  };
  const handleClose: HandleCloseType = (event, id) => {
    const filterData = rows.filter((item: IProduct) => item.id !== id);

    setCompareStoneData(filterData);
  };
  const handleAddToCartFromCompareStone = () => {
    if (selectedCheckboxes.length > 300) {
      setIsError(true);
      setErrorText(NOT_MORE_THAN_300);
    } else if (!selectedCheckboxes.length) {
      setIsError(true);
      setErrorText(NO_STONES_SELECTED);
    } else {
      setIsLoading(true);
      const variantIds = selectedCheckboxes
        ?.map((id: string) => {
          const myCartCheck: IProduct | object =
            rows.find((row: IProduct) => {
              return row?.id === id;
            }) ?? {};

          if (myCartCheck && 'variants' in myCartCheck) {
            return myCartCheck.variants[0]?.id;
          }
          return '';
        })
        .filter(Boolean);

      // If there are variant IDs, add to the cart
      if (variantIds.length) {
        addCart({
          variants: variantIds
        })
          .unwrap()
          .then((res: any) => {
            setIsLoading(false);
            setIsDialogOpen(true);
            setDialogContent(
              <CommonPoppup
                content={''}
                status="success"
                customPoppupBodyStyle="!mt-[70px]"
                header={res?.message}
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.modal.continue'),
                    handler: () => setIsDialogOpen(false),
                    customStyle: 'flex-1 w-full h-10'
                  },
                  {
                    variant: 'primary',
                    label: 'Go to "My Cart"',
                    handler: () => {
                      router.push('/v2/my-cart');
                    },
                    customStyle: 'flex-1 w-full h-10'
                  }
                ]}
              />
            );
            // On success, show confirmation dialog and update badge
            setIsError(false);
            setErrorText('');
          })
          .catch(error => {
            setIsLoading(false);
            // On error, set error state and error message

            setIsDialogOpen(true);
            setDialogContent(
              <CommonPoppup
                content={''}
                customPoppupBodyStyle="!mt-[70px]"
                header={error?.data?.message}
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => {
                      setIsDialogOpen(false);
                    },
                    customStyle: 'flex-1 w-full h-10'
                  }
                ]}
              />
            );
          });
        // Clear the selected checkboxes
        setSelectedCheckboxes([]);
      }
      // }
    }
  };
  const renderLotId = (row: any) => {
    let statusClass = '';
    let borderClass = '';

    if (row.diamond_status === MEMO_STATUS) {
      statusClass = 'bg-legendMemoFill text-legendMemo';
      borderClass = 'border-lengendMemoBorder border-[1px] px-[8px]';
    } else if (row.diamond_status === HOLD_STATUS) {
      statusClass = 'bg-legendHoldFill  text-legendHold';

      borderClass = 'border-lengendHoldBorder border-[1px] px-[8px]';
    } else if (row?.in_cart && Object.keys(row.in_cart).length) {
      statusClass = 'bg-legendInCartFill text-legendInCart';
      borderClass = 'border-lengendInCardBorder border-[1px] px-[8px]';
    }
    return (
      <>
        <span
          className={`rounded-[4px] ${statusClass}   py-[3px] ${borderClass} `}
        >
          {row.lot_id}
        </span>
      </>
    );
  };
  const handleImageError = (event: any) => {
    event.target.src = NoImageFound.src; // Set the fallback image when the original image fails to load
  };

  return (
    <div
      className={
        isFrom === 'Diamond List'
          ? 'w-[calc(100vw-116px)] h-[calc(100vh-80px)] '
          : 'w-[calc(100vw-116px)] h-[calc(100vh-120px)] '
      }
    >
      {' '}
      <div className="flex gap-[8px] items-center p-4">
        <Image
          src={backWardArrow}
          alt="backWardArrow"
          onClick={() => {
            goBackToListView();
          }}
          className="cursor-pointer"
        />
        <button
          className="text-neutral600 text-sMedium font-regular cursor-pointer"
          onClick={() => {
            goBackToListView!();
          }}
        >
          {breadCrumLabel}
        </button>
        <span className="text-neutral600">/</span>
        <p className="text-neutral700 p-[8px] bg-neutral100 rounded-[4px] text-sMedium font-medium">
          Compare Stone ({compareStoneData.length})
        </p>
      </div>
      <div className="flex  h-[calc(100%-120px)] overflow-auto border-t-[1px] border-b-[1px] border-neutral200">
        <div className="flex ">
          <div
            className="sticky left-0  min-h-[2024px] text-neutral700 text-mMedium font-medium w-[175px] !z-5"
            style={{ zIndex: 5 }}
          >
            <div className="h-[234px] sticky top-0  items-center flex px-4 border-[0.5px] border-neutral200 bg-neutral50">
              Media
            </div>
            <div className=" flex flex-col">
              {Object.keys(mappingColumn).map(key => (
                <div
                  key={key}
                  className="py-2 px-4 border-[1px] border-neutral200 h-[38px] bg-neutral50"
                >
                  {key !== 'id' && mappingColumn[key]}
                </div>
              ))}
            </div>
          </div>
          <div className=" bg-neutral0 text-neutral900 text-mMedium font-medium min-h-[2024px] !z-2">
            <div className="flex h-[234px] sticky top-0 ">
              {rows.map((items: IProduct, index: number) => (
                <div key={items.id} className="w-[198px]">
                  <div
                    className={`h-[234px] flex flex-col border-[0.5px] border-neutral200 bg-neutral0 p-2 gap-[10px]`}
                  >
                    <div className="w-[180px] h-[175px] relative">
                      {imageLoadingStatus[index] && (
                        <div
                          className={` w-[180px] h-[145px] absolute z-[2]  bg-[#F2F4F7]  flex flex-col gap-[6px] items-center justify-center`}
                        >
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="inline w-8 h-8 text-neutral200 animate-spin fill-primaryMain"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                          <div className="text-neutral900 font-medium text-sMedium">
                            Loading {getShapeDisplayName(items?.shape ?? '')}
                            &nbsp;Image...
                          </div>
                        </div>
                      )}
                      <img
                        // className="!h-[175px] !w-[180px]"
                        src={`${FILE_URLS.IMG.replace(
                          '***',
                          items?.lot_id ?? ''
                        )}`}
                        alt="Diamond Image"
                        width={180}
                        height={175}
                        onClick={
                          () => {}
                          // handleCheckboxClick(items.id)
                        }
                        onLoad={() => {
                          handleImageLoad(index);
                        }}
                        onError={e => {
                          handleImageLoad(index);
                          handleImageError(e);
                        }}
                      />
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <CheckboxComponent
                          onClick={() => handleClick(items.id)}
                          data-testid={'compare stone checkbox'}
                          isChecked={
                            selectedCheckboxes.includes(items.id) || false
                          }
                        />
                      </div>
                      <div>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleDetailImage({ row: items });
                          }}
                        >
                          <Image src={Media} alt="Media" />
                        </button>
                      </div>
                      <div
                        className={`${styles.closeButton} cursor-pointer`}
                        data-testid={'Remove Stone'}
                        onClick={event =>
                          rows.length > 2
                            ? handleClose(event, items.id)
                            : (setIsError(true), setErrorText(MINIMUM_STONES))
                        }
                      >
                        <Image
                          src={CloseButton}
                          alt="Preview"
                          height={24}
                          width={24}
                        />

                        {/* <CloseButton /> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={`flex `}>
              {rows.map((diamond: any) => (
                <div className={`w-[198px] `} key={diamond.id}>
                  {Object.keys(mappingColumn).map(key => (
                    <div
                      key={key}
                      className="py-2 px-4 border-[1px] border-neutral200 h-[38px] whitespace-nowrap overflow-hidden overflow-ellipsis  bg-neutral0"
                    >
                      {key !== 'id' ? (
                        key === 'lot_id' ? (
                          <div>{renderLotId(diamond)}</div>
                        ) : key === 'report_comments' ? (
                          diamond[key]?.length > 0 ? (
                            diamond[key]?.toString()
                          ) : (
                            '-'
                          )
                        ) : key === 'measurements' ? (
                          `${diamond?.length ?? 0}*${diamond?.width ?? 0}*${
                            diamond?.depth ?? 0
                          }`
                        ) : key === 'amount' ? (
                          diamond?.variants?.length > 0 ? (
                            `$${
                              formatNumberWithCommas(
                                diamond?.variants[0]?.prices[0]?.amount
                              ) ?? '-'
                            }`
                          ) : (
                            '-'
                          )
                        ) : key === 'location' ? (
                          <div className="flex gap-1 items-center">
                            {RednderLocation({
                              renderedCellValue: diamond[key]
                            })}

                            {diamond[key]}
                          </div>
                        ) : key === 'rap' ? (
                          diamond[key] === undefined ||
                          diamond[key] === null ||
                          diamond[key] === 0 ? (
                            '-'
                          ) : (
                            `$${formatNumberWithCommas(diamond[key])}`
                          )
                        ) : key === 'rap_value' ? (
                          diamond[key] === undefined ||
                          diamond[key] === null ||
                          diamond[key] === 0 ? (
                            '-'
                          ) : (
                            `$${formatNumberWithCommas(diamond[key])}`
                          )
                        ) : key === 'price_per_carat' ? (
                          `${
                            diamond[key] === undefined || diamond[key] === null
                              ? '-'
                              : `$${formatNumberWithCommas(diamond[key])}`
                          }`
                        ) : key === 'discount' ? (
                          `${
                            diamond[key] === undefined || diamond[key] === null
                              ? '-'
                              : diamond[key] === 0
                              ? '0.00%'
                              : `${formatNumberWithCommas(diamond[key])}%`
                          }`
                        ) : typeof diamond[key] === 'number' ? (
                          diamond[key] === null ||
                          diamond[key] === undefined ? (
                            '-'
                          ) : (
                            formatNumber(diamond[key]) ?? '-'
                          )
                        ) : (
                          diamond[key] || '-'
                        )
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-2 flex justify-between">
        <ActionButton
          actionButtonData={[
            {
              variant: 'secondary',
              label: 'Back',
              handler: () => {
                goBackToListView();
              }
            }
          ]}
        />
        <ActionButton
          actionButtonData={[
            {
              variant: !selectedCheckboxes.length ? 'disable' : 'secondary',
              label: 'Add to Cart',
              isDisable: !selectedCheckboxes.length,
              handler: () => {
                handleAddToCartFromCompareStone();
              }
            },

            {
              variant: 'primary',
              label: ManageLocales('app.confirmStone.footer.confirmStone'),
              isDisable: !Object.keys(
                selectedCheckboxes.reduce(
                  (obj, item) => {
                    obj[item] = true;
                    return obj;
                  },
                  {} as { [key: string]: boolean }
                )
              ).length,
              handler: () => {
                // setIsCompare
                const result = selectedCheckboxes.reduce(
                  (obj, item) => {
                    obj[item] = true;
                    return obj;
                  },
                  {} as { [key: string]: boolean }
                );
                handleConfirmStone({
                  selectedRows: result,
                  rows: rows,
                  setIsError,
                  setErrorText,
                  setIsConfirmStone,
                  setConfirmStoneData,
                  setIsDetailPage,
                  router,
                  identifier: 'compare-stone',
                  modalSetState,
                  checkProductAvailability,
                  setIsLoading,
                  setSelectedCheckboxes,
                  refreshSearchResults: refreshCompareStone
                });
              }
            }
          ]}
        />
      </div>
    </div>
  );
};

export default CompareStone;
