import React from 'react';
// import pendingIcon from '@public/v2/assets/icons/kyc/pending.svg';
// import rejectedIcon from '@public/v2/assets/icons/kyc/rejected.svg';
// import approvedIcon from '@public/v2/assets/icons/kyc/approved.svg';
import phoneIcon from '@public/v2/assets/icons/kyc/phone.svg';
import whatsappIcon from '@public/v2/assets/icons/kyc/whatsapp.svg';
import copyIcon from '@public/v2/assets/icons/kyc/copy.svg';
import mailIcon from '@public/v2/assets/icons/kyc/mail.svg';
import Image from 'next/image';
import ActionButton from '../action-button';
import { ManageLocales } from '@/utils/v2/translate';
import { useRouter } from 'next/navigation';
import { kycStatus } from '@/constants/enums/kyc';

interface IKycStatusScreen {
  status: string;
}

export const KycStatusScreen: React.FC<IKycStatusScreen> = ({ status }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-10 justify-center items-center absolute">
      {/* {status === kycStatus.PENDING ? (
        <Image src={pendingIcon} alt="kyc_pending_icon" />
      ) : status === kycStatus.REJECTED ? (
        <Image src={rejectedIcon} alt="kyc_rejected_icon" />
      ) : (
        <Image src={approvedIcon} alt="kyc_approved_icon" />
      )} */}
      <div
        className={`${
          status === kycStatus.PENDING ? 'w-[472px]' : 'w-[700px]'
        } flex justify-center items-center flex-col`}
      >
        <p className="font-medium text-headingM text-neutral900">KYC Status</p>
        <p
          className={`w-[166px] h-[40px] my-4 border ${
            status === kycStatus.PENDING
              ? 'border-lengendInCardBorder bg-legendInCartFill text-legendInCart'
              : status === kycStatus.REJECTED
              ? 'border-primaryModalFillRed bg-primaryModalRingRed text-dangerMain'
              : 'border-successBorder bg-primaryModalRing text-successMain'
          } rounded py-[1px] px-[6px] flex justify-center items-center`}
        >
          Pending
        </p>
        <p className="text-lRegular font-regular text-neutral600 text-center">
          {status === kycStatus.PENDING
            ? 'We have received your KYC, we are reviewing it. We will give an update over it soon, by then you can explore our website'
            : status === kycStatus.REJECTED
            ? 'Your KYC verification has not been successful. To ensure compliance with our regulatory requirements and for further assistance, please contact your Key Account Manager directly. We appreciate your cooperation and understanding in this matter.'
            : 'Your KYC verification has not been successful. To ensure compliance with our regulatory requirements and for further assistance, please contact your Key Account Manager directly. We appreciate your cooperation and understanding in this matter.'}
        </p>
      </div>
      {status === kycStatus.REJECTED ? (
        <div className="w-[100%] rounded-[8px] border border-neutral200">
          <div className="mx-auto my-[24px] flex flex-col justify-center items-center gap-y-4">
            <div className="flex flex-col justify-center items-center gap-y-[10px]">
              <p className="font-medium text-headingS text-neutral900">
                Mr. Rajeev Sinha
              </p>
              <p className="font-regular text-lRegular text-neutral700">
                Key Account Manager
              </p>
            </div>
            <div className="border-t border-neutral200 w-[265px]"></div>
            <div className="flex flex-col justify-center items-center gap-y-[10px]">
              <div className="flex justify-center items-center gap-x-2">
                <Image src={phoneIcon} alt="phon_icon" />
                <Image src={whatsappIcon} alt="whatsapp_icon" />
                <p className="font-regular text-mRegular text-neutral600">
                  +91 910 876 6432
                </p>
              </div>
              <div className="flex justify-center items-center gap-x-2">
                <Image src={mailIcon} alt="mail_icon" />
                <p className="font-regular text-mRegular text-neutral600">
                  rajeev.sinha@kgkmail.com
                </p>
                <Image src={copyIcon} alt="copy_icon" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ActionButton
          actionButtonData={[
            {
              variant: 'secondary',
              label: ManageLocales('app.kyc.statusScreen.exploreWebsite'),
              handler: () => {
                router.push('/v2');
              },
              customStyle: 'w-[350px]'
            }
          ]}
        />
      )}
    </div>
  );
};
