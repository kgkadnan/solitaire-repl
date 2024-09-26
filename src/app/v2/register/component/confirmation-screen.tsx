import React, { useEffect } from 'react';
import Image from 'next/image';
import successIcon from '@public/v2/assets/icons/modal/confirm.svg';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import { useRouter } from 'next/navigation';
import { useLazyTrackRegisterFlowQuery } from '@/features/api/register';
import { isSessionValid } from '@/utils/manage-session';
import { Tracking } from '@/constants/funnel-tracking';
import { useLazyRegisterFunnelQuery } from '@/features/api/funnel';
import { trackEvent } from '@/utils/ga';

const ConfirmScreen = () => {
  const router = useRouter();
  const [triggerRegisterFlowTrack] = useLazyTrackRegisterFlowQuery();
  let [funnelTrack] = useLazyRegisterFunnelQuery();

  useEffect(() => {
    funnelTrack({
      step: Tracking.Mobile_Verified_PageView,
      sessionId: isSessionValid(),
      entryPoint: localStorage.getItem('entryPoint') || ''
    });
    trackEvent({
      action: Tracking.Mobile_Verified_PageView,
      entry_point: localStorage.getItem('entryPoint') || '',
      category: 'Register'
    });
  }, []);
  return (
    <div className="flex items-center text-center text-neutral900 ">
      <div className="flex flex-col w-[500px] p-8 gap-[24px] items-center text-center">
        <Image src={successIcon} alt="success" />
        <p className="text-headingM text-neutral900 font-medium mt-[-100px]">
          Your account as a guest user has been successfully created.{' '}
        </p>
        <p className="text-lRegular">
          To unlock full access and enhance your experience, please complete
          your KYC verification.
        </p>
        <div className="flex flex-col gap-1">
          <IndividualActionButton
            onClick={() => {
              triggerRegisterFlowTrack({ event: 'complete-kyc' });
              funnelTrack({
                step: Tracking.Click_Finsih_KYC,
                sessionId: isSessionValid(),
                entryPoint: localStorage.getItem('entryPoint') || ''
              }),
                trackEvent({
                  action: Tracking.Click_Finsih_KYC,
                  entry_point: localStorage.getItem('entryPoint') || '',
                  category: 'Register'
                });
              router.push(`/v2/kyc`);
            }}
            variant={'primary'}
            size={'custom'}
            className="rounded-[4px] w-[450px]"
          >
            Finish KYC Process
          </IndividualActionButton>
          <IndividualActionButton
            onClick={() => {
              triggerRegisterFlowTrack({ event: 'go-to-dashboard' });
              funnelTrack({
                step: Tracking.Click_Continue_Guest,
                sessionId: isSessionValid(),
                entryPoint: localStorage.getItem('entryPoint') || ''
              }),
                trackEvent({
                  action: Tracking.Click_Continue_Guest,
                  entry_point: localStorage.getItem('entryPoint') || '',
                  category: 'Register'
                });
              router.push(`/v2/`);
            }}
            className="rounded-[4px] text-neutral600 w-[450px]"
            size={'custom'}
          >
            Explore website as a guest
          </IndividualActionButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmScreen;
