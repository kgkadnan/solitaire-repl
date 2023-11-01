'use client';
import React, { useEffect, useState } from 'react';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  move,
  swap,
} from 'react-grid-dnd';

import { CustomCheckBox } from '@/components/common/checkbox';
import styles from './manage-listing-sequence.module.scss';
import { CustomFooter } from '@/components/common/footer';
import { ManageLocales } from '@/utils/translate';
import data from './data.json';
import { Checkbox } from '@/components/ui/checkbox';

const ManageListingSequence = () => {
  // Checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [manageableListings, setManageableListings] = useState([]);
  const [nonManageableListings, setNonManageableListings] = useState([]);
  const [updateSequence, setUpdateSequence] = useState<any>([]);

  useEffect(() => {
    const nonManageable: any = data.filter((items) => {
      return items.is_fixed === true;
    });
    const manageable: any = data
      .filter((items: any) => {
        return items.is_fixed === false;
      })
      .sort((a: any, b: any) => a.sequence - b.sequence);

    setManageableListings(manageable);
    setNonManageableListings(nonManageable);
  }, []);

  // Specific checkbox
  const handleClick = (id: string) => {
    let updatedIsCheck = [...isCheck];
    console.log('updatedIsCheck', updatedIsCheck);

    if (updatedIsCheck.includes(id)) {
      updatedIsCheck = updatedIsCheck.filter((item) => item !== id);
    } else {
      updatedIsCheck.push(id);
    }

    setIsCheck(updatedIsCheck);
  };

  console.log('isCheck', isCheck);

  //update sequence
  const handleUpdateDiamondSequence = () => {
    console.log('update diamond sequence', manageableListings);
  };

  //cancel sequence
  const handleCancel = () => {};

  //Footer Data
  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: ManageLocales(
        'app.myaccount.diamondSequence.footer.updateSequence'
      ),
      style: styles.filled,
      fn: handleUpdateDiamondSequence,
    },
    {
      id: 2,
      displayButtonLabel: ManageLocales(
        'app.myaccount.diamondSequence.footer.cancel'
      ),
      style: styles.transparent,
      fn: handleCancel,
    },
  ];

  function onChange(
    sourceId: string,
    sourceIndex: number,
    targetIndex: number
  ) {
    const nextState: any = swap(manageableListings, sourceIndex, targetIndex);

    // Update sequence numbers after reordering
    const updatedWithSequence = nextState.map((item: any, index: number) => {
      return { ...item, sequence: index + nonManageableListings.length + 1 };
    });
    setUpdateSequence([...nonManageableListings, ...updatedWithSequence]);

    setManageableListings(nextState);
  }

  return (
    <div className="flex flex-col min-h-[84vh]">
      <div>
        <h1 className="text-solitaireTertiary ml-2">Non Manageable entities</h1>
        <div className="flex">
          {nonManageableListings.map(({ id, label }, index) => (
            <div key={id} className={`${styles.cardNonManageListingSequence}`}>
              <div className={`${styles.gridUi}`}>
                <div className={`${styles.lableManageListingSequence}`}>
                  {`${index + 1}. ${label}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className=" border-solitaireSenary mx-2 my-3" />
      <div className="grow">
        <h1 className="text-solitaireTertiary ml-2">Manageable entities</h1>
        <GridContextProvider onChange={onChange}>
          <GridDropZone
            id="sequence"
            boxesPerRow={5}
            rowHeight={50}
            style={{ height: 280 * Math.ceil(data.length / 5) }}
            className="flex"
          >
            {manageableListings.map(
              ({ sequence, label, id, is_disable }, index) => (
                <GridItem
                  key={sequence}
                  className={`${styles.cardManageListingSequence}`}
                >
                  <div className={`${styles.gridUi}`}>
                    <div className={`${styles.lableManageListingSequence}`}>
                      {`${index + 1 + nonManageableListings.length}. ${label}`}
                    </div>
                    <div className="flex items-center">
                      {/* <CustomCheckBox
                      data={id}
                      onClick={handleClick}
                      isChecked={isCheck}
                    /> */}

                      <Checkbox
                        onClick={() => handleClick(id)}
                        checked={is_disable}
                      />
                    </div>
                  </div>
                </GridItem>
              )
            )}
          </GridDropZone>
        </GridContextProvider>
      </div>

      <div className="sticky bottom-0 bg-solitairePrimary mt-3">
        <CustomFooter footerButtonData={footerButtonData} />
      </div>
    </div>
  );
};

export default ManageListingSequence;
