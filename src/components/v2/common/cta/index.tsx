import { Button } from '@/components/ui/button';
import React from 'react';
import styles from './cta.module.scss';
import Image from 'next/image';

interface ICtaData {
  ctaData: {
    variant: 'secondary' | 'primary' | 'disable';
    svg: string; // Assuming the type of 'svg' is string, update it accordingly
    label: string;
    isDisable?: boolean;
  }[];
}

const Cta = ({ ctaData }: ICtaData) => {
  return (
    <>
      <div className={styles.ctaContainer}>
        {ctaData.map(({ isDisable, variant, svg, label }) => {
          return (
            <Button
              key={label}
              disabled={isDisable}
              variant={variant}
              className={`${styles.ctaStyle} 
            ${variant === 'primary' && styles.ctaPrimaryStyle} ${
              variant === 'secondary' && styles.ctaSecondaryStyle
            }`}
            >
              <Image src={svg} alt={svg} />
              <div className={styles.ctaLabel}>{label}</div>
            </Button>
          );
        })}
      </div>
    </>
  );
};

export default Cta;
