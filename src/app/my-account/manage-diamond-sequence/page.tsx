'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { Checkbox } from '@/components/ui/checkbox';
import styles from './manage-listing-sequence.module.scss';
import { CustomFooter } from '@/components/common/footer';
import { ManageLocales } from '@/utils/translate';
import {
  useAddManageListingSequenceMutation,
  useGetManageListingSequenceQuery,
} from '@/features/api/manage-listing-sequence';
import Image from 'next/image';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { CustomDialog } from '@/components/common/dialog';
import { TableColumn } from '@/app/search/result-interface';
import { ManageListingSequenceResponse } from './interface';

const ManageListingSequence = () => {
  const { data } =
    useGetManageListingSequenceQuery<ManageListingSequenceResponse>({});
  let [addManageListingSequence] = useAddManageListingSequenceMutation();

  const [dialogContent, setDialogContent] = useState<ReactNode>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [manageableListings, setManageableListings] = useState<TableColumn[]>(
    []
  );
  const [nonManageableListings, setNonManageableListings] = useState<
    TableColumn[]
  >([]);
  const [updateSequence, setUpdateSequence] = useState<TableColumn[]>([]);

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
    if (updateSequence?.length) {
      addManageListingSequence(updateSequence)
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

  const handleCancel = () => {
    // Handle cancel action
    const manageable = data
      .filter((item) => !item.is_fixed)
      .sort((a, b) => a.sequence - b.sequence);

    setManageableListings(manageable);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const updatedList = Array.from(manageableListings);

    const movedItem = updatedList.find(
      (item) => item.id === result.draggableId
    ) as TableColumn | undefined;

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
    <div className="flex flex-col min-h-[74vh]">
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <div>
        <h1 className="text-solitaireTertiary ml-2">
          {ManageLocales(
            'app.myProfile.ManageListingSequence.NonManageableEntities'
          )}
        </h1>
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
        <h1 className="text-solitaireTertiary ml-2">
          {ManageLocales(
            'app.myProfile.ManageListingSequence.ManageableEntities'
          )}{' '}
        </h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-wrap"
              >
                {manageableListings.map(({ label, id, is_disabled }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
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
