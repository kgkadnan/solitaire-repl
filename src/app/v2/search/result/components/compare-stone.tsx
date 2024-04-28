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
import confirmIcon from '@public/v2/assets/icons/modal/confirm.svg';
import { useAddCartMutation } from '@/features/api/cart';
import { useRouter } from 'next/navigation';
import errorSvg from '@public/v2/assets/icons/modal/error.svg';
import { handleConfirmStone } from '../helpers/handle-confirm-stone';

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
  setIsDetailPage
}: any) => {
  const [mappingColumn, setMappingColumn] = useState<any>({});

  const [breadCrumLabel, setBreadCrumLabel] = useState('');
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { selectedCheckboxes } = checkboxState;
  const { setSelectedCheckboxes } = checkboxSetState;
  const [addCart] = useAddCartMutation();
  const router = useRouter();

  useEffect(() => {
    if (isFrom === 'My Cart') {
      setBreadCrumLabel('My Cart');
    }
    if (isFrom.length) {
      setBreadCrumLabel(isFrom);
    } else {
      const storedSelection = localStorage.getItem('Search');

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
    setMappingColumn(updatedObj); // Update the state with the updated object
  }

  type HandleCloseType = (event: React.MouseEvent, id: string) => void;

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
              <>
                <div className="absolute left-[-84px] top-[-84px]">
                  <Image src={confirmIcon} alt="confirmIcon" />
                </div>
                <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                  <h1 className="text-headingS text-neutral900 !font-medium	">
                    {res?.message}
                  </h1>
                  <ActionButton
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
                </div>
              </>
            );
            // On success, show confirmation dialog and update badge
            setIsError(false);
            setErrorText('');
            // triggerProductApi({
            //   url: searchUrl,
            //   limit: LISTING_PAGE_DATA_LIMIT,
            //   offset: 0
            // }).then(res => {
            //   dataTableSetState.setRows(res.data?.products);
            //   setRowSelection({});
            //   setErrorText('');
            //   setData(res.data);
            // });
            // dispatch(notificationBadge(true));
          })
          .catch(error => {
            setIsLoading(false);
            // On error, set error state and error message

            setIsDialogOpen(true);
            setDialogContent(
              <>
                <div className="absolute left-[-84px] top-[-84px]">
                  <Image src={errorSvg} alt="errorSvg" />
                </div>
                <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                  <p className="text-neutral600 text-mRegular">
                    {error?.data?.message}
                  </p>
                  <ActionButton
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
                </div>
              </>
            );
          });
        // Clear the selected checkboxes
        // setRowSelection({});
        setSelectedCheckboxes([]);
      }
      // }
    }
  };
  return (
    <div className="w-[calc(100vw-116px)] h-[calc(100vh-120px)] ">
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
          <div className="sticky left-0  min-h-[2080px] text-neutral700 text-mMedium font-medium w-[150px] z-1">
            <div className="h-[234px] sticky top-0 text-center items-center flex justify-center border-[0.5px] border-neutral200 z-2">
              Media
            </div>
            <div className=" flex flex-col">
              {Object.keys(mappingColumn).map(key => (
                <div
                  key={key}
                  className="py-2 px-4 border-[1px] border-neutral200 h-[38px]"
                >
                  {key !== 'id' && mappingColumn[key]}
                </div>
              ))}
            </div>
          </div>
          <div className=" bg-neutral0 text-neutral900 text-mMedium font-medium min-h-[2080px]">
            <div className="flex h-[234px] sticky top-0 ">
              {rows.map((items: IProduct) => (
                <div key={items.id} className="w-[200px]">
                  <div
                    className={`h-[234px] flex flex-col border-[0.5px] border-neutral200  p-2 gap-[10px]`}
                  >
                    <div className="w-[180px] h-[175px]">
                      <Image
                        className={styles.diamondImage}
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
                <div className={`w-[200px] `} key={diamond.id}>
                  {Object.keys(mappingColumn).map(key => (
                    <div
                      key={key}
                      className="py-2 px-4 border-[1px] border-neutral200 h-[38px] whitespace-nowrap overflow-hidden overflow-ellipsis"
                    >
                      {key !== 'id' ? diamond[key] || '-' : ''}
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
              variant: 'secondary',
              label: 'Add to Cart',
              handler: () => {
                handleAddToCartFromCompareStone();
              }
            },

            {
              variant: 'primary',
              label: ManageLocales('app.confirmStone.footer.confirmStone'),
              handler: () => {
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
                  setIsDetailPage
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
