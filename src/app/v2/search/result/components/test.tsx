import React, { useEffect, useState } from 'react';
import { useCheckboxStateManagement } from '@/components/v2/common/checkbox/hooks/checkbox-state-management';
import { IProduct } from '../../interface';
import backWardArrow from '@public/v2/assets/icons/my-diamonds/backwardArrow.svg';
import Image from 'next/image';
import styles from './compare.module.scss';
import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '@/utils/v2/translate';
import { FILE_URLS } from '@/constants/v2/detail-page';
import { MINIMUM_STONES } from '@/constants/error-messages/compare-stone';
import CloseButton from '@public/v2/assets/icons/close.svg';
import CheckboxComponent from '@/components/v2/common/checkbox';
import Media from '@public/v2/assets/icons/data-table/Media.svg';

const CompareStone = ({
  rows,
  columns,
  goBackToListView,
  activeTab,
  isFrom,
  handleDetailImage,
  handleDetailPage,
  identifier,
  setCompareStoneData,
  compareStoneData,
  setIsError,
  setErrorText
}: any) => {
  const [mappingColumn, setMappingColumn] = useState<any>({});

  const [breadCrumLabel, setBreadCrumLabel] = useState('');
  const [compareValues, setCompareValues] = useState({});
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { selectedCheckboxes } = checkboxState;
  const { setSelectedCheckboxes } = checkboxSetState;
  // const { errorSetState } = useErrorStateManagement();
  // const { setIsError, setErrorText } = errorSetState;
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
  console.log(columns, 'columns');
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
    // const compareStones = JSON.parse(
    //   localStorage.getItem('compareStone') ?? '[]'
    // );

    const updatedStones = compareStoneData.filter(
      (stone: IProduct) => stone.id !== id
    );

    // localStorage.setItem('compareStone', JSON.stringify(updatedStones));

    const filterData = rows.filter((item: IProduct) => item.id !== id);
    // console.log(filterData, 'filterData');
    setCompareStoneData(filterData);
  };
  console.log(mappingColumn, '----------->>>>>>');
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
                          onClick={() => {}}
                          data-testid={'compare stone checkbox'}
                          isChecked={true}
                          // isChecked={isCheck.includes(items.id) || false}
                        />
                      </div>
                      <div>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            // handleDetailImage({ row: row.original });
                          }}
                        >
                          <Image src={Media} alt="Media" />
                        </button>
                      </div>
                      <div
                        className={styles.closeButton}
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
                // goBackToListView();
              }
            },

            {
              variant: 'primary',
              label: ManageLocales('app.confirmStone.footer.confirmStone'),
              handler: () => {}
            }
          ]}
        />
      </div>
    </div>
  );
};

export default CompareStone;
