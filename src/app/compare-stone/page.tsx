'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import styles from './styles/compare-stone.module.scss';
import { ManageLocales } from '@/utils/translate';
import { CustomSideScrollable } from '@/components/common/side-scrollable';
import Image from 'next/image';
import { CustomFooter } from '@/components/common/footer';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { CustomDropdown } from '@/components/common/dropdown';
import CustomHeader from '@/components/common/header';
import { Checkbox } from '@/components/ui/checkbox';
import { useAddCartMutation } from '@/features/api/cart';
import { CustomDialog } from '@/components/common/dialog';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { useAppDispatch } from '@/hooks/hook';
import { notificationBadge } from '@/features/notification/notification-slice';
import { RightSideContent } from './components/right-side-content';
import { LeftFixedContent } from './components/left-fixed-content';
import { keyLabelMapping } from './helpers/key-label';
import { handleShowDifferencesChange } from './helpers/handle-show-difference-function';
import { Product } from '../search/result/result-interface';
import { useCheckboxStateManagement } from '@/components/common/checkbox/hooks/checkbox-state-management';

const CompareStone = () => {
  // Initialize necessary state variables
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { isCheck } = checkboxState;
  const { setIsCheck } = checkboxSetState;

  const dispatch = useAppDispatch();
  const [compareStoneData, setCompareStoneData] = useState<Product[]>([]);
  const [dialogContent, setDialogContent] = useState<ReactNode>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState<string>('');
  // Initialize state for displaying differences in stone properties
  const [showDifferences, setShowDifferences] = useState(false);
  const [compareValues, setCompareValues] = useState({});

  // UseMutation to add items to the cart
  const [addCart] = useAddCartMutation();

  // Handle adding items to the cart
  const handleAddToCart = () => {
    if (!isCheck.length) {
      setIsError(true);
      setErrorText(`You haven't picked any stones.`);
    } else {
      const hasMemoOut = isCheck.some((id: string) => {
        return compareStoneData.some(
          (compareStoneData: Product) =>
            compareStoneData.id == id &&
            compareStoneData.diamond_status === 'MemoOut'
        );
      });

      if (hasMemoOut) {
        setErrorText(
          'Some stones in your selection are not available, Please modify your selection.'
        );
        setIsError(true);
      } else {
        // Extract variant IDs for selected stones
        const variantIds = isCheck?.map((id: string) => {
          const compareStoneCheck: Product | object =
            compareStoneData.find((compareStone: Product) => {
              return compareStone?.id === id;
            }) ?? {};

          if (compareStoneCheck && 'variants' in compareStoneCheck) {
            return compareStoneCheck.variants[0]?.id;
          }

          return null;
        });

        // If there are variant IDs, add to the cart
        if (variantIds.length) {
          addCart({
            variants: variantIds
          })
            .unwrap()
            .then(res => {
              // On success, show confirmation dialog and update badge
              setIsError(false);
              setErrorText('');
              setIsDialogOpen(true);
              setDialogContent(
                <>
                  <div className="w-[350px] flex justify-center align-middle">
                    <Image src={confirmImage} alt="vector image" />
                  </div>
                  <div className="w-[350px] flex justify-center text-center align-middle text-solitaireTertiary pb-7">
                    {res?.message}
                  </div>
                </>
              );
              dispatch(notificationBadge(true));
            })
            .catch(error => {
              // On error, set error state and error message
              setIsError(true);
              setErrorText(error?.data?.message);
            });
          // Clear the selected checkboxes
          setIsCheck([]);
        }
      }
    }
  };

  // Define footer buttons for the compare stone component
  const compareStoneFooter = [
    {
      id: 1,
      displayButtonLabel: (
        <CustomDropdown
          dropdownTrigger={
            <CustomDisplayButton
              displayButtonLabel={ManageLocales('app.searchResult.footer.more')}
            />
          }
          dropdownMenu={[
            {
              label: 'Share',
              fn: ''
            },
            {
              label: 'Download Excel',
              fn: () => {}
            },
            {
              label: 'Find Matching Pair',
              fn: ''
            }
          ]}
        />
      )
    },
    { id: 2, displayButtonLabel: 'Confirm Stone', style: styles.transparent },
    {
      id: 4,
      displayButtonLabel: 'Add to Cart',
      style: styles.filled,
      fn: handleAddToCart
    }
  ];

  // Updated function type
  type HandleCloseType = (event: React.MouseEvent, id: string) => void;

  // Updated handleClose function
  const handleClose: HandleCloseType = (event, id) => {
    const compareStones = JSON.parse(
      localStorage.getItem('compareStone') ?? '[]'
    );

    const updatedStones = compareStones.filter(
      (stone: Product) => stone.id !== id
    );

    localStorage.setItem('compareStone', JSON.stringify(updatedStones));

    const filterData = compareStoneData.filter(
      (item: Product) => item.id !== id
    );
    setCompareStoneData(filterData);
  };

  //Header Data
  const headerData = {
    headerHeading: ManageLocales('app.compareStone.heading'),
    searchCount: compareStoneData?.length,
    headerData: (
      <div className="flex items-center gap-[10px] bottom-0">
        <p className="text-solitaireTertiary text-base font-medium">
          {ManageLocales('app.compareStone.showOnlyDifferences')}
        </p>
        <Checkbox
          onClick={() =>
            handleShowDifferencesChange({
              compareStoneData,
              showDifferences,
              keyLabelMapping,
              setCompareValues,
              setShowDifferences
            })
          }
          data-testid={'Select All Checkbox'}
        />
      </div>
    ),
    overriddenStyles: {
      headerDataStyles: `flex items-end`
    }
  };

  // Define a specific checkbox click handler
  const handleClick = (id: string) => {
    let updatedIsCheck = [...isCheck];

    if (updatedIsCheck.includes(id)) {
      updatedIsCheck = updatedIsCheck.filter(item => item !== id);
    } else {
      updatedIsCheck.push(id);
    }
    setIsCheck(updatedIsCheck);
    setIsError(false);
  };

  // UseEffect to fetch and set compareStoneData from local storage
  useEffect(() => {
    let compareStoneStoreData: Product[] = JSON.parse(
      localStorage.getItem('compareStone')!
    );
    setCompareStoneData(compareStoneStoreData);
  }, []);

  useEffect(() => {
    if (isDialogOpen) {
      // Set a timeout to close the dialog box after a delay (e.g., 3000 milliseconds)
      const timeoutId = setTimeout(() => {
        setIsDialogOpen(false);
      }, 3000);

      // Cleanup the timeout when the component unmounts or when isDialogOpen changes
      return () => clearTimeout(timeoutId);
    }
  }, [isDialogOpen, setIsDialogOpen]);

  return (
    <div className={styles.comparestoneContainer}>
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        data-testid={'success-indicator'}
      />
      <div className="sticky text-solitaireQuaternary top-0 mt-16">
        <CustomHeader
          data={headerData}
          mainDivStyle={styles.mainHeaderStyle}
          visibleStyle={styles.visibleStyle}
        />
      </div>
      {compareStoneData?.length > 0 && (
        <div className={styles.compareStoneContentContainer}>
          <CustomSideScrollable
            leftFixedStyle={styles.leftFixedContent}
            leftFixedContent={
              <LeftFixedContent
                compareStoneData={compareStoneData}
                showDifferences={showDifferences}
                keyLabelMapping={keyLabelMapping}
                compareValues={compareValues}
              />
            }
            rightSideContent={
              <RightSideContent
                compareStoneData={compareStoneData}
                showDifferences={showDifferences}
                keyLabelMapping={keyLabelMapping}
                compareValues={compareValues}
                handleClick={handleClick}
                handleClose={handleClose}
                setIsError={setIsError}
                setErrorText={setErrorText}
              />
            }
          />
        </div>
      )}

      <div className="sticky bottom-0 flex border-t-2 border-solitaireSenary items-center justify-between">
        {isError && (
          <div className="w-[30%]">
            <p
              data-testid={'error-indicator'}
              className="text-red-700 text-base "
            >
              {errorText}
            </p>
          </div>
        )}
        <CustomFooter
          footerButtonData={compareStoneFooter}
          noBorderTop={styles.paginationContainerStyle}
        />
      </div>
    </div>
  );
};

export default CompareStone;
