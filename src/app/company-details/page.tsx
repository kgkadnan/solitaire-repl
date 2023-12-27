'use client';
import React from 'react';
import BackHandIcon from '@public/assets/icons/noto-backhand.svg';
import Image from 'next/image';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { ManageLocales } from '@/utils/translate';
import { RadioButton } from '@/components/common/custom-input-radio';

const CompanyDetails = () => {
  const data = [
    {
      label: ManageLocales('app.companyDetails.registerCompanyName'),
      name: 'registerCompanyName',
      onChange: () => '',
      type: 'text',
      value: 'state',
      isError: 'string'
    }
  ];

  return (
    <>
      <div className="flex gap-[20px] items-center my-[30px]">
        <Image src={BackHandIcon} alt="Backhand image" />
        <p className="text-solitaireTertiary text-[18px] font-medium">
          Company Details
        </p>
      </div>
      <div className="w-[50%]">
        <FloatingLabelInput
          label={ManageLocales('app.companyDetails.registerCompanyName')}
          name="registerCompanyName"
          onChange={() => ''}
          type="text"
          value="registerCompanyName"
        />
      </div>

      <div className="w-[50%]">{/* <RadioButton /> */}</div>
    </>
  );
};

export default CompanyDetails;
