'use client';

import React, { useState } from 'react';
import styles from './compare-stone.module.scss';
import { ManageLocales } from '@/utils/translate';
import { CustomSideScrollable } from '@/components/common/side-scrollable';
import { formatCassing } from '@/utils/format-cassing';
import DiamondImage from '@public/assets/images/history-of-diamonds1 1.png';
import Image from 'next/image';
import { CustomCheckBox } from '@/components/common/checkbox';
import { CustomFooter } from '@/components/common/footer';
import CloseButton from '@public/assets/icons/close-outline.svg?url';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { CustomDropdown } from '@/components/common/dropdown';
import CustomHeader from '@/components/common/header';
import { Checkbox } from '@/components/ui/checkbox';

interface DiamondData {
  id: string;
  dimaond_image: any;
  discount: string;
  amt: string;
  stone_Quantity: string;
  stone_shape: string;
  lab: string;
  rap: string;
  'price/carat': string;
  carat: string;
  color: string;
  clarity: string;
  shade: string;
  cut: string;
  polish: string;
  'C/A': string;
  'C/H': string;
  summetry: string;
  'table%': string;
  'depth%': string;
  width: string;
  depth: string;
  ratio: string;
  key_to_symbol: string;
  'h_&_a': string;
  gridle: string;
  'P/A': string;
  'P/D': string;
  culet: string;
  'ins.': string;
  origin: string;
  'S/L': string;
  'girdle%.': string;
  luster: string;
  [key: string]: string | any;
}

const CompareStone = () => {
  let data: DiamondData[] = [
    {
      id: '1',
      dimaond_image: DiamondImage,
      discount: '430.00',
      amt: '782.90',
      stone_Quantity: '1',
      stone_shape: 'princss+oval',
      lab: 'GIA',
      rap: '23800.00',
      'price/carat': '1850.00',
      carat: '1.01',
      color: 'F',
      clarity: 'WS2',
      shade: 'WHT',
      cut: 'EX',
      polish: 'EX',
      'C/A': '59.00',
      'C/H': '15.65',
      summetry: 'EX',
      'table%': '56',
      'depth%': '63.2',
      width: '7.98',
      depth: '5.06',
      ratio: '-',
      key_to_symbol: 'natural',
      'h_&_a': '-',
      gridle: 'med-stk',
      'P/A': '59.00',
      'P/D': '59.00',
      culet: 'none',
      'ins.': 'yes',
      origin: 'IND',
      'S/L': '-',
      'girdle%.': '59.00',
      luster: 'EX',
    },
    {
      id: '2',
      dimaond_image: DiamondImage,
      discount: '37.00',
      amt: '556.80',
      stone_Quantity: '1',
      stone_shape: 'princss+round',
      lab: 'GIA',
      rap: '23500.00',
      'price/carat': '1850.00',
      carat: '2.01',
      color: 'F',
      clarity: 'WS2',
      shade: 'WHT',
      cut: 'EX',
      polish: 'EX',
      'C/A': '59.00',
      'C/H': '15.65',
      summetry: 'EX',
      'table%': '56',
      'depth%': '63.2',
      width: '7.98',
      depth: '5.06',
      ratio: '-',
      key_to_symbol: 'natural',
      'h_&_a': '-',
      gridle: 'med-stk',
      'P/A': '59.00',
      'P/D': '59.00',
      culet: 'none',
      'ins.': 'yes',
      origin: 'IND',
      'S/L': '-',
      'girdle%.': '59.00',
      luster: 'EX',
    },
    {
      id: '3',
      dimaond_image: DiamondImage,
      discount: '38.00',
      amt: '556.80',
      stone_Quantity: '1',
      stone_shape: 'princss+round',
      lab: 'GIA',
      rap: '23500.00',
      'price/carat': '1850.00',
      carat: '2.01',
      color: 'F',
      clarity: 'WS2',
      shade: 'WHT',
      cut: 'EX',
      polish: 'EX',
      'C/A': '59.00',
      'C/H': '15.65',
      summetry: 'EX',
      'table%': '56',
      'depth%': '63.2',
      width: '7.98',
      depth: '5.06',
      ratio: '-',
      key_to_symbol: 'natural',
      'h_&_a': '-',
      gridle: 'med-stk',
      'P/A': '58.00',
      'P/D': '59.00',
      culet: 'none',
      'ins.': 'yes',
      origin: 'IND',
      'S/L': '-',
      'girdle%.': '59.00',
      luster: 'EX',
    },
    {
      id: '4',
      dimaond_image: DiamondImage,
      discount: '39.00',
      amt: '556.80',
      stone_Quantity: '1',
      stone_shape: 'princss+round',
      lab: 'GIA',
      rap: '23500.00',
      'price/carat': '1850.00',
      carat: '2.01',
      color: 'F',
      clarity: 'WS2',
      shade: 'WHT',
      cut: 'EX',
      polish: 'EX',
      'C/A': '59.00',
      'C/H': '15.65',
      summetry: 'EX',
      'table%': '56',
      'depth%': '63.2',
      width: '7.98',
      depth: '5.06',
      ratio: '-',
      key_to_symbol: 'natural',
      'h_&_a': '-',
      gridle: 'med-stk',
      'P/A': '59.00',
      'P/D': '59.00',
      culet: 'none',
      'ins.': 'yes',
      origin: 'IND',
      'S/L': '-',
      'girdle%.': '59.00',
      luster: 'EX',
    },
    {
      id: '5',
      dimaond_image: DiamondImage,
      discount: '36.00',
      amt: '556.80',
      stone_Quantity: '1',
      stone_shape: 'princss+round',
      lab: 'GIA',
      rap: '23500.00',
      'price/carat': '1850.00',
      carat: '2.01',
      color: 'F',
      clarity: 'WS2',
      shade: 'WHT',
      cut: 'EX',
      polish: 'EX',
      'C/A': '59.00',
      'C/H': '15.65',
      summetry: 'EX',
      'table%': '56',
      'depth%': '63.2',
      width: '7.98',
      depth: '5.06',
      ratio: '-',
      key_to_symbol: 'natural',
      'h_&_a': '-',
      gridle: 'med-stk',
      'P/A': '59.00',
      'P/D': '59.00',
      culet: 'none',
      'ins.': 'yes',
      origin: 'IND',
      'S/L': '-',
      'girdle%.': '59.00',
      luster: 'EX',
    },
    {
      id: '6',
      dimaond_image: DiamondImage,
      discount: '40.00',
      amt: '556.80',
      stone_Quantity: '1',
      stone_shape: 'princss+round',
      lab: 'GIA',
      rap: '23500.00',
      'price/carat': '1850.00',
      carat: '2.01',
      color: 'F',
      clarity: 'WS2',
      shade: 'WHT',
      cut: 'EX',
      polish: 'EX',
      'C/A': '59.00',
      'C/H': '15.65',
      summetry: 'EX',
      'table%': '56',
      'depth%': '63.2',
      width: '7.98',
      depth: '5.06',
      ratio: '-',
      key_to_symbol: 'natural',
      'h_&_a': '-',
      gridle: 'med-stk',
      'P/A': '59.00',
      'P/D': '59.00',
      culet: 'none',
      'ins.': 'yes',
      origin: 'IND',
      'S/L': '-',
      'girdle%.': '59.00',
      luster: 'EX',
    },
    {
      id: '7',
      dimaond_image: DiamondImage,
      discount: '36.00',
      amt: '556.80',
      stone_Quantity: '1',
      stone_shape: 'princss+round',
      lab: 'GIA',
      rap: '23500.00',
      'price/carat': '1850.00',
      carat: '2.01',
      color: 'F',
      clarity: 'WS2',
      shade: 'WHT',
      cut: 'EX',
      polish: 'EX',
      'C/A': '59.00',
      'C/H': '15.65',
      summetry: 'EX',
      'table%': '56',
      'depth%': '63.2',
      width: '7.98',
      depth: '5.06',
      ratio: '-',
      key_to_symbol: 'natural',
      'h_&_a': '-',
      gridle: 'med-stk',
      'P/A': '59.00',
      'P/D': '59.00',
      culet: 'none',
      'ins.': 'yes',
      origin: 'IND',
      'S/L': '-',
      'girdle%.': '59.00',
      luster: 'EX',
    },
    {
      id: '8',
      dimaond_image: DiamondImage,
      discount: '36.00',
      amt: '556.80',
      stone_Quantity: '1',
      stone_shape: 'princss+round',
      lab: 'GIA',
      rap: '23500.00',
      'price/carat': '1850.00',
      carat: '2.01',
      color: 'F',
      clarity: 'WS2',
      shade: 'WHT',
      cut: 'EX',
      polish: 'EX',
      'C/A': '59.00',
      'C/H': '15.65',
      summetry: 'EX',
      'table%': '56',
      'depth%': '63.2',
      width: '7.98',
      depth: '5.06',
      ratio: '-',
      key_to_symbol: 'natural',
      'h_&_a': '-',
      gridle: 'med-stk',
      'P/A': '59.00',
      'P/D': '59.00',
      culet: 'none',
      'ins.': 'yes',
      origin: 'IND',
      'S/L': '-',
      'girdle%.': '59.00',
      luster: 'EX',
    },
    {
      id: '9',
      dimaond_image: DiamondImage,
      discount: '36.00',
      amt: '556.80',
      stone_Quantity: '1',
      stone_shape: 'princss+round',
      lab: 'GIA',
      rap: '23500.00',
      'price/carat': '1850.00',
      carat: '2.01',
      color: 'F',
      clarity: 'WS2',
      shade: 'WHT',
      cut: 'EX',
      polish: 'EX',
      'C/A': '59.00',
      'C/H': '15.65',
      summetry: 'EX',
      'table%': '56',
      'depth%': '63.2',
      width: '7.98',
      depth: '5.06',
      ratio: '-',
      key_to_symbol: 'natural',
      'h_&_a': '-',
      gridle: 'med-stk',
      'P/A': '59.00',
      'P/D': '59.00',
      culet: 'none',
      'ins.': 'yes',
      origin: 'IND',
      'S/L': '-',
      'girdle%.': '59.00',
      luster: 'EX',
    },
    {
      id: '10',
      dimaond_image: DiamondImage,
      discount: '36.00',
      amt: '556.80',
      stone_Quantity: '1',
      stone_shape: 'princss+round',
      lab: 'GIA',
      rap: '23500.00',
      'price/carat': '1850.00',
      carat: '2.01',
      color: 'F',
      clarity: 'WS2',
      shade: 'WHT',
      cut: 'EX',
      polish: 'EX',
      'C/A': '59.00',
      'C/H': '15.65',
      summetry: 'EX',
      'table%': '56',
      'depth%': '63.2',
      width: '7.98',
      depth: '5.06',
      ratio: '-',
      key_to_symbol: 'natural',
      'h_&_a': '-',
      gridle: 'med-stk',
      'P/A': '59.00',
      'P/D': '59.00',
      culet: 'none',
      'ins.': 'yes',
      origin: 'IND',
      'S/L': '-',
      'girdle%.': '59.00',
      luster: 'EX',
    },
  ];
  const [compareStoneData, setCompareStoneData] = useState<DiamondData[]>(data);
  const [differences, setDifferences] = useState<string[]>([]);

  const compareStoneFooter = [
    {
      id: 1,
      displayButtonLabel: (
        <CustomDropdown
          dropdownTrigger={<CustomDisplayButton displayButtonLabel="More" />}
          dropdownMenuLabel={['Share', 'Download Excel', 'Find Matching Pair']}
        />
      ),
    },
    { id: 2, displayButtonLabel: 'Confirm Stone', style: styles.transparent },
    { id: 3, displayButtonLabel: 'Add to Wishlist', style: styles.filled },
    { id: 4, displayButtonLabel: 'Add to Cart', style: styles.filled },
  ];

  const handleClose = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
    const filterData = compareStoneData.filter((item) => item.id !== id);
    setCompareStoneData(filterData);
  };

  const [showDifferences, setShowDifferences] = useState(false);

  const handleShowDifferencesChange = () => {
    setShowDifferences(!showDifferences);
    setDifferences([]);
  };

  const hasDifferences = (diamond: any) => {
    // Iterate through all diamonds in compareStoneData
    for (const otherDiamond of compareStoneData) {
      if (otherDiamond.id !== diamond.id) {
        // Compare the current property of diamond with the same property in otherDiamond
        Object.keys(diamond).forEach((key) => {
          if (
            key !== 'id' &&
            key !== 'diamond_image' &&
            !differences.includes(key) &&
            diamond[key] !== otherDiamond[key]
          ) {
            setDifferences([...differences, key]);
          }
        });
      }
    }
    return false;
  };

  //Header Data
  const headerData = {
    headerHeading: ManageLocales('app.compareStone.heading'),
    searchCount: compareStoneData.length,
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

  return (
    <div className={styles.comparestoneContainer}>
      <div className="sticky text-solitaireQuaternary top-0 mt-16">
        <CustomHeader data={headerData} />
      </div>
      {compareStoneData.length && (
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
                        {formatCassing(
                          'discount' in compareStoneData[0] ? 'discount' : null
                        )}
                      </div>
                    </div>
                    <div>
                      <div>
                        {formatCassing(
                          'amt' in compareStoneData[0] ? 'amt' : null
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    {Object?.entries(compareStoneData[0]).map(
                      (diamond: any) => {
                        return (
                          <>
                            <div key={diamond.id}>
                              {Object.entries(diamond).map(
                                ([key, value]: any) =>
                                  key === '0' &&
                                  value !== 'dimaond_image' &&
                                  value !== 'id' &&
                                  value !== 'amt' &&
                                  value !== 'discount' && (
                                    <div key={key}>
                                      <div>
                                        {showDifferences
                                          ? differences.includes(value)
                                            ? formatCassing(value)
                                            : ''
                                          : formatCassing(value)}
                                      </div>
                                    </div>
                                  )
                              )}
                            </div>
                          </>
                        );
                      }
                    )}
                  </div>
                </div>
              </>
            }
            rightSideContent={
              <>
                <div
                  className={`flex border-b border-solitaireSenary ${styles.dimaondImageContainer}`}
                >
                  {compareStoneData.map((items) => {
                    return (
                      <div key={items.id}>
                        <div
                          className={`h-[200px] border-r border-solitaireSenary ${styles.diamondImageContainer}`}
                        >
                          <Image
                            className={styles.diamondImage}
                            src={items.dimaond_image}
                            alt="Diamond Image"
                          />

                          <div className={styles.compareStoneCheckbox}>
                            <CustomCheckBox data={items.id} />
                          </div>

                          <div
                            className={styles.closeButton}
                            onClick={(event) => handleClose(event, items.id)}
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
                  {compareStoneData.map((diamond) => {
                    const {
                      id,
                      dimaond_image,
                      discount,
                      amt,
                      ...diamondWithoutImage
                    } = diamond;
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
                            <p>{amt}</p>
                          </div>
                        </div>

                        {Object.entries(diamondWithoutImage).map(
                          ([key, value]: any) => {
                            hasDifferences(diamondWithoutImage);
                            return (
                              <div key={key}>
                                {showDifferences
                                  ? differences.includes(key)
                                    ? value
                                    : ''
                                  : value}
                              </div>
                            );
                          }
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            }
          />
        </div>
      )}

      <div className="sticky bottom-0">
        <CustomFooter footerButtonData={compareStoneFooter} />
      </div>
    </div>
  );
};

export default CompareStone;
