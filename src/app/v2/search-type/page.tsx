'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import arrowForward from '@public/v2/assets/icons/kyc/arrow-forward.svg';
import barcode from '@public/v2/assets/icons/barcode-bg-green.svg';
import search from '@public/v2/assets/icons/search-bg-green-icon.png';
import { useRouter } from 'next/navigation';
import { useLazyGetSalePersonQuery } from '@/features/api/dashboard';
import { Routes } from '@/constants/v2/enums/routes';

const SearchType = () => {
  const router = useRouter();

  const [triggerSalesPersonApi] = useLazyGetSalePersonQuery({});
  const [selectedSubmissionOption, setSelectedSubmissionOption] = useState('');

  const handleSubmissionOptionClick = (selection: string) => {
    if (selectedSubmissionOption === selection) {
      setSelectedSubmissionOption(selection);
    } else {
      setSelectedSubmissionOption(selection);
    }

    if (selection === 'barcode') {
      router.push(Routes.DIAMOND_BARCODE_SCANNER);
    } else if (selection === 'manual') {
      router.push('/v2/search?active-tab=new-search');
    }
  };

  useEffect(() => {
    triggerSalesPersonApi({})
      .unwrap()
      .then(res => {
        console.log('triggerSalesPersonApi', res);
        localStorage.setItem('user', JSON.stringify(res));
      })
      .catch(e => {
        console.log('eeee', e);
      });
  }, []);

  const renderImage = (src: string) => <Image src={src} alt={src} />;

  return (
    <div className="flex flex-col gap-[16px] px-[110px] pt-[32px] h-[93.6vh] min-h-[70vh]">
      <div className="flex flex-col items-center justify-center gap-[px]">
        <h1 className="text-neutral900 text-headingS font-medium">
          Welcome to KGK Diamond Search <br />
        </h1>
        <h3 className="text-neutral900 text-headingS font-medium">
          Find Your Diamonds with Ease
        </h3>
      </div>

      <div className="w-[100%] flex flex-col gap-[16px] items-center">
        {['barcode', 'manual'].map(option => (
          <div
            key={option}
            className={`flex items-center mt-4 justify-between bg-neutral0 p-4 rounded-[8px] cursor-pointer border border-solid w-[471px]  ${
              selectedSubmissionOption !== option
                ? 'border-neutral200'
                : 'border-primaryMain'
            }`}
            onClick={() => handleSubmissionOptionClick(option)}
          >
            {renderImage(option === 'barcode' ? barcode : search)}
            <div className="w-[75%]">
              <p className="text-lMedium font-medium text-neutral900">
                {option === 'barcode'
                  ? 'Scan Diamond Barcode'
                  : 'Search Manually'}
              </p>
              <p className="font-regular text-lRegular text-neutral600">
                {option === 'barcode'
                  ? 'Instantly retrieve details by scanning the barcode on your diamond.'
                  : 'Use our traditional search to explore diamonds by specifications.'}
              </p>
            </div>
            {renderImage(arrowForward)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchType;
