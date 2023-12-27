import { CustomFooter } from '@/components/common/footer';
import { ManageLocales } from '@/utils/translate';
import Image from 'next/image';
import React from 'react';
import handImage from '@public/assets/images/noto_waving-hand.png';
import { CustomInputlabel } from '@/components/common/input-label';
import arrowForward from '@public/assets/icons/arrow-forward-outline.svg';
import playForward from '@public/assets/icons/play-forward-outline.svg';
import edit from '@public/assets/icons/edit.svg';
import {
  IErrorSetState,
  IErrorState
} from '@/app/search/result/result-interface';
import { SELECT_VALID_INPUT } from '@/constants/error-messages/kyc';
import { useDispatch } from 'react-redux';
import { updateFormState } from '@/features/kyc/kyc';

interface IRenderKYCModeSelection {
  setSelectedKYCOption: React.Dispatch<React.SetStateAction<string>>;
  selectedKYCOption: string;
  handleSaveAndNext: (state: string) => void;
  errorState: IErrorState;
  errorSetState: IErrorSetState;
}
const RenderKYCModeSelection = ({
  handleSaveAndNext,
  setSelectedKYCOption,
  selectedKYCOption,
  errorState,
  errorSetState
}: IRenderKYCModeSelection) => {
  const { setErrorText } = errorSetState;
  const { errorText } = errorState;
  const dispatch = useDispatch();
  const handleBoxClick = (selection: string) => {
    console.log('selectetion', selection);
    setErrorText('');
    setSelectedKYCOption(selection);
    dispatch(
      updateFormState({
        name: `${selection === 'digitally' ? 'offline' : 'online'}`,
        value: false
      })
    );
  };
  return (
    <div className="w-full">
      <div className="flex flex-col gap-[30px] mb-[20px] items-start  h-[70vh]">
        <Image src={handImage} alt="Banner image" />
        <div className="flex flex-col gap-[10px]">
          <CustomInputlabel
            htmlfor={''}
            label={ManageLocales('app.myaccount.kyc.choiceOfFillingTheKYCForm')}
            overriddenStyles={{
              label: '!text-solitaireTertiary text-[18px] font-semibold'
            }}
          />
          <div className="text-solitaireTertiary text-[14px] font-normal flex flex-col gap-5">
            <p>
              You can fill the form here on the website or download and fill the
              <br />
              form and upload here
            </p>
            <p>*We recommend filling form here, as its fun </p>
          </div>
        </div>

        <div className=" flex flex-col min-w-[400px] w-[30%] gap-3">
          <div
            className={`flex items-center justify-between  bg-solitaireSecondary p-4 rounded-xl cursor-pointer ${
              selectedKYCOption === 'digitally'
                ? 'border border-solid border-solitaireQuaternary'
                : ''
            }`}
            onClick={() => handleBoxClick('digitally')}
          >
            <div className="w-[13%]">
              <Image
                src={playForward}
                width={30}
                height={30}
                alt="playForward"
              />
            </div>
            <div className="text-solitaireTertiary  w-[70%]">
              <h1>Fill Form Digitally</h1>
              <p className="font-thin">
                Fill the form on the app, for your convenience
              </p>
            </div>
            <div className="w-[10%]">
              <Image
                src={arrowForward}
                width={24}
                height={24}
                alt="arrowForward"
              />
            </div>
          </div>

          <div
            className={`flex items-center justify-between  bg-solitaireSecondary p-4 rounded-xl cursor-pointer ${
              selectedKYCOption === 'manually'
                ? 'border border-solid border-solitaireQuaternary'
                : ''
            }`}
            onClick={() => handleBoxClick('manually')}
          >
            <div className="w-[13%]">
              <Image src={edit} width={30} height={30} alt="edit" />
            </div>
            <div className="text-solitaireTertiary w-[70%]">
              <h1>Download and Upload Form</h1>
              <p className="font-thin">
                Download and fill the form and upload the filled <br /> form
                manually.
              </p>
            </div>
            <div className="w-[10%]">
              <Image
                src={arrowForward}
                width={24}
                height={24}
                alt="arrowForward"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0">
        <div className="sticky bottom-0 bg-solitairePrimary mt-10 flex border-t-2 border-solitaireSenary items-center justify-between">
          {errorText.length > 0 && (
            <div className="w-[30%]">
              <p className="text-red-700 text-base ">{errorText}</p>
            </div>
          )}
          <CustomFooter
            footerButtonData={[
              {
                id: 1,
                displayButtonLabel: ManageLocales('app.myaccount.kyc.back'),
                style:
                  'border border-solid border-solitaireQuaternary !text-[14px]',
                fn: () => {
                  setSelectedKYCOption('');
                  handleSaveAndNext('country_selection');
                }
              },
              {
                id: 2,
                displayButtonLabel: ManageLocales('app.myaccount.kyc.next'),
                style: 'bg-solitaireQuaternary !text-[14px]',
                fn: () =>
                  selectedKYCOption.length
                    ? handleSaveAndNext(selectedKYCOption)
                    : setErrorText(SELECT_VALID_INPUT)
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default RenderKYCModeSelection;
