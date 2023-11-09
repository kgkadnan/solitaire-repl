'use client';

import React, { useEffect, useState } from 'react';
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

interface ICompareStoneData {
  [key: string]: {
    id: string | null;
    stock_no: string | null;
    is_memo_out: boolean | null;
    status: string | null;
    discount: number | null;
    amount: number | null;
    color: string | null;
    country_origin: string | null;
    shape: string | null;
    clarity: string | null;
    cut: string | null;
    polish: string | null;
    fluorescence: string | null;
    symmetry: string | null;
    lab: string | null;
    rpt_number: string | null;
    certificate_number: number | null;
    lot_id: number | null;
    certificate_url: string | null;
    girdle: string | null;
    location: string | null;
    color_shade: string | null;
    color_shade_intensity: string | null;
    intensity: string | null;
    overtone: string | null;
    ha: string | null;
    brilliance: string | null;
    black_table: string | null;
    side_black: string | null;
    open_crown: string | null;
    open_pavilion: string | null;
    milky: string | null;
    luster: string | null;
    eye_clean: string | null;
    table_inclusion: string | null;
    side_inclusion: string | null;
    natural_crown: string | null;
    natural_pavilion: string | null;
    natural_girdle: string | null;
    surface_graining: string | null;
    internal_graining: string | null;
    carat: number | null;
    star_length: number | null;
    price_range: number | null;
    price_per_carat: number | null;
    girdle_percentage: number | null;
    pavilion_angle: number | null;
    depth_percentage: number | null;
    table_percentage: number | null;
    crown_angle: number | null;
    crown_height: number | null;
    pavilion_depth: number | null;
    lower_half: number | null;
    ratio: number | null;
    length: number | null;
    depth: number | null;
    width: number | null;
    rap: number | null;
    rap_value: number | null;
    culet: string | null;
    inscription: string | null;
    tracr_id: string | null;
    total_grade: string | null;
    disclosed_source: string | null;
    open_table: string | null;
  }[];
}

interface KeyLabelMapping {
  [key: string]: string;
}

const CompareStone = () => {
  const [compareStoneData, setCompareStoneData] = useState<ICompareStoneData[]>(
    []
  );

  useEffect(() => {
    let compareStoneStoreData = JSON.parse(
      localStorage.getItem('compareStone')!
    );

    setCompareStoneData(compareStoneStoreData);
  }, []);

  const [isCheck, setIsCheck] = useState<string[]>([]);

  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [addCart, { isLoading: updateIsLoading, isError: updateIsError }] =
    useAddCartMutation();

  const handleAddToCart = () => {
    let variantIds = isCheck.map((id) => {
      const compareStoneCheck = compareStoneData.find((compareStone: any) => {
        return compareStone.id === id;
      });

      return compareStoneCheck?.variants[0].id;
    });

    if (variantIds.length) {
      addCart({
        variants: variantIds,
      })
        .unwrap()
        .then(() => {
          console.log('hhhhhhhhhhhhhhhhhhhhh');
        })
        .catch(() => {
          console.log('1111111111111111');
        });
      setIsCheck([]);
    }
  };

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
    { id: 3, displayButtonLabel: 'Add to Wishlist', style: styles.filled },
    {
      id: 4,
      displayButtonLabel: 'Add to Cart',
      style: styles.filled,
      fn: handleAddToCart,
    },
  ];

  const handleClose = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
    const compareStones = JSON.parse(
      localStorage.getItem('compareStone') || '[]'
    );

    const updatedStones = compareStones.filter((stone: any) => stone.id !== id);

    localStorage.setItem('compareStone', JSON.stringify(updatedStones));

    const filterData = compareStoneData.filter((item: any) => item.id !== id);
    setCompareStoneData(filterData);
  };

  const [showDifferences, setShowDifferences] = useState(false);
  const [compareValues, setCompareValues] = useState({});

  const keyLabelMapping: KeyLabelMapping = {
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

  const handleShowDifferencesChange = () => {
    // Check if "Select All Checkbox" is checked and there are differences
    if (!showDifferences) {
      const propertiesToKeep = Object.keys(keyLabelMapping);
      // Create a new array with filtered data
      const filteredData = compareStoneData.map((item) => {
        const filteredItem: any = {};
        propertiesToKeep.forEach((prop) => {
          filteredItem[prop] = item[prop];
        });
        return filteredItem;
      });

      // Create a result object to store differing values
      const differingValues: any = {};

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

  //specific checkbox
  const handleClick = (id: string) => {
    let updatedIsCheck = [...isCheck];

    if (updatedIsCheck.includes(id)) {
      updatedIsCheck = updatedIsCheck.filter((item) => item !== id);
      console.log('updateIsCheck', updatedIsCheck);
    } else {
      updatedIsCheck.push(id);
    }
    setIsCheck(updatedIsCheck);
  };

  return (
    <div className={styles.comparestoneContainer}>
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
                        {'amount' in compareStoneData[0] ? 'Amount' : null}
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
                  {compareStoneData.map((items: any) => {
                    return (
                      <div key={items.id}>
                        <div
                          className={`h-[200px] border-r border-solitaireSenary ${styles.diamondImageContainer}`}
                        >
                          <Image
                            className={styles.diamondImage}
                            src={`https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/${items?.lot_id}/still.jpg`}
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
                    const { discount, amount } = diamond;
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
                            <p>{amount}</p>
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
