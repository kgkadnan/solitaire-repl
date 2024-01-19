import React from 'react';
import styles from './no-data-founs.module.scss';

interface INoDataFound {
  message?: React.ReactNode;
}

export const NoDataFound: React.FC<INoDataFound> = ({ message }) => {
  return (
    <div className={styles.noDataFound}>
      {message ? message : <p>No data found</p>}
    </div>
  );
};
