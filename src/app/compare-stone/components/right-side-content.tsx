import Image from 'next/image';
import CloseButton from '@public/assets/icons/close-outline.svg?url';
import styles from '../styles/right-side-content.module.scss';
import { FILE_URLS } from '@/constants/business-logic';
import { IRightSideContentProps } from '../interface';
import { CustomCheckBox } from '@/components/common/checkbox';
import { Product } from '@/app/search/result/result-interface';

export function RightSideContent({
  compareStoneData,
  showDifferences,
  keyLabelMapping,
  compareValues,
  handleClick,
  handleClose,
  setIsError,
  setErrorText,
}: IRightSideContentProps) {
  return (
    <>
      <div
        className={`flex border-b border-solitaireSenary ${styles.dimaondImageContainer}`}
      >
        {compareStoneData.map((items: Product) => (
          <div key={items.id}>
            <div
              className={`h-[200px] border-r border-solitaireSenary ${styles.diamondImageContainer}`}
            >
              <Image
                className={styles.diamondImage}
                src={`${FILE_URLS.IMG.replace('***', items?.lot_id ?? '')}`}
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
                <p>{diamond.discount}</p>
              </div>
              <div className="">
                <p>{diamond.variants[0].prices[0].amount}</p>
              </div>
            </div>
            {!showDifferences
              ? Object.keys(keyLabelMapping).map((key) => (
                  <div key={key}>{key !== 'id' ? diamond[key] || '-' : ''}</div>
                ))
              : Object.keys(compareValues).map((key) => (
                  <div key={key}>{key !== 'id' ? diamond[key] || '-' : ''}</div>
                ))}
          </div>
        ))}
      </div>
    </>
  );
}
