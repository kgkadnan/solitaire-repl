'use client';
import React, { useState } from 'react';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from 'react-grid-dnd';

import { CustomCheckBox } from '@/components/common/checkbox';
import styles from './manage-diamond-sequence.module.scss';
import { CustomFooter } from '@/components/common/footer';
import { ManageLocales } from '@/utils/translate';

const finalSpaceCharacters = [
  {
    id: '1',
    name: 'Stock No',
    isMandatory: true,
  },
  {
    id: '2',
    name: 'Details',
    isMandatory: true,
  },
  {
    id: '3',
    name: 'Remark',
    isMandatory: false,
  },
  {
    id: '4',
    name: 'Report No',
    isMandatory: false,
  },
  {
    id: '5',
    name: 'Location',
    isMandatory: false,
  },
  {
    id: '6',
    name: 'Shaper',
    isMandatory: true,
  },
];

const ManageDiamondSequence = () => {
  // Checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  // Specific checkbox
  const handleClick = (e: any) => {
    const { id } = e.target;

    let updatedIsCheck = [...isCheck];

    if (updatedIsCheck.includes(id)) {
      updatedIsCheck = updatedIsCheck.filter((item) => item !== id);
    } else {
      updatedIsCheck.push(id);
    }

    setIsCheck(updatedIsCheck);
  };

  const [items, setItems] = React.useState(finalSpaceCharacters);

  //update sequence
  const handleUpdateDiamondSequence = () => {};

  //cancel sequence
  const handleCancel = () => {};

  //Footer Data
  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: ManageLocales(
        'app.myaccount.diamondSequence.updateSequence'
      ),
      style: styles.filled,
      fn: handleUpdateDiamondSequence,
    },
    {
      id: 2,
      displayButtonLabel: ManageLocales('app.common.footer.cancel'),
      style: styles.transparent,
      fn: handleCancel,
    },
  ];

  function onChange(
    sourceId: string,
    sourceIndex: number,
    targetIndex: number
  ) {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
  }

  return (
    <div className="flex flex-col min-h-full">
      <div className="grow">
        <GridContextProvider onChange={onChange}>
          <GridDropZone
            id="items"
            boxesPerRow={5}
            rowHeight={50}
            style={{ height: '100px' }}
          >
            {items.map(({ id, name, isMandatory }, index) => (
              <GridItem
                key={id}
                className={`${styles.cardManageDiamondSequence}`}
              >
                <div className={`${styles.gridUi}`}>
                  <div className={`${styles.lableManageDiamondSequence}`}>
                    {`${index + 1}. ${name}`}
                  </div>
                  <div className="flex items-center">
                    {!isMandatory && (
                      <CustomCheckBox
                        data={id}
                        onClick={handleClick}
                        isChecked={isCheck}
                      />
                    )}
                  </div>
                </div>
              </GridItem>
            ))}
          </GridDropZone>
        </GridContextProvider>
      </div>

      <div className="sticky bottom-0 bg-solitairePrimary mt-3">
        <CustomFooter footerButtonData={footerButtonData} />
      </div>
    </div>
  );
};

export default ManageDiamondSequence;
