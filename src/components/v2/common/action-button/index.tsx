import { Button } from '@/components/ui/button';
import React from 'react';
import styles from './action-button.module.scss';
import Image from 'next/image';

interface IActionButtonData {
  actionButtonData: {
    variant: 'secondary' | 'primary' | 'disable';
    svg?: any; // Assuming the type of 'svg' is string, update it accordingly
    label?: string;
    isDisable?: boolean;
    handler?: () => void;
    isHidden?: boolean;
    customStyle?: string;
  }[];
}

const ActionButton = ({ actionButtonData }: IActionButtonData) => {
  return (
    <div className={`${styles.ctaContainer} `}>
      {actionButtonData.map(
        (
          { isDisable, variant, svg, label, handler, isHidden, customStyle },
          index
        ) => {
          if (isHidden) {
            return null;
          }
          return (
            <div
              className={`${customStyle}`}
              key={label ?? `icon-button-${index}`}
            >
              <Button
                disabled={isDisable}
                onClick={() => handler!()}
                variant={variant}
                className={`${styles.ctaStyle} 
                ${svg ? 'p-[8px]' : 'px-[16px] py-[8px]'}
            ${variant === 'primary' && styles.ctaPrimaryStyle} ${
              variant === 'secondary' && styles.ctaSecondaryStyle
            }`}
              >
                {svg && <Image src={svg} alt={label ?? 'icon-button'} />}
                <div className={styles.ctaLabel}>{label}</div>
              </Button>
            </div>
          );
        }
      )}
    </div>
  );
};

export default ActionButton;
