'use client';
import Image from 'next/image';
import CloseButton from '@public/assets/icons/close-outline.svg?url';
import { FILE_URLS } from '@/constants/business-logic';
import { MINIMUM_STONES } from '@/constants/error-messages/compare-stone';
import styles from './right.module.scss';
import { IRightSideContentProps } from './interface';
import Checkbox from '@/components/v2/common/checkbox';
import { IProduct } from '../../interface';
export function RightSideContent({
  compareStoneData,
  showDifferences,
  keyLabelMapping,
  compareValues,
  handleClick,
  handleClose,
  setIsError,
  setErrorText,
  setIsCheck,
  isCheck
}: IRightSideContentProps) {
  // Function to handle checkbox clicks
  const handleCheckboxClick = (itemId: string) => {
    setIsCheck(prevState => ({
      ...prevState,
      itemId
    }));

    handleClick(itemId);
  };

  return (
    <>
      <div
        className={`flex border-b border-solitaireSenary ${styles.dimaondImageContainer}`}
      >
        {compareStoneData.map((items: IProduct) => (
          <div key={items.id} className="border-r border-solitaireSenary">
            <div className={`h-[200px]  ${styles.diamondImageContainer}`}>
              <Image
                className={styles.diamondImage}
                src={`${FILE_URLS.IMG.replace('***', items?.lot_id ?? '')}`}
                alt="Diamond Image"
                width={180}
                height={200}
                onClick={() => handleCheckboxClick(items.id)}
              />
              <div className={styles.compareStoneCheckbox}>
                {/* <Checkbox
                  onClick={() => handleClick(items.id)}
                  data-testid={'compare stone checkbox'}
                  checked={isCheck.includes(items.id) || false}
                /> 
                */}
                hi
              </div>
              <div
                className={styles.closeButton}
                data-testid={'Remove Stone'}
                onClick={event =>
                  compareStoneData.length > 2
                    ? handleClose(event, items.id)
                    : (setIsError(true), setErrorText(MINIMUM_STONES))
                }
              >
                <CloseButton />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={`flex`}>
        {compareStoneData.map((diamond: any) => (
          <div
            className={`border-r border-solitaireSenary ${styles.compareStoneValue}`}
            key={diamond.id}
          >
            <div className="sticky top-[200px] w-full bg-solitaireSecondary">
              <div className="">
                <p>{diamond?.discount}</p>
              </div>
              <div className="">
                <p>{diamond?.variants?.[0]?.prices?.[0]?.amount}</p>
              </div>
            </div>
            {!showDifferences
              ? Object.keys(keyLabelMapping).map(key => (
                  <div key={key}>{key !== 'id' ? diamond[key] || '-' : ''}</div>
                ))
              : Object.keys(compareValues).map(key => (
                  <div key={key}>{key !== 'id' ? diamond[key] || '-' : ''}</div>
                ))}
          </div>
        ))}
      </div>
    </>
  );
}
