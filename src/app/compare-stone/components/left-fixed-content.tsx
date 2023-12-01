import { ManageLocales } from '@/utils/translate';
import styles from '../styles/left-fixed-content.module.scss';
import { ILeftSideContentProps } from '../interface';

export function LeftFixedContent({
  compareStoneData,
  showDifferences,
  keyLabelMapping,
  compareValues,
}: ILeftSideContentProps) {
  return (
    <>
      <p
        className={`border-b border-r border-solitaireSenary ${styles.compareStoneLeftFixed}`}
      >
        {ManageLocales('app.compareStone.diamondImage')}
      </p>
      <div
        className={`border-r border-solitaireSenary ${styles.compareDiamondKeys}`}
      >
        <div className={`sticky top-[200px] w-full bg-solitaireSecondary`}>
          <div>{'discount' in compareStoneData[0] ? 'Discount' : null}</div>
          <div>
            {'amount' in compareStoneData[0]?.variants[0]?.prices[0]
              ? 'Amount'
              : null}
          </div>
        </div>
        <div>
          {!showDifferences
            ? Object.keys(keyLabelMapping).map((key) => (
                <div key={key}>
                  <span>{key !== 'id' && keyLabelMapping[key]}</span>
                </div>
              ))
            : Object.keys(compareValues).map((key) => (
                <div key={key}>
                  <span>{key !== 'id' && keyLabelMapping[key]}</span>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
