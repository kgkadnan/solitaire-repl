'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import styles from './compare-stone.module.scss';
import { ManageLocales } from '@/utils/translate';
import { CustomSideScrollable } from '@/components/common/side-scrollable';
import Image from 'next/image';
import { CustomCheckBox } from '@/components/common/checkbox';
import { CustomFooter } from '@/components/common/footer';
import CloseButton from '@public/assets/icons/close-outline.svg?url';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { CustomDropdown } from '@/components/common/dropdown';
import CustomHeader from '@/components/common/header';
import { Checkbox } from '@/components/ui/checkbox';
import { useAddCartMutation } from '@/features/api/cart';
import { Product } from '../search/result-interface';
import { IDifferValue, IKeyLabelMapping } from './compare-stone-interface';
import { FILE_URLS } from '@/constants/business-logic';
import { CustomDialog } from '@/components/common/dialog';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { useAppDispatch } from '@/hooks/hook';
import { notificationBadge } from '@/features/notification/notification-slice';

const CompareStone = () => {
  // Initialize necessary state variables
  const dispatch = useAppDispatch();
  const [compareStoneData, setCompareStoneData] = useState<Product[]>([]);
  const [dialogContent, setDialogContent] = useState<ReactNode>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState<string>('');
  // Initialize state for displaying differences in stone properties
  const [showDifferences, setShowDifferences] = useState(false);
  const [compareValues, setCompareValues] = useState({});

  // UseMutation to add items to the cart
  const [addCart, { isLoading: updateIsLoading, isError: updateIsError }] =
    useAddCartMutation();

  // Handle adding items to the cart
  const handleAddToCart = () => {
    if (!isCheck.length) {
      setIsError(true);
      setErrorText(`You haven't picked any stones.`);
    } else {
      // Extract variant IDs for selected stones
      let variantIds = isCheck?.map((id: string) => {
        const compareStoneCheck: Product | {} =
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
          variants: variantIds,
        })
          .unwrap()
          .then((res) => {
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
          .catch((error) => {
            // On error, set error state and error message
            setIsError(true);
            setErrorText(error?.data?.message);
          });
        // Clear the selected checkboxes
        setIsCheck([]);
      }
    }
  };

  // Define footer buttons for the compare stone component
  const compareStoneFooter = [
    {
      id: 1,
      displayButtonLabel: (
        <CustomDropdown
          dropdownTrigger={<CustomDisplayButton displayButtonLabel="More" />}
          dropdownMenu={[
            {
              label: 'Share',
              fn: '',
            },
            {
              label: 'Download Excel',
              fn: () => {},
            },
            {
              label: 'Find Matching Pair',
              fn: '',
            },
          ]}
        />
      ),
    },
    { id: 2, displayButtonLabel: 'Confirm Stone', style: styles.transparent },
    {
      id: 4,
      displayButtonLabel: 'Add to Cart',
      style: styles.filled,
      fn: handleAddToCart,
    },
  ];

  // Define key-label mapping for stone properties
  const keyLabelMapping: IKeyLabelMapping = {
    id: 'id',
    shape: 'Shape',
    lab: 'Lab',
    rap: 'Rap($)',
    price_per_carat: 'PR/CT',
    carat: 'Carat',
    color: 'Color',
    clarity: 'Clarity',
    color_shade: 'Color Shade',
    cut: 'Cut',
    polish: 'Polish',
    crown_angle: 'C/A',
    crown_height: 'C/H',
    symmetry: 'Symmetry',
    table_percentage: 'Table%',
    depth_percentage: 'Depth%',
    width: 'Width',
    depth: 'Depth',
    ratio: 'Ratio',
    ha: 'H&A',
    girdle: 'Girdle',
    pavilion_angle: 'P/A',
    pavilion_depth: 'P/D',
    culet: 'Culet',
    inscription: 'Ins.',
    origin_country: 'Origin',
    star_length: 'S/L',
    girdle_percentage: 'Girdle%',
    luster: 'Luster',
  };

  // Handle closing a compare stone item
  const handleClose = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
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

  // Handle change in show differences checkbox
  const handleShowDifferencesChange = () => {
    // Check if "Select All Checkbox" is checked and there are differences
    if (!showDifferences) {
      const propertiesToKeep: string[] = Object.keys(keyLabelMapping);
      // Create a new array with filtered data
      const filteredData = compareStoneData.map((item: Product) => {
        let filteredItem: Product | any = {} as Product;
        propertiesToKeep.forEach((prop) => {
          filteredItem[prop] = item[prop as keyof Product];
        });
        return filteredItem;
      });

      // Create a result object to store differing values
      const differingValues: IDifferValue = {};

      // Iterate over the properties in the first object
      for (const key in filteredData[0]) {
        if (filteredData[0].hasOwnProperty(key)) {
          // Compare values for the current key in all objects
          const values = filteredData.map((item) => item[key]);

          // Check if there are differing values
          if ([...new Set(values)].length > 1) {
            differingValues[key] = values;
          }
        }
      }

      setCompareValues(differingValues);
    }
    setShowDifferences(!showDifferences);
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
          onClick={handleShowDifferencesChange}
          data-testid={'Select All Checkbox'}
        />
      </div>
    ),
    overriddenStyles: {
      headerDataStyles: `flex items-end`,
    },
  };

  // Define a specific checkbox click handler
  const handleClick = (id: string) => {
    let updatedIsCheck = [...isCheck];

    if (updatedIsCheck.includes(id)) {
      updatedIsCheck = updatedIsCheck.filter((item) => item !== id);
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

  return (
    <div className={styles.comparestoneContainer}>
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <div className="sticky text-solitaireQuaternary top-0 mt-16">
        <CustomHeader
          data={headerData}
          mainDivStyle={styles.mainHeaderStyle}
          visibleStyle={styles.visibleStyle}
        />
      </div>
      {compareStoneData?.length && (
        <div className={styles.compareStoneContentContainer}>
          <CustomSideScrollable
            leftFixedStyle={styles.leftFixedContent}
            leftFixedContent={
              <>
                <p
                  className={`border-b border-r border-solitaireSenary ${styles.compareStoneLeftFixed}`}
                >
                  {ManageLocales('app.compareStone.diamondImage')}
                </p>

                {/* Keys */}
                <div
                  className={`border-r border-solitaireSenary ${styles.compareDiamondKeys}`}
                >
                  <div
                    className={`sticky top-[200px] w-full bg-solitaireSecondary`}
                  >
                    <div>
                      <div>
                        {'discount' in compareStoneData[0] ? 'Discount' : null}
                      </div>
                    </div>
                    <div>
                      <div>
                        {'amount' in compareStoneData[0]?.variants[0]?.prices[0]
                          ? 'Amount'
                          : null}
                      </div>
                    </div>
                  </div>
                  <div>
                    {!showDifferences
                      ? Object.keys(keyLabelMapping).map((key) => (
                          <div key={key}>
                            <span>{key !== 'id' && keyLabelMapping[key]}</span>
                          </div>
                        ))
                      : Object.keys(compareValues).map((key) => {
                          return (
                            <div key={key}>
                              <span>
                                {key !== 'id' && keyLabelMapping[key]}
                              </span>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </>
            }
            rightSideContent={
              <>
                <div
                  className={`flex border-b border-solitaireSenary ${styles.dimaondImageContainer}`}
                >
                  {compareStoneData.map((items: Product) => {
                    return (
                      <div key={items.id}>
                        <div
                          className={`h-[200px] border-r border-solitaireSenary ${styles.diamondImageContainer}`}
                        >
                          <Image
                            className={styles.diamondImage}
                            src={`${FILE_URLS.IMG.replace(
                              '***',
                              items?.lot_id ?? ''
                            )}`}
                            alt="Diamond Image"
                            width={180}
                            height={200}
                          />

                          <div className={styles.compareStoneCheckbox}>
                            <CustomCheckBox
                              data={items.id}
                              onClick={() => handleClick(items.id)}
                            />
                          </div>

                          <div
                            className={styles.closeButton}
                            onClick={(event) =>
                              compareStoneData.length > 2
                                ? handleClose(event, items.id)
                                : (setIsError(true),
                                  setErrorText(
                                    'Two stones should be available for comparison.'
                                  ))
                            }
                          >
                            <CloseButton />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* values */}
                <div className={`flex ${styles.compareStonesValueContainer}`}>
                  {compareStoneData.map((diamond: any) => {
                    const { discount } = diamond;
                    return (
                      <div
                        className={`border-r border-solitaireSenary ${styles.compareStoneValue}`}
                        key={diamond.id}
                      >
                        <div className="sticky top-[200px] w-full bg-solitaireSecondary">
                          <div className="">
                            <p>{discount}</p>
                          </div>
                          <div className="">
                            <p>{diamond.variants[0].prices[0].amount}</p>
                          </div>
                        </div>

                        {!showDifferences
                          ? Object.keys(keyLabelMapping).map((key) => {
                              return (
                                <div key={key}>
                                  {key !== 'id'
                                    ? diamond[key]
                                      ? diamond[key]
                                      : '-'
                                    : ''}
                                </div>
                              );
                            })
                          : Object.keys(compareValues).map((key) => {
                              return (
                                <div key={key}>
                                  {key !== 'id'
                                    ? diamond[key]
                                      ? diamond[key]
                                      : '-'
                                    : ''}
                                </div>
                              );
                            })}
                      </div>
                    );
                  })}
                </div>
              </>
            }
          />
        </div>
      )}

      <div className="sticky bottom-0 flex border-t-2 border-solitaireSenary items-center justify-between">
        {isError && (
          <div className="w-[30%]">
            <p className="text-red-700 text-base ">{errorText}</p>
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
