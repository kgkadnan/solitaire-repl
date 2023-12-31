import { ManageLocales } from '@/utils/translate';
import React from 'react';
import { CountrySelectionDropdown } from './components/render-country-selection-dropdown';
import { CustomFooter } from '@/components/common/footer';
import handImage from '@public/assets/images/noto_waving-hand.png';
import { CustomInputlabel } from '@/components/common/input-label';
import Image from 'next/image';
import {
  IErrorSetState,
  IErrorState
} from '@/app/search/result/result-interface';
import { SELECT_VALID_INPUT } from '@/constants/error-messages/kyc';
interface IRenderCountrySelection {
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  handleSaveAndNext: (state: string) => void;
  errorState: IErrorState;
  errorSetState: IErrorSetState;
}
const RenderCountrySelection = ({
  selectedCountry,
  setSelectedCountry,
  handleSaveAndNext,
  errorState,
  errorSetState
}: IRenderCountrySelection) => {
  const { setErrorText } = errorSetState;
  const { errorText } = errorState;
  return (
    <div className="w-full">
      <div className="flex flex-col gap-[30px] mb-[20px] items-start h-[70vh]">
        <Image src={handImage} alt="Banner image" />
        <div className="flex flex-col gap-[10px]">
          <CustomInputlabel
            htmlfor={''}
            label={ManageLocales('app.myaccount.kyc.chooseTheCountry')}
            overriddenStyles={{
              label: '!text-solitaireTertiary text-[18px] font-semibold'
            }}
          />
          <div className="">
            <p className="text-solitaireTertiary text-[14px] font-normal">
              Please enter valid input as the form will ask <br /> documents for
              verification
            </p>
          </div>
        </div>

        <div className="min-w-[400px] w-[30%]">
          <CountrySelectionDropdown
            setSelectedCountry={setSelectedCountry}
            errorSetState={errorSetState}
            selectedCountry={selectedCountry}
          />
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
                displayButtonLabel: ManageLocales('app.myaccount.kyc.next'),
                style: 'bg-solitaireQuaternary !text-[14px]',
                fn: () =>
                  selectedCountry.length
                    ? selectedCountry === 'other'
                      ? handleSaveAndNext('other')
                      : handleSaveAndNext('choice_for_filling_kyc')
                    : setErrorText(SELECT_VALID_INPUT)
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default RenderCountrySelection;
