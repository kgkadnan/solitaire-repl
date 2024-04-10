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
const CompareStone = ({
  rows,
  columns,
  goBackToListView,
  activeTab,
  isFrom,
  handleDetailImage,
  handleDetailPage,
  identifier
}: any) => {
  const [rowSelection, setRowSelection] = useState({});
  const [mappingColumn, setMappingColumn] = useState({});

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
    // setMappingColumn(())
  }, []);

  //   function updateState(column:any) {
  //     const updatedObj = { ...mappingColumn }; // Create a copy of newObj
  //     column.forEach((obj:any) => {
  //         // Check if the key already exists in updatedObj
  //         const key = Object.keys(obj)[0]; // Get the key dynamically
  //             if (!(key in updatedObj)) {
  //                 updatedObj[key]! = obj[key]; // Use the dynamic key to update the object
  //             }
  //     });
  //     setMappingColumn(updatedObj); // Update the state with the updated object
  // }

  const mapColumns = (columns: any) =>
    columns
      ?.filter(({ is_disabled }: any) => !is_disabled)
      ?.sort(({ sequence: a }: any, { sequence: b }: any) => a - b)
      .map(({ accessor, short_label, label }: any) => {
        const commonProps = {
          accessorKey: accessor,
          header: short_label,
          enableGlobalFilter: accessor === 'lot_id',
          minSize: 5,
          maxSize: accessor === 'details' ? 100 : 200,
          size: accessor === 'measurements' ? 183 : 5,
          Header: ({ column }: any) => (
            <Tooltip
              tooltipTrigger={<span>{column.columnDef.header}</span>}
              tooltipContent={label}
              tooltipContentStyles={'z-[4]'}
            />
          )
        };

        switch (accessor) {
          case 'amount':
            return { ...commonProps, Cell: RenderAmount };
          case 'carat':
            return { ...commonProps, Cell: RenderCarat };
          case 'measurements':
            return { ...commonProps, Cell: RenderMeasurements };
          case 'discount':
            return { ...commonProps, Cell: RenderDiscount };
          case 'details':
            return {
              ...commonProps,
              Cell: ({ row }: any) => {
                return RenderDetails({ row, handleDetailImage });
              }
            };
          case 'lot_id':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue, row }: any) => {
                return RenderCartLotId({
                  renderedCellValue,
                  row,
                  handleDetailPage
                });
              }
            };
          case 'price_per_carat':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
                <span>{`${
                  renderedCellValue === 0
                    ? '0.00'
                    : renderedCellValue?.toFixed(2) ?? '0.00'
                }`}</span>
              )
            };
          case 'lab':
            return { ...commonProps, Cell: RenderLab };
          case 'location':
            return { ...commonProps, Cell: RednderLocation };
          case 'tracr_id':
            return { ...commonProps, Cell: RenderTracerId };
          default:
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: { renderedCellValue: string }) => (
                <span>{renderedCellValue ?? '-'}</span>
              )
            };
        }
      });
  const memoizedColumns = useMemo(() => mapColumns(columns), [columns]);
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
    // setCompareStoneData(filterData);
  };
  return (
    <div className="flex">
      <div>
        {
          <LeftFixedContent
            compareStoneData={rows}
            // showDifferences={showDifferences}
            keyLabelMapping={columns}
            compareValues={compareValues}
          />
        }
      </div>
      <div role="scrollable-container" className={styles.scrollableContainer}>
        <div
          className={`${styles.scrollText}`}
          data-testid="scrollable-container"
        >
          {
            <RightSideContent
              compareStoneData={rows}
              // showDifferences={showDifferences}
              keyLabelMapping={columns}
              compareValues={compareValues}
              handleClick={handleClick}
              handleClose={handleClose}
              setIsError={setIsError}
              setErrorText={setErrorText}
              setIsCheck={setSelectedCheckboxes}
              isCheck={selectedCheckboxes}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default CompareStone;
