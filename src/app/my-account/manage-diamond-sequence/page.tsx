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
import { ManageListingSequenceResponse } from './interface';
import { TableColumn } from '@/app/search/result/result-interface';
import { Checkbox } from '@/components/ui/checkbox';
import styles from './manage-listing-sequence.module.scss';
import { ManageLocales } from '@/utils/translate';
import { CustomFooter } from '@/components/common/footer';
import Image from 'next/image';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { CustomDialog } from '@/components/common/dialog';
import CustomLoader from '@/components/common/loader';

const ManageListingSequence = () => {
  /* The code is using two custom hooks `useGetManageListingSequenceQuery` and
 `useAddManageListingSequenceMutation` from the `@/features/api/manage-listing-sequence` module. */
  const { data } =
    useGetManageListingSequenceQuery<ManageListingSequenceResponse>({});
  const [addManageListingSequence] = useAddManageListingSequenceMutation();

  const [manageableListings, setManageableListings] = useState<TableColumn[]>(
    []
  );

  const [nonManageableListings, setNonManageableListings] = useState<
    TableColumn[]
  >([]);

  const [dialogContent, setDialogContent] = useState<ReactNode>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /* The `useEffect` hook in the code snippet is used to set a timeout for closing the dialog box after a
delay of 3000 milliseconds (3 seconds). */
  useEffect(() => {
    if (isDialogOpen) {
      // Set a timeout to close the dialog box after a delay (e.g., 3000 milliseconds)
      const timeoutId = setTimeout(() => {
        setIsDialogOpen(false);
      }, 3000);

      // Cleanup the timeout when the component unmounts or when isDialogOpen changes
      return () => clearTimeout(timeoutId);
    }
  }, [isDialogOpen]);

  // const [updateSequence, setUpdateSequence] = useState<TableColumn[]>([]);

  /**
   * The `sortList` function takes an array of `TableColumn` objects and returns a new array sorted based
   * on the `sequence` property of each object.
   * @param {TableColumn[]} list - The `list` parameter is an array of `TableColumn` objects.
   * @returns The function `sortList` returns a sorted copy of the input list of `TableColumn` objects.
   * The sorting is based on the `sequence` property of each `TableColumn` object, in ascending order.
   */
  const sortList = (list: TableColumn[]) => {
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
  };

  /**
   * The handleCancel function filters out fixed items from a list and updates the state with the
   * filtered list.
   */
  const handleCancel = () => {
    // Handle cancel action
    const manageable = data.filter(item => !item.is_fixed);

    setManageableListings(sortList(manageable));
  };

  /* The `handleUpdateDiamondSequence` function is responsible for updating the diamond sequence. */
  const handleUpdateDiamondSequence = () => {
    if (manageableListings?.length) {
      const updatedData = [...nonManageableListings, ...manageableListings];

      addManageListingSequence(updatedData)
        .unwrap()
        .then(() => {
          setDialogContent(
            <>
              <div className="max-w-[400px] flex justify-center align-middle">
                <Image src={confirmImage} alt="confirmImage" />
              </div>
              <div className="max-w-[400px] flex justify-center align-middle text-solitaireTertiary">
                Updated Successfully
              </div>
            </>
          );
          setIsDialogOpen(true);
        })
        .catch(() => {
          console.log('1111111111111111');
        });
    }
    // Perform actions on update
  };

  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: ManageLocales(
        'app.myaccount.diamondSequence.footer.updateSequence'
      ),
      style: styles.filled,
      fn: handleUpdateDiamondSequence
    },
    {
      id: 2,
      displayButtonLabel: ManageLocales(
        'app.myaccount.diamondSequence.footer.cancel'
      ),
      style: styles.transparent,
      fn: handleCancel
    }
  ];

  return (
    <>
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      {manageableListings.length && nonManageableListings.length ? (
        <>
          <div>
            <h1 className="text-solitaireTertiary ml-2">
              {ManageLocales(
                'app.myProfile.ManageListingSequence.NonManageableEntities'
              )}
            </h1>
            <div className="flex">
              {nonManageableListings.map(({ id, label }, index) => (
                <div key={id} className={`${styles.cardManageListingSequence}`}>
                  <div className={`${styles.lableManageListingSequence}`}>
                    {`${index + 1}. ${label}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr className=" border-solitaireSenary mx-2 my-3" />
          <h1 className="text-solitaireTertiary ml-2">
            {ManageLocales(
              'app.myProfile.ManageListingSequence.ManageableEntities'
            )}{' '}
          </h1>
          <div className="flex-grow min-h-[52vh]">
            <ListManager
              items={manageableListings}
              direction="horizontal"
              maxItems={5}
              render={({ label, id, is_disabled, sequence }) => (
                <div className={`${styles.cardManageListingSequence} `}>
                  <div className={`${styles.lableManageListingSequence}`}>
                    {`${sequence}. ${label}`}
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      onClick={() => handleCheckboxClick(id)}
                      checked={!is_disabled}
                    />
                  </div>
                </div>
              )}
              onDragEnd={reorderList}
            />
          </div>
        </>
      ) : (
        <CustomLoader />
      )}

      <div className="sticky-bottom bg-solitairePrimary mt-3">
        <CustomFooter footerButtonData={footerButtonData} />
      </div>
    </>
  );
};

export default ManageListingSequence;
