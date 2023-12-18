import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import styles from '../saved.module.scss';

interface HandleDeleteProps {
  isCheck: string[];
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorText: React.Dispatch<React.SetStateAction<string>>;
  setPersistDialogContent: React.Dispatch<
    React.SetStateAction<React.ReactNode>
  >;
  setIsPersistDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteStoneHandler: () => void;
  numberOfPages: number;
  data: any;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

// Handles the deletion of selected stones.
export const handleDelete = ({
  isCheck,
  setIsError,
  setErrorText,
  setPersistDialogContent,
  setIsPersistDialogOpen,
  deleteStoneHandler,
  numberOfPages,
  data,
  setCurrentPage,
  currentPage
}: HandleDeleteProps) => {
  // Get saved search data from local storage
  const searchTabData = JSON.parse(localStorage.getItem('Search') ?? '[]');

  // Check if stones are selected for deletion
  if (isCheck?.length) {
    // Filter matching data based on selected stone IDs
    const matchingData = searchTabData.filter((item1: any, index: number) =>
      isCheck.some(item2 => {
        if (item1.id === item2) {
          item1.position = index + 1;
          return item1;
        }
      })
    );

    // Check if there are matching data
    if (matchingData.length > 0) {
      // Display error message if any of the selected stones are open in search result tabs
      setIsError(true);
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

      setErrorText(errorMessage);
    } else {
      // Display confirmation dialog for stone deletion
      setPersistDialogContent(
        <>
          <p className="text-center mt-3">
            Do you want to delete the selected Saved Search?
          </p>
          <div className="flex justify-center">
            <CustomDisplayButton
              displayButtonLabel="No"
              displayButtonAllStyle={{
                displayButtonStyle: `mr-[25px] ${styles.transparent}`
              }}
              handleClick={() => setIsPersistDialogOpen(false)}
            />
            <CustomDisplayButton
              displayButtonLabel="Yes"
              displayButtonAllStyle={{
                displayButtonStyle: styles.filled
              }}
              handleClick={deleteStoneHandler}
            />
          </div>
        </>
      );
      setIsPersistDialogOpen(true);
    }
  } else {
    // Display error if no stones are selected for deletion
    setIsError(true);
    setErrorText(`You haven't picked any stones.`);
  }

  // Adjust current page if deleting the only stone on the last page
  if (data?.data?.previousSearch?.length === 1 && numberOfPages !== 1) {
    setCurrentPage(currentPage - 1);
  }
};
