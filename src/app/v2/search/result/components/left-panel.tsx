import { ManageLocales } from '@/utils/translate';
import styles from './left.module.scss';
import { ILeftSideContentProps } from './interface';

export function LeftFixedContent({
  compareStoneData,
  keyLabelMapping,
  compareValues
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
        <div>
          {Object.keys(keyLabelMapping).map(key => (
            <div key={key}>
              <span>{key !== 'id' && keyLabelMapping[key]}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
