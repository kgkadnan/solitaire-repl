import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import styles from '../saved.module.scss';

interface HandleDeleteProps {
  isCheck: string[];
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorText: React.Dispatch<React.SetStateAction<string>>;
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteStoneHandler: () => void;
  numberOfPages: number;
  data: any;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}
export const handleDelete = ({
  isCheck,
  setIsError,
  setErrorText,
  setDialogContent,
  setIsDialogOpen,
  deleteStoneHandler,
  numberOfPages,
  data,
  setCurrentPage,
  currentPage
}: HandleDeleteProps) => {
  const searchTabData = JSON.parse(localStorage.getItem('Search') ?? '[]');

  if (isCheck?.length) {
    const matchingData = searchTabData.filter((item1: any, index: number) =>
      isCheck.some(item2 => {
        if (item1.id === item2) {
          item1.position = index + 1;
          return item1;
        }
      })
    );

    if (matchingData.length > 0) {
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
      setDialogContent(
        <>
          <p className="text-center mt-3">
            Do you want to Delete the selected Stones?
          </p>
          <div className="flex justify-center">
            <CustomDisplayButton
              displayButtonLabel="No"
              displayButtonAllStyle={{
                displayButtonStyle: `mr-[25px] ${styles.transparent}`
              }}
              handleClick={() => setIsDialogOpen(false)}
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
      setIsDialogOpen(true);
    }
  } else {
    setIsError(true);
    setErrorText(`You haven't picked any stones.`);
  }

  if (data?.data?.previousSearch?.length === 1 && numberOfPages !== 1) {
    setCurrentPage(currentPage - 1);
  }
};
