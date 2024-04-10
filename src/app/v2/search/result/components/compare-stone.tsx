import {
  RenderMeasurements,
  RenderTracerId
} from '@/components/v2/common/data-table/helpers/render-cell';
import Tooltip from '@/components/v2/common/tooltip';
import {
  RednderLocation,
  RenderAmount,
  RenderCarat,
  RenderCartLotId,
  RenderDetails,
  RenderDiscount,
  RenderLab
} from '@/components/v2/table/helpers/render-cell';
import React, { useEffect, useMemo, useState } from 'react';
import { LeftFixedContent } from './left-panel';
import { RightSideContent } from './right-panel';
import styles from './compare.module.scss';
import { useCheckboxStateManagement } from '@/components/v2/common/checkbox/hooks/checkbox-state-management';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { IProduct } from '../../interface';
import { CustomSideScrollable } from './side-scroll';
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
  const [rowSelection, setRowSelection] = useState({});
  const [mappingColumn, setMappingColumn] = useState<any>({});

  const [breadCrumLabel, setBreadCrumLabel] = useState('');
  const [compareValues, setCompareValues] = useState({});
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { selectedCheckboxes } = checkboxState;
  const { setSelectedCheckboxes } = checkboxSetState;
  const { errorSetState } = useErrorStateManagement();
  const { setIsError, setErrorText } = errorSetState;
  console.log(rows, 'rows--------');
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
    // setMappingColumn(())
  }, []);

  function updateState(column: any) {
    console.log(column, 'column');
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
  console.log('---------------------', mappingColumn);
  return (
    <div className="flex">
      {/* <div>
        {
          
        }
      </div>
      <div role="scrollable-container" className={styles.scrollableContainer}>
        <div
          className={`${styles.scrollText}`}
          data-testid="scrollable-container"
        >
          {
           
          }
        </div>
      </div> */}
      <CustomSideScrollable
        leftFixedContent={
          <LeftFixedContent
            compareStoneData={rows}
            // showDifferences={showDifferences}
            keyLabelMapping={mappingColumn}
            compareValues={compareValues}
          />
        }
        rightSideContent={
          <RightSideContent
            compareStoneData={rows}
            // showDifferences={showDifferences}
            keyLabelMapping={mappingColumn}
            compareValues={compareValues}
            handleClick={handleClick}
            handleClose={handleClose}
            setIsError={setIsError}
            setErrorText={setErrorText}
            setIsCheck={setSelectedCheckboxes}
            isCheck={selectedCheckboxes}
          />
        }
      />
    </div>
  );
};

export default CompareStone;
