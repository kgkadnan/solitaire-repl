import React from 'react';
import styles from './no-data-founs.module.scss';

export const NoDataFound = () => {
  return (
    <div className={styles.noDataFound}>
      <p>No data found</p>
    </div>
  );
};
