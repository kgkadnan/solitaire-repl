import React from 'react';
import styles from './nudge.module.scss'; // Import your styles here
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import Image from 'next/image';
import KgkIcon from '@public/v2/assets/icons/sidebar-icons/vector.svg';
import ActionButton from '../action-button';
import { useRouter } from 'next/navigation';
import tick from '@public/v2/assets/icons/stepper/completed.svg';
import benefit from '@public/v2/assets/icons/nudge-benefit.svg';
import {
  Tracking_KYC,
  Tracking_KYC_Entry_Point
} from '@/constants/funnel-tracking';
import { trackEvent } from '@/utils/ga';

const KycNudgeModal = ({ onClose }: any) => {
  const router = useRouter();

  return (
    <div className={styles.bottomSheetOverlay}>
      <div className={styles.bottomSheetContent}>
        <button
          className="flex justify-end w-[100%] pr-[22px] pt-[22px]"
          onClick={onClose}
        >
          <Image src={crossIcon} alt="crossIcon" />
        </button>
        <div className="px-[116px] pb-[60px] pt-[14px] flex justify-between items-center">
          <div className={styles.bottomSheetHeader}>
            <Image src={KgkIcon} alt="KGKlogo" width={60} height={84} />

            <h2 className="pt-[29px] text-headingM medium text-neutral900">
              Complete KYC process to buy your desired diamonds
            </h2>
          </div>
          <div className="border-[1px] border-primaryBorder flex flex-col p-5 gap-5 rounded-[8px] text-neutral900 medium">
            <div className="text-lMedium medium flex items-center gap-3">
              <Image src={benefit} alt="benefit" />
              Benefits of completing KYC process
            </div>
            <div className="parent relative">
              <hr className="absolute bottom-0 left-0 border-none h-[1px] w-full bg-neutral200" />
            </div>
            <ul className="text-sMedium flex flex-col gap-5  ">
              <li className="flex items-center gap-3">
                {' '}
                <Image src={tick} alt="tick" />
                Confirm Stone
              </li>
              <li className="flex items-center gap-3">
                {' '}
                <Image src={tick} alt="tick" />
                Access New Arrivals
              </li>
              <li className="flex items-center gap-3">
                {' '}
                <Image src={tick} alt="tick" />
                Book Appointments
              </li>
              <li className="flex items-center gap-3">
                {' '}
                <Image src={tick} alt="tick" />
                Place Bids on Desired Stones
              </li>
            </ul>
            <div className="parent relative">
              <hr className="absolute bottom-0 left-0 border-none h-[1px] w-full bg-neutral200" />
            </div>
            <ActionButton
              actionButtonData={[
                {
                  variant: 'primary',
                  label: 'Complete KYC Now',
                  handler: () => {
                    localStorage.setItem('show-nudge', 'MINI'),
                      localStorage.setItem(
                        'kyc_entryPoint',
                        Tracking_KYC_Entry_Point.KYC_Bottom_Sheet
                      );
                    trackEvent({
                      action: Tracking_KYC.Click_KYC,
                      entry_point: localStorage.getItem('kyc_entryPoint') || '',
                      category: 'KYC'
                    });
                    router.push('/v2/kyc');
                  },
                  customStyle: 'flex-1 w-full'
                }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycNudgeModal;
