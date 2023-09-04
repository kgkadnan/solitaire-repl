'use client';
import React, { useState } from 'react';
import styles from './calculator.module.scss';
import { ManageLocales } from '@/utils/translate';
import { CustomInputField } from '../common/input-field';
import { CustomInputlabel } from '../common/input-label';
import DownIcon from '@public/assets/icons/chevron-back-outline.svg?url';
import UpIcon from '@public/assets/icons/chevron-back2-outline.svg?url';
import { CustomDisplayButton } from '../common/buttons/display-button';
import BackspaceIcon from '@public/assets/icons/backspace-outline.svg?url';

export const Calculator = () => {
  const [count, setCount] = useState<number>(0);
  let inputData = [
    {
      id: 1,
      label: ManageLocales('app.sideNav.cart'),
      type: 'number',
      placeholder: '99.99',
      name: 'carat',
    },
    {
      id: 2,
      label: ManageLocales('app.advanceSearch.shape'),
      type: 'text',
      placeholder: 'Round',
      name: 'Shape',
    },
    {
      id: 3,
      label: ManageLocales('app.advanceSearch.color'),
      type: 'text',
      placeholder: 'D',
      name: 'Color',
    },
    {
      id: 4,
      label: ManageLocales('app.advanceSearch.clarity'),
      type: 'text',
      placeholder: 'IF',
      name: 'Clarity',
    },
  ];
  const calculatorData = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['+/-', '0', <BackspaceIcon className={styles.backspaceButton} />],
  ];

  const calcNumberHandler = (value: any) => {
    setCount(value);
  };
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
          {inputData.map((items) => {
            return (
              <>
                <div className={styles.inputAndLabel}>
                  <CustomInputlabel
                    htmlfor={items.label}
                    label={items.label}
                    overriddenStyles={{ label: styles.inputLabels }}
                  />
                  <CustomInputField
                    type={items.type}
                    placeholder={items.placeholder}
                    name={items.name}
                    style={{ input: styles.inputMain }}
                  />
                </div>
              </>
            );
          })}
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
                className={styles.downIcon}
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
                className={styles.upIcon}
                onClick={() => setCount(count - 1)}
              />
            </div>
          </div>
        </div>
        <div className={styles.numbersMainDiv}>
          {calculatorData.map((rowData, rowIndex) => (
            <div className="flex" key={rowIndex}>
              {rowData.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <CustomDisplayButton
                    handleClick={() => calcNumberHandler(item)}
                    displayButtonLabel={item}
                    displayButtonAllStyle={{
                      displayButtonStyle: styles.transparent,
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
