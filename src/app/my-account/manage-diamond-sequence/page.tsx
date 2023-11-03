'use client';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Checkbox } from '@/components/ui/checkbox';
import styles from './manage-listing-sequence.module.scss';
import { CustomFooter } from '@/components/common/footer';
import { ManageLocales } from '@/utils/translate';
// import data from './data.json';
import {
  useAddManageListingSequenceMutation,
  useGetManageListingSequenceQuery,
} from '@/features/api/manage-listing-sequence';

// Define IManageListingSequence interface

interface IManageListingSequence {
  label: string;
  accessor: string;
  sequence: number;
  is_fixed: boolean;
  is_disabled: boolean;
  id: string;
}

export interface ManageListingSequenceResponse {
  data: IManageListingSequence[];
}

const ManageListingSequence = () => {
  const { data } =
    useGetManageListingSequenceQuery<ManageListingSequenceResponse>({});
  let [addManageListingSequence] = useAddManageListingSequenceMutation();

  const [manageableListings, setManageableListings] = useState<
    IManageListingSequence[]
  >([]);
  const [nonManageableListings, setNonManageableListings] = useState<
    IManageListingSequence[]
  >([]);
  const [updateSequence, setUpdateSequence] = useState<
    IManageListingSequence[]
  >([]);

  useEffect(() => {
    if (data?.length) {
      const nonManageable = data?.filter((item) => item.is_fixed);
      const manageable = data
        ?.filter((item) => !item.is_fixed)
        ?.sort((a, b) => a.sequence - b.sequence);

      setManageableListings(manageable);
      setNonManageableListings(nonManageable);
    }
  }, [data]);

  const handleCheckboxClick = (id: string) => {
    const updatedListings = manageableListings.map((item) => {
      if (item.id === id) {
        return { ...item, is_disabled: !item.is_disabled };
      }
      return item;
    });

    setManageableListings(updatedListings);

    setUpdateSequence([...nonManageableListings, ...updatedListings]);
  };

  const handleUpdateDiamondSequence = () => {
    addManageListingSequence(updateSequence);
    console.log('update diamond sequence', updateSequence);
    // Perform actions on update
  };

  const handleCancel = () => {
    // Handle cancel action
    const manageable = data
      .filter((item) => !item.is_fixed)
      .sort((a, b) => a.sequence - b.sequence);

    setManageableListings(manageable);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const updatedList = Array.from(manageableListings);
    const movedItem = updatedList.find(
      (item) => item.id === result.draggableId
    ) as IManageListingSequence | undefined;

    if (movedItem) {
      updatedList.splice(result.source.index, 1);
      updatedList.splice(result.destination.index, 0, movedItem);

      const updatedWithSequence = updatedList.map((item, index) => ({
        ...item,
        sequence: index + nonManageableListings.length + 1,
      }));

      setManageableListings(updatedWithSequence);
      setUpdateSequence([...nonManageableListings, ...updatedWithSequence]);
    }
  };

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

  return (
    <div className="flex flex-col min-h-[84vh]">
      <div>
        <h1 className="text-solitaireTertiary ml-2">Non Manageable entities</h1>
        <div className="flex">
          {nonManageableListings.map(({ id, label }, index) => (
            <div key={id} className={`${styles.cardManageListingSequence}`}>
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided: any) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-wrap"
              >
                {manageableListings.map(({ label, id, is_disabled }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided: any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${styles.cardManageListingSequence} `}
                      >
                        <div className={`${styles.gridUi}`}>
                          <div
                            className={`${styles.lableManageListingSequence}`}
                          >{`${
                            index + 1 + nonManageableListings.length
                          }. ${label}`}</div>
                          <div className="flex items-center">
                            <Checkbox
                              onClick={() => handleCheckboxClick(id)}
                              checked={!is_disabled}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="sticky bottom-0 bg-solitairePrimary mt-3">
        <CustomFooter footerButtonData={footerButtonData} />
      </div>
    </div>
  );
};

export default ManageListingSequence;
