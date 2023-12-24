'use client';
import React, { useState } from 'react';
import BackHandIcon from '@public/assets/icons/noto-backhand.svg';
import Image from 'next/image';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { ManageLocales } from '@/utils/translate';

const CompanyDetails = () => {
  const [firstName, setFirstName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactEmailId, setContactEmailId] = useState('');

  const personalDetailData = [
    {
      id: 1,
      label: ManageLocales('app.personalDetail.firstName'),
      name: 'first name',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFirstName(e.target.value),
      type: 'text',
      value: firstName
    },
    {
      id: 2,
      label: ManageLocales('app.personalDetail.contactNumber'),
      name: 'first name',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setContactNumber(e.target.value),
      type: 'text',
      value: contactNumber
    },
    {
      id: 3,
      label: ManageLocales('app.personalDetail.contactEmailId'),
      name: 'first name',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setContactEmailId(e.target.value),
      type: 'text',
      value: contactEmailId
    }
  ];
  return (
    <>
      <div className="flex gap-[20px] items-center my-[30px]">
        <Image src={BackHandIcon} alt="Backhand image" />
        <p className="text-solitaireTertiary text-[18px] font-medium">
          Personal Details
        </p>
      </div>
      <div className="flex flex-col gap-[20px]">
        {personalDetailData.map(items => (
          <div key={items.id}>
            <FloatingLabelInput
              label={items.label}
              name={items.name}
              onChange={items.onChange}
              type={items.type}
              value={items.value}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CompanyDetails;
