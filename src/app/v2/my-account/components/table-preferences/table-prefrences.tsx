/* The above code is a TypeScript React component that manages the sequence of diamond listings. It
fetches data from an API endpoint using the `useGetManageListingSequenceQuery` hook and displays the
non-manageable and manageable listings in separate sections. The manageable listings can be
reordered using drag and drop functionality provided by the `react-beautiful-dnd-grid` library. The
component also allows the user to enable or disable listings using checkboxes. The updated sequence
can be saved by clicking the 'Update Sequence' button, and the changes are sent to the server using
the `useAddManageListingSequenceMutation` */
'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  useAddManageListingSequenceMutation,
  useGetManageListingSequenceQuery
} from '@/features/api/manage-listing-sequence';
import { ListManager } from 'react-beautiful-dnd-grid';
import { ITablePrefrences } from './interface';
import styles from './table-prefrences.module.scss';

// import logger from 'logging/log-util';

import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '@/utils/v2/translate';
import CheckboxComponent from '@/components/v2/common/checkbox';
import { DialogComponent } from '@/components/v2/common/dialog';
import { ITableColumn } from '@/app/v2/search/interface';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import CommonPoppup from '@/app/v2/login/component/common-poppup';

const TablePrefrences = () => {
  /* The code is using two custom hooks `useGetManageListingSequenceQuery` and
 `useAddManageListingSequenceMutation` from the `@/features/api/manage-listing-sequence` module. */
  const { data } = useGetManageListingSequenceQuery<ITablePrefrences>({});
  const [addManageListingSequence] = useAddManageListingSequenceMutation();

  const [manageableListings, setManageableListings] = useState<ITableColumn[]>(
    []
  );

  const [isUpdateTablePreferences, setIsUpdateTablePreferences] = useState<
    ITableColumn[]
  >([]);

  const [nonManageableListings, setNonManageableListings] = useState<
    ITableColumn[]
  >([]);

  const [dialogContent, setDialogContent] = useState<ReactNode>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /**
   * The `sortList` function takes an array of `ITableColumn` objects and returns a new array sorted based
   * on the `sequence` property of each object.
   * @param {ITableColumn[]} list - The `list` parameter is an array of `ITableColumn` objects.
   * @returns The function `sortList` returns a sorted copy of the input list of `ITableColumn` objects.
   * The sorting is based on the `sequence` property of each `ITableColumn` object, in ascending order.
   */
  const sortList = (list: ITableColumn[]) => {
    return list
      .slice()
      .sort((first, second) => first.sequence - second.sequence);
  };

  /* The `useEffect` hook in the code snippet is used to update the state variables `manageableListings`
and `nonManageableListings` whenever the `data` variable changes. */
  useEffect(() => {
    if (data?.length) {
      const nonManageable = data?.filter(item => item.is_fixed);
      const manageable = data?.filter(item => !item.is_fixed);

      setManageableListings(sortList(manageable));
      setNonManageableListings(nonManageable);
    }
  }, [data]);

  /**
   * The function `handleCheckboxClick` updates the `is_disabled` property of a listing in a list of
   * manageable listings and then sorts the updated list.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
   * listing item.
   */
  const handleCheckboxClick = (id: string) => {
    const updatedListings = manageableListings.map(item =>
      item.id === id ? { ...item, is_disabled: !item.is_disabled } : item
    );

    setManageableListings(sortList(updatedListings));
    setIsUpdateTablePreferences(sortList(updatedListings));
  };

  /**
   * The `reorderList` function is used to reorder a list of items by moving an item from one position to
   * another.
   * @param {number} sourceIndex - The index of the item that is being dragged and moved to a new
   * position.
   * @param {number} destinationIndex - The destinationIndex parameter is the index where the dragged
   * item should be inserted in the updatedList array.
   * @returns The function does not explicitly return a value.
   */
  const reorderList = (sourceIndex: number, destinationIndex: number) => {
    if (destinationIndex === sourceIndex) {
      return;
    }

    const updatedList = [...manageableListings];

    // Remove the dragged item from the list
    const [draggedItem] = updatedList.splice(sourceIndex, 1);

    // Insert the dragged item at the new position
    updatedList.splice(destinationIndex, 0, draggedItem);

    // Update the sequence values based on the new order
    const updatedWithSequence = updatedList.map((item, index) => ({
      ...item,
      sequence: index + nonManageableListings.length + 1
    }));

    setManageableListings(updatedWithSequence);
    setIsUpdateTablePreferences(updatedWithSequence);
  };

  /**
   * The handleCancel function filters out fixed items from a list and updates the state with the
   * filtered list.
   */
  const handleCancel = () => {
    // Handle cancel action
    const manageable = data.filter(item => !item.is_fixed);

    setManageableListings(sortList(manageable));
    setIsUpdateTablePreferences([]);
  };

  /* The `handleUpdateDiamondSequence` function is responsible for updating the diamond sequence. */
  const handleUpdateDiamondSequence = () => {
    if (manageableListings?.length && isUpdateTablePreferences.length > 0) {
      const updatedData = [...nonManageableListings, ...manageableListings];

      addManageListingSequence(updatedData)
        .unwrap()
        .then(() => {
          setDialogContent(
            <CommonPoppup
              content=""
              status="success"
              customPoppupBodyStyle="!mt-[70px]"
              header={'Updated Successfully'}
              actionButtonData={[
                {
                  variant: 'primary',
                  label: ManageLocales('app.modal.okay'),
                  handler: () => setIsDialogOpen(false),
                  customStyle: 'flex-1 w-full h-10'
                }
              ]}
            />
          );

          setIsDialogOpen(true);
        })
        .catch(error => {
          console.log(error);
        });
    }
    // Perform actions on update
  };

  return (
    <>
      <DialogComponent dialogContent={dialogContent} isOpens={isDialogOpen} />

      <div className="w-full flex flex-col items-center justify-center mt-[16px]  min-h-[71vh]">
        {nonManageableListings?.length || manageableListings?.length ? (
          <div className="w-[789px] flex flex-col gap-[16px]">
            <h1 className="text-neutral-900 text-headingS font-medium">
              Table Preferences
            </h1>
            <div className="bg-neutral0 flex flex-col gap-[12px]  px-[24px] py-[24px]  rounded-[8px] border-solid border-[1px] border-neutral-200 shadow-sm">
              <div>
                {nonManageableListings?.length > 0 && (
                  <>
                    <div>
                      <h1 className="text-lMedium text-neutral-900 font-medium ml-2">
                        {ManageLocales(
                          'app.myAccount.tablePrefrences.nonManageableEntities'
                        )}
                      </h1>
                      <div className="flex">
                        {nonManageableListings.map(
                          ({ id, short_label }, index) => (
                            <div
                              key={id}
                              className={`${styles.cardManageListingSequence}`}
                            >
                              <div
                                className={`${styles.lableManageListingSequence}`}
                              >
                                {`${index + 1}. ${short_label}`}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </>
                )}

                {manageableListings?.length > 0 && (
                  <>
                    {' '}
                    <h1 className="text-lMedium text-neutral-900 font-medium mt-4 ml-2">
                      {ManageLocales(
                        'app.myAccount.tablePrefrences.manageableEntities'
                      )}{' '}
                    </h1>
                    <div className="w-[100%]">
                      <ListManager
                        items={manageableListings}
                        direction="horizontal"
                        maxItems={3}
                        render={({
                          short_label,
                          id,
                          is_disabled,
                          sequence
                        }) => (
                          <div
                            className={`${styles.cardManageListingSequence} `}
                          >
                            <div
                              className={`${styles.lableManageListingSequence}`}
                            >
                              {`${sequence}. ${short_label}`}
                            </div>
                            <div className="flex items-center">
                              <CheckboxComponent
                                onClick={() => handleCheckboxClick(id)}
                                isChecked={!is_disabled}
                              />
                            </div>
                          </div>
                        )}
                        onDragEnd={reorderList}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <CustomKGKLoader />
        )}

        {(nonManageableListings?.length > 0 ||
          manageableListings?.length > 0) && (
          <div className="h-[72px] mt-[18px] w-[1136px] bg-neutral0 border-[1px] border-solid border-neutral200  rounded-t-[8px] p-[16px]">
            {' '}
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: ManageLocales('app.myAccount.footer.cancel'),
                  handler: () => handleCancel()
                },
                {
                  variant: 'primary',
                  label: ManageLocales('app.myAccount.footer.update'),
                  handler: () => handleUpdateDiamondSequence()
                }
              ]}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TablePrefrences;
