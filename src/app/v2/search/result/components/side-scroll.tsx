'use client';

import React from 'react';
import styles from './side-scroll.module.scss';

interface ISideScrollableProps {
  leftFixedStyle?: string;
  leftFixedContent: React.ReactNode;
  rightSideStyle?: string;
  rightSideContent: React.ReactNode;
}

export const CustomSideScrollable: React.FC<ISideScrollableProps> = ({
  leftFixedStyle,
  leftFixedContent,
  rightSideStyle,
  rightSideContent
}) => {
  return (
    <div className="flex">
      <div className={`${leftFixedStyle}`}>{leftFixedContent}</div>
      <div role="scrollable-container" className={styles.scrollableContainer}>
        <div
          className={`${styles.scrollText} ${rightSideStyle}`}
          data-testid="scrollable-container"
        >
          {rightSideContent}
        </div>
      </div>
    </div>
  );
};
