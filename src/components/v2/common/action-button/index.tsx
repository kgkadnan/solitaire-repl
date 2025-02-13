import React from 'react';
import styles from './action-button.module.scss';
import Image from 'next/image';
import { Button } from '../../ui/button';
import Tooltip from '../tooltip';
import ButtonLoader from '../loader/button-loader';

export interface IActionButtonData {
  actionButtonData: {
    variant: 'secondary' | 'primary' | 'disable';
    svg?: any; // Assuming the type of 'svg' is string, update it accordingly
    label?: string;
    isDisable?: boolean;
    handler: () => void;
    isHidden?: boolean;
    customStyle?: string;
    tooltip?: string;
    customCtaStyle?: string;
    isLoading?: boolean;
  }[];
  containerStyle?: string;
}

const ActionButton = ({
  actionButtonData,
  containerStyle
}: IActionButtonData) => {
  return (
    <div className={`${styles.ctaContainer} ${containerStyle}`}>
      {actionButtonData.map(
        (
          {
            isDisable,
            variant,
            svg,
            label,
            handler,
            isHidden,
            customStyle,
            tooltip,
            customCtaStyle,
            isLoading
          },
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
              {label || !tooltip ? (
                <Button
                  disabled={isDisable || isLoading}
                  onClick={() => !isLoading && handler()}
                  variant={variant}
                  className={`${styles.ctaStyle} h-[40px]
                ${svg ? 'p-[8px] ' : 'px-[16px] py-[8px]'}
            ${variant === 'primary' && styles.ctaPrimaryStyle} ${
              variant === 'secondary' && styles.ctaSecondaryStyle
            } ${
              isDisable &&
              'bg-neutral100 text-neutral400 !shadow-none cursor-not-allowed'
            } ${customCtaStyle}`}
                >
                  {svg && (
                    <Image
                      src={svg}
                      alt={label ?? 'icon-button'}
                      width={20}
                      height={20}
                    />
                  )}
                  <div className="flex gap-1">
                    {label}
                    {isLoading && <ButtonLoader />}
                  </div>
                </Button>
              ) : (
                <Tooltip
                  tooltipTrigger={
                    <Button
                      disabled={isDisable}
                      onClick={() => handler()}
                      variant={variant}
                      className={`${styles.ctaStyle}  h-[40px]
                ${svg ? 'p-[8px] ' : 'px-[16px] py-[8px]'}
            ${variant === 'primary' && styles.ctaPrimaryStyle} ${
              variant === 'secondary' && styles.ctaSecondaryStyle
            }`}
                    >
                      <Image src={svg} alt={label ?? 'icon-button'} />
                    </Button>
                  }
                  tooltipContent={tooltip}
                  tooltipContentStyles={'z-[1000]'}
                />
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

export default ActionButton;
