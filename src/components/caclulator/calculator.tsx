'use client';
import React, { useState } from 'react';
import styles from './calculator.module.scss';
import { ManageLocales } from '@/utils/translate';
import { CustomInputField } from '../common/input-field';
import { CustomInputlabel } from '../common/input-label';
import DownIcon from '@public/assets/icons/chevron-back-outline.svg?url';
import UpIcon from '@public/assets/icons/chevron-back2-outline.svg?url';
import { CustomSelect } from '../common/select';

export const CustomCalculator = () => {
  const [count, setCount] = useState<number>(0);
  let labelData = [
    {
      id: 1,
      label: ManageLocales('app.advanceSearch.shape'),
      placeholder: 'Round',
      dropdownData: [
        { id: 1, value: 'Round' },
        { id: 2, value: 'Pear' },
        { id: 3, value: 'Emerald' },
        { id: 4, value: 'Asscher' },
        { id: 5, value: 'Cushion' },
        { id: 6, value: 'Princess' },
        { id: 7, value: 'Marquise' },
        { id: 8, value: 'Oval' },
        { id: 9, value: 'Heart' },
        { id: 10, value: 'Radiant' },
      ],
    },
    {
      id: 2,
      label: ManageLocales('app.advanceSearch.color'),
      placeholder: 'D',
      dropdownData: [
        { id: 1, value: 'D' },
        { id: 2, value: 'E' },
        { id: 3, value: 'F' },
        { id: 4, value: 'G' },
        { id: 5, value: 'H' },
        { id: 6, value: 'I' },
        { id: 7, value: 'J' },
        { id: 8, value: 'K' },
        { id: 9, value: 'L' },
        { id: 10, value: 'M' },
        { id: 11, value: 'N' },
      ],
    },
    {
      id: 3,
      label: ManageLocales('app.advanceSearch.clarity'),
      placeholder: 'IF',
      dropdownData: [
        { id: 1, value: 'IF' },
        { id: 2, value: 'VVS1' },
        { id: 3, value: 'VVS2' },
        { id: 4, value: 'VS1' },
        { id: 5, value: 'VS2' },
        { id: 6, value: 'S11' },
        { id: 7, value: 'S12' },
        { id: 8, value: 'S13' },
        { id: 9, value: '11' },
        { id: 10, value: '12' },
        { id: 11, value: '13' },
      ],
    },
  ];

  return (
    <>
      <div className={styles.calculatorMainContainer}>
        <div
          className={`border-b border-solitaireSenary ${styles.calculatorHeading}`}
        >
          <p>{ManageLocales('app.topNav.yourDiamond')}</p>
        </div>
        <div
          className={`border-b border-solitaireSenary ${styles.calculatorInputsContainer}`}
        >
          <div className={styles.inputAndLabel}>
            <CustomInputlabel
              htmlfor={ManageLocales('app.sideNav.cart')}
              label={ManageLocales('app.sideNav.cart')}
              overriddenStyles={{ label: styles.inputLabels }}
            />
            <CustomInputField
              type="text"
              placeholder="99.99"
              name="carat"
              style={{
                input: styles.calculatorInput,
                inputMain: styles.calculatorInputMain,
              }}
            />
          </div>
          <div className="flex">
            {labelData.map((items) => {
              return (
                <>
                  <div className={styles.inputAndLabel}>
                    <CustomInputlabel
                      htmlfor={items.label}
                      label={items.label}
                      overriddenStyles={{ label: styles.inputLabels }}
                    />

                    <CustomSelect
                      data={items.dropdownData}
                      placeholder={items.placeholder}
                      style={{
                        selectTrigger: styles.selectTrigger,
                        selectContent: styles.selectcontent,
                      }}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div
          className={`border-b border-solitaireSenary ${styles.pricingMainDiv}`}
        >
          <div>
            <p className={styles.priceHeading}>
              {ManageLocales('app.topNav.listPrice')}
            </p>
            <div className="">
              <CustomInputlabel
                htmlfor=""
                label="$/CT"
                overriddenStyles={{ label: styles.priceLabel }}
              />
              <div className={styles.pricingValue}>
                <p>730</p>
              </div>
            </div>
            <div className="">
              <CustomInputlabel
                htmlfor=""
                label="$ Total"
                overriddenStyles={{ label: styles.priceLabel }}
              />
              <div className={styles.pricingValue}>
                <p>730</p>
              </div>
            </div>
          </div>

          <div>
            <p className={styles.priceHeading}>
              {ManageLocales('app.topNav.yourPrice')}
            </p>
            <div className="">
              <CustomInputlabel
                htmlfor=""
                label="$/CT"
                overriddenStyles={{ label: styles.priceLabel }}
              />
              <div className={styles.pricingValue}>
                <p>730</p>
              </div>
            </div>
            <div className="">
              <CustomInputlabel
                htmlfor=""
                label="$ Total"
                overriddenStyles={{ label: styles.priceLabel }}
              />
              <div className={styles.pricingValue}>
                <p>730</p>
              </div>
            </div>
          </div>

          <div>
            <p className={styles.priceHeading}>Rap%</p>
            <div className={styles.rapPriceMainDiv}>
              <UpIcon
                className={styles.upIcon}
                onClick={() => setCount(count + 1)}
              />
              <CustomInputField
                type="number"
                placeholder="0"
                name=""
                value={count}
                style={{ input: styles.rapPriceInput }}
              />
              <DownIcon
                className={styles.downIcon}
                onClick={() => setCount(count - 1)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
