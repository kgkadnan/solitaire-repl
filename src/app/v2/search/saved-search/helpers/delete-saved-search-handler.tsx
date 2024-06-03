import React from 'react';
import { NO_STONES_PICKED } from '@/constants/error-messages/saved';
import { ManageLocales } from '@/utils/v2/translate';
import CommonPoppup from '@/app/v2/login/component/common-poppup';

interface IDeleteSavedSearchHandler {
  selectedCheckboxes: string[];
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorText: React.Dispatch<React.SetStateAction<string>>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}

// Handles the deletion of selected stones.
export const deleteSavedSearchHandler = ({
  selectedCheckboxes,
  setIsError,
  setErrorText,
  setIsDialogOpen,
  setDialogContent,
  handleDelete
}: IDeleteSavedSearchHandler) => {
  // Get saved search data from local storage
  const searchTabData = JSON.parse(localStorage.getItem('Search') ?? '[]');

  // Check if stones are selected for deletion
  if (selectedCheckboxes?.length) {
    // Filter matching data based on selected stone IDs
    const matchingData = searchTabData.filter((item1: any, index: number) =>
      selectedCheckboxes.some(item2 => {
        if (item1.id === item2) {
          item1.position = index + 1;
          return item1;
        }
      })
    );

    // Check if there are matching data
    if (matchingData.length > 0) {
      // Display error message if any of the selected stones are open in search result tabs

      const searchNames = matchingData.map(
        (items: any) => items.saveSearchName
      );
      const resultPositions = matchingData.map((items: any) => {
        return `Search Result ${items.position}`;
      });

      const errorMessage =
        matchingData.length > 1
          ? `Your saved searches ${searchNames.join(
              ', '
            )} are already opened in ${resultPositions.join(
              ', '
            )} respectively. Please close those tabs and then try deleting it.`
          : `Your saved search ${searchNames.join(
              ', '
            )} is already opened in ${resultPositions.join(
              ', '
            )}. Please close the tab and then try deleting it.`;
      setDialogContent(
        <CommonPoppup
          content={''}
          customPoppupBodyStyle="!mt-[70px]"
          header={errorMessage}
          actionButtonData={[
            {
              variant: 'primary',
              label: ManageLocales('app.modal.okay'),
              handler: () => setIsDialogOpen(false),
              customStyle: 'flex-1 h-10'
            }
          ]}
        />
      );
      setIsDialogOpen(true);
    } else {
      setDialogContent(
        <CommonPoppup
          status="delete"
          content={ManageLocales('app.savedSearch.deleteConfirmation')}
          customPoppupBodyStyle="!mt-[70px]"
          header={'Are you sure?'}
          actionButtonData={[
            {
              variant: 'secondary',
              label: ManageLocales('app.modal.no'),
              handler: () => setIsDialogOpen(false),
              customStyle: 'flex-1 h-10'
            },
            {
              variant: 'primary',
              label: ManageLocales('app.modal.yes'),
              handler: () => {
                setIsDialogOpen(false);
                handleDelete();
              },
              customStyle: 'flex-1 h-10'
            }
          ]}
        />
      );
      setIsDialogOpen(true);
    }
  } else {
    // Display error if no stones are selected for deletion
    setIsError(true);
    setErrorText(NO_STONES_PICKED);
  }
};
