import React, { useEffect, useMemo, useState } from 'react';
import { LeftFixedContent } from './left-panel';
import { RightSideContent } from './right-panel';
import { useCheckboxStateManagement } from '@/components/v2/common/checkbox/hooks/checkbox-state-management';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { IProduct } from '../../interface';
import { CustomSideScrollable } from './side-scroll';
import backWardArrow from '@public/v2/assets/icons/my-diamonds/backwardArrow.svg';
import Image from 'next/image';
import styles from './compare.module.scss';
import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '@/utils/v2/translate';
const CompareStone = ({
  rows,
  columns,
  goBackToListView,
  activeTab,
  isFrom,
  handleDetailImage,
  handleDetailPage,
  identifier,
  setCompareStoneData
}: any) => {
  const [mappingColumn, setMappingColumn] = useState<any>({});

  const [breadCrumLabel, setBreadCrumLabel] = useState('');
  const [compareValues, setCompareValues] = useState({});
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { selectedCheckboxes } = checkboxState;
  const { setSelectedCheckboxes } = checkboxSetState;
  const { errorSetState } = useErrorStateManagement();
  const { setIsError, setErrorText } = errorSetState;
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
    updateState(columns);
  }, []);

  function updateState(column: any) {
    const updatedObj: any = { ...mappingColumn }; // Create a copy of newObj
    column.forEach((obj: any) => {
      // Check if the key already exists in updatedObj
      if (!(obj.accessor in updatedObj)) {
        updatedObj[obj.accessor] = obj.label; // Use the dynamic key to update the object
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
    const compareStones = JSON.parse(
      localStorage.getItem('compareStone') ?? '[]'
    );

    const updatedStones = compareStones.filter(
      (stone: IProduct) => stone.id !== id
    );

    localStorage.setItem('compareStone', JSON.stringify(updatedStones));

    const filterData = rows.filter((item: IProduct) => item.id !== id);
    console.log(filterData, 'filterData');
    setCompareStoneData(filterData);
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
          Compare Stone
        </p>
      </div>
      <div className="flex h-[80%] overflow-auto border-t-[1px] border-b-[1px] border-neutral200">
        <div className="flex">
          <div className="sticky left-0 bg-neutral50 text-neutral700 text-mMedium font-medium">
            <div className="h-[234px] w-[108px] sticky top-0 text-center items-center flex justify-center border-[0.5px] border-neutral200">
              Media
            </div>
            <div className="h-[500px]">left</div>
          </div>
          <div className="w-[1000px] bg-neutral0 text-neutral900 text-mMedium font-medium">
            right
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
