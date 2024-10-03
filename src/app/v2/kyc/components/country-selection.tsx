import { RadioButton } from '@/components/v2/common/radio';
import React, { useEffect } from 'react';
import IND from '@public/v2/assets/png/data-table/IND.png';
import DUB from '@public/v2/assets/png/data-table/DUB.png';
import BEL from '@public/v2/assets/png/data-table/BEL.png';
import USA from '@public/v2/assets/png/data-table/USA.png';
import Image from 'next/image';
import { ManageLocales } from '@/utils/v2/translate';
import { countries } from '@/constants/enums/kyc';
import { trackEvent } from '@/utils/ga';
import { Tracking_KYC } from '@/constants/funnel-tracking';

interface ICountrySelectionProps {
  handleCountrySelection: (_country: string) => void;
  selectedCountry: string;
}
const CountrySelection = ({
  handleCountrySelection,
  selectedCountry
}: ICountrySelectionProps) => {
  const countrySelectionData = [
    {
      name: 'country',
      id: '1',
      value: countries.INDIA,
      label: (
        <div className="flex gap-3">
          <Image src={IND} alt="IND" />
          <div>India</div>
        </div>
      ),
      checked: selectedCountry === countries.INDIA
    },
    {
      name: 'country',
      id: '2',
      value: countries.BELGIUM,
      label: (
        <div className="flex gap-3">
          <Image src={BEL} alt="BEL" />
          <div>Belgium</div>
        </div>
      ),
      checked: selectedCountry === countries.BELGIUM
    },
    {
      name: 'country',
      id: '3',
      value: countries.USA,
      label: (
        <div className="flex gap-3">
          <Image src={USA} alt="USA" />
          <div>U.S</div>
        </div>
      ),
      checked: selectedCountry === countries.USA
    },
    {
      name: 'country',
      id: '4',
      value: countries.OTHER,
      label: (
        <>
          <div className="flex gap-3">
            <Image src={DUB} alt="DUB" height={24} width={24} />
            <div className="flex flex-col">
              <div>Dubai</div>
            </div>
          </div>
          <div className="text-neutral600 textmRegular font-regular pl-[35px]">
            (for all other countries outside India, Belgium, and U.S)
          </div>
        </>
      ),
      checked: selectedCountry === countries.OTHER
    }
  ];

  useEffect(() => {
    trackEvent({
      action: Tracking_KYC.KYC_Country_PageView,
      entry_point: localStorage.getItem('kyc_entryPoint') || '',
      category: 'KYC'
    });
  }, []);

  return (
    <div className="flex flex-col gap-[16px] px-[110px] pt-[32px] h-[calc(100vh-60px)] min-h-[70vh]">
      <div className="flex flex-col gap-[8px]">
        <h1 className="text-neutral900 text-headingS font-medium">
          {ManageLocales('app.kyc.countrySelection.header.title')}
        </h1>
        <div className="text-neutral600 text-mRegular font-regular">
          {' '}
          Please select your country to initiate the KYC process. <br />
          Your choice will determine the specific KYC requirements for your
          location.
        </div>
      </div>
      <hr className="border-neutral200" />
      <div className="w-[100%] flex flex-col gap-[16px] mt-4 items-center flex-1">
        {countrySelectionData.map(countries => {
          return (
            <div
              key={countries?.id}
              className={`rounded-[8px] bg-neutral0 border-[1px] border-solid p-[16px] cursor-pointer w-[368px] ${
                selectedCountry === countries.value
                  ? 'border-primaryMain'
                  : 'border-neutral200'
              }`}
              onClick={() => handleCountrySelection(countries.value)}
            >
              <RadioButton
                radioMetaData={countries}
                onChange={handleCountrySelection}
                customStyle={{ radio: '!text-mMedium !text-neutral900' }}
              />
            </div>
          );
        })}
      </div>
      <div className="h-[72px] bg-neutral0 border-[1px] border-solid border-neutral200 rounded-t-[8px] mt-auto"></div>
    </div>
  );
};

export default CountrySelection;
