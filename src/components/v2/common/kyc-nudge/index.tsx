// components/KycNudgeBottomSheet.js

import React from 'react';
import styles from './nudge.module.scss'; // Import your styles here

const KycNudgeModal = ({ onClose }: any) => {
  return (
    <div className={styles.bottomSheetOverlay}>
      <div className={styles.bottomSheetContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.bottomSheetHeader}>
          <h2>Complete KYC process to buy your desired diamonds</h2>
        </div>
        <div className={styles.bottomSheetBody}>
          <h3>Benefits of completing KYC process</h3>
          <ul>
            <li>Confirm Stone</li>
            <li>Access New Arrivals</li>
            <li>Book Appointments</li>
            <li>Place Bids on Desired Stones</li>
          </ul>
          <button className={styles.completeKycButton}>Complete KYC Now</button>
        </div>
      </div>
    </div>
  );
};

export default KycNudgeModal;
