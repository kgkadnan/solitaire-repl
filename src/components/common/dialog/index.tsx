import React from 'react';
import confirmImage from '@public/assets/icons/confirmation.svg';
import Image from 'next/image';
import styles from './custom-dialog.module.scss';

interface IDialog {
  dialogContent: React.ReactNode;
}

export const CustomDialog: React.FC<IDialog> = ({ dialogContent }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles['dialog-container']}>
        <div className={styles['dialog-content']}>{dialogContent}</div>
      </div>
    </div>
  );
};
