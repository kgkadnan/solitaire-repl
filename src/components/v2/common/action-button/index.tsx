import { Button } from '@/components/ui/button';
import React from 'react';
import styles from './action-button.module.scss';
// import Image from 'next/image';

interface ICtaData {
  actionButtonData: {
    variant: 'secondary' | 'primary' | 'disable';
    svg?: string; // Assuming the type of 'svg' is string, update it accordingly
    label: string;
    isDisable?: boolean;
    handler: () => void;
    isHidden?: boolean;
  }[];
}

const ActionButton = ({ actionButtonData }: ICtaData) => {
  return (
    <div className={styles.ctaContainer}>
      {actionButtonData.map(
        ({ isDisable, variant, label, handler, isHidden }) => {
          if (isHidden) {
            return null;
          }
          return (
            <Button
              key={label}
              disabled={isDisable}
              onClick={handler}
              variant={variant}
              className={`${styles.ctaStyle} 
            ${variant === 'primary' && styles.ctaPrimaryStyle} ${
              variant === 'secondary' && styles.ctaSecondaryStyle
            }`}
            >
              {/* <Image src={svg} alt={svg} /> */}
              <div className={styles.ctaLabel}>{label}</div>
            </Button>
          );
        }
      )}
    </div>
  );
};

export default ActionButton;
