'use client';

import React, { useState } from 'react';
import styles from './compare-stone.module.scss';
import { ManageLocales } from '@/utils/translate';
import { CustomSideScrollable } from '@/components/common/side-scrollable';
import DiamondImage from '@public/assets/images/history-of-diamonds1 1.png';
import Image from 'next/image';
import { CustomCheckBox } from '@/components/common/checkbox';
import { CustomFooter } from '@/components/common/footer';
import CloseButton from '@public/assets/icons/close-outline.svg?url';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { CustomDropdown } from '@/components/common/dropdown';
import CustomHeader from '@/components/common/header';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppSelector } from '@/hooks/hook';

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
  const comapreStoneStoreData: any = useAppSelector((store) => store);

  const [compareStoneData, setCompareStoneData] = useState<ICompareStoneData[]>(
    comapreStoneStoreData.compareStone[0]
  );
  const [differences, setDifferences] = useState<string[]>([]);

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
              fn: '',
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
    { id: 4, displayButtonLabel: 'Add to Cart', style: styles.filled },
  ];

  const handleClose = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
    const filterData = compareStoneData.filter((item: any) => item.id !== id);
    setCompareStoneData(filterData);
  };

  const [showDifferences, setShowDifferences] = useState(false);

  const handleShowDifferencesChange = () => {
    // Check if "Select All Checkbox" is checked and there are differences
    if (!showDifferences) {
      const differingValues = findDifferences(compareStoneData);
      console.log(differingValues);
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
          {/* {ManageLocales('app.compareStone.showOnlyDifferences')} */}
          Select All Checkbox
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

  const handleCheckBox = (id: string) => {
    alert('click checkbox ' + id);
  };

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
  console.log('compareStoneData', compareStoneData);

  function findDifferences(objects: any) {
    const differences: any = {};

    for (let i = 0; i < objects.length; i++) {
      for (let j = i + 1; j < objects.length; j++) {
        for (const key in objects[i]) {
          if (objects[i][key] !== objects[j][key]) {
            if (!differences[key]) {
              differences[key] = [];
            }
            if (!differences[key].find((item: any) => item.index === i)) {
              differences[key].push({ index: i, value: objects[i][key] });
            }
            if (!differences[key].find((item: any) => item.index === j)) {
              differences[key].push({ index: j, value: objects[j][key] });
            }
          }
        }
      }
    }

    return differences;
  }

  return (
    <div className={styles.comparestoneContainer}>
      <div className="sticky text-solitaireQuaternary top-0 mt-16">
        <CustomHeader data={headerData} />
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
                    {Object.keys(keyLabelMapping).map((key) => (
                      <div key={key}>
                        <span>{key !== 'id' && keyLabelMapping[key]}</span>
                      </div>
                    ))}
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
                              onClick={() => handleCheckBox(items.id)}
                            />
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

                        {Object.keys(keyLabelMapping).map((key) => {
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

      <div className="sticky bottom-0">
        <CustomFooter footerButtonData={compareStoneFooter} />
      </div>
    </div>
  );
};

export default CompareStone;
