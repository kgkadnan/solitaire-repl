import { ManageLocales } from '@/utils/v2/translate';
import Image from 'next/image';
import React, { useEffect } from 'react';
import arrowForward from '@public/v2/assets/icons/kyc/arrow-forward.svg';
import notepad from '@public/v2/assets/icons/kyc/notepad.svg';
import computer from '@public/v2/assets/icons/kyc/computer.svg';
import ActionButton from '@/components/v2/common/action-button';
import { Tracking_KYC } from '@/constants/funnel-tracking';
import { trackEvent } from '@/utils/ga';

interface ISubmissionOptionProps {
  handleSubmissionOptionClick: (_option: string) => void;
  selectedSubmissionOption: string;
  handleBack: (_currentState: string) => void;
}
const SubmissionOption = ({
  handleSubmissionOptionClick,
  selectedSubmissionOption,
  handleBack
}: ISubmissionOptionProps) => {
  const renderImage = (src: string) => <Image src={src} alt={src} />;

  useEffect(() => {
    trackEvent({
      action: Tracking_KYC.KYC_Form_PageView,
      entry_point: localStorage.getItem('kyc_entryPoint') || '',
      category: 'KYC',
      country: localStorage.getItem('country') || ''
    });
  }, []);

  return (
    <div className="flex flex-col gap-[16px] px-[110px] pt-[32px] h-[93.6vh] min-h-[70vh]">
      <div className="flex flex-col gap-[8px]">
        <h1 className="text-neutral900 text-headingS font-medium">
          {ManageLocales('app.kyc.submissionOption.header.title')}
        </h1>
        <p className="text-neutral600 text-mRegular font-regular">
          {' '}
          Opt to complete the KYC form directly on our site or download it to
          fill out at your convenience before uploading <br /> your submission
          here.
        </p>
      </div>
      <hr className="border-neutral200" />
      <div className="w-[100%] flex flex-col gap-[16px] items-center">
        {['online', 'offline'].map(option => (
          <div
            key={option}
            className={`flex items-center mt-4 justify-between bg-neutral0 p-4 rounded-[8px] cursor-pointer border border-solid w-[471px]  ${
              selectedSubmissionOption !== option
                ? 'border-neutral200'
                : 'border-primaryMain'
            }`}
            onClick={() => handleSubmissionOptionClick(option)}
          >
            {renderImage(option === 'online' ? computer : notepad)}
            <div className="w-[75%]">
              <p className="text-lMedium font-medium text-neutral900">
                {option === 'online'
                  ? 'Digital Form Submission'
                  : 'Download and Upload Hub'}
              </p>
              <p className="font-regular text-lRegular text-neutral600">
                {option === 'online'
                  ? 'Conveniently Complete Your Form Online'
                  : 'Please download, complete, and manually upload your form here.'}
              </p>
            </div>
            {renderImage(arrowForward)}
          </div>
        ))}
      </div>
      <div className="h-[72px] sticky bottom-0 bg-neutral0 border-[1px] border-solid border-neutral200 rounded-t-[8px] mt-auto p-[16px]">
        {' '}
        <ActionButton
          actionButtonData={[
            {
              variant: 'secondary',
              label: ManageLocales('app.kyc.footer.back'),
              handler: () => handleBack('country_selection')
            }
          ]}
          containerStyle="!justify-start"
        />
      </div>
    </div>
  );
};

export default SubmissionOption;
