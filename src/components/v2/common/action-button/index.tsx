import { Button } from '@/components/ui/button';
import React from 'react';
import styles from './action-button.module.scss';
import Image from 'next/image';

interface ICtaData {
  actionButtonData: {
    variant: 'secondary' | 'primary' | 'disable';
    svg?: any; // Assuming the type of 'svg' is string, update it accordingly
    label?: string;
    isDisable?: boolean;
    handler: () => void;
    isHidden?: boolean;
    customStyle?: string;
  }[];
}

const ActionButton = ({ actionButtonData }: ICtaData) => {
  return (
    <div className={styles.ctaContainer}>
      {actionButtonData.map(
        ({
          isDisable,
          variant,
          svg,
          label,
          handler,
          isHidden,
          customStyle
        }) => {
          if (isHidden) {
            return null;
          }
          return (
            <div className={`${customStyle}`} key={label}>
              <Button
                key={label}
                disabled={isDisable}
                onClick={() => handler()}
                variant={variant}
                className={`${styles.ctaStyle} 
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
