import { InputField } from '@/components/v2/common/input-field';
import { kycScreenIdentifierNames } from '@/constants/enums/kyc';
import React from 'react';
import { handleInputChange } from '../helper/handle-change';

const CompanyOwnerDetail = ({
  errorText,
  formErrorState,
  formState,
  dispatch
}: any) => {
  console.log(
    'formState',
    formState?.online?.sections?.company_owner_details.owner_full_name
  );
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center gap-[16px]">
        <span className="rounded-[50%] bg-primaryMain text-neutral25 text-lMedium font-medium w-[40px] h-[40px]"></span>
        <h1 className="text-headingS font-medium text-neutral900">
          Company Owner Details
        </h1>
      </div>
      <hr className="border-neutral200" />
      <div className="flex flex-col gap-[16px] items-center">
        {' '}
        <div className="flex gap-[16px]">
          <InputField
            label={'First Name*'}
            onChange={e =>
              handleInputChange(
                `formState.online.sections[${kycScreenIdentifierNames.COMPANY_OWNER_DETAILS}]['owner_full_name']`,
                e.target.value,
                dispatch,
                kycScreenIdentifierNames.COMPANY_OWNER_DETAILS,
                'owner_full_name'
                // formState
              )
            }
            type="text"
            name={'First Name*'}
            value={
              formState?.online?.sections?.company_owner_details
                ?.owner_full_name ?? ''
            }
            errorText={
              formErrorState?.online?.sections?.[
                kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
              ]?.['owner_full_name'] ?? ''
            }
            placeholder={'Enter first name'}
            styles={{
              input: `rounded-l-[0px] ${
                errorText ? 'border-dangerMain' : 'border-neutral200'
              }`,
              inputMain: 'w-[368px]'
            }}
          />
          <InputField
            label={'PAN or Aadhar Number*'}
            onChange={e =>
              handleInputChange(
                `formState.online.sections[${kycScreenIdentifierNames.COMPANY_OWNER_DETAILS}]['owner_pan_number']`,
                e.target.value,
                dispatch,
                kycScreenIdentifierNames.COMPANY_OWNER_DETAILS,
                'owner_pan_number'
                // formState
              )
            }
            type="number"
            name={'PAN or Aadhar Number*'}
            value={
              formState?.online?.sections?.[
                kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
              ]?.['owner_pan_number'] ?? ''
            }
            errorText={
              formErrorState?.online?.sections?.[
                kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
              ]?.['owner_pan_number'] ?? ''
            }
            placeholder={'Enter pan or adhar'}
            styles={{
              input: `rounded-l-[0px] ${
                errorText ? 'border-dangerMain' : 'border-neutral200'
              }`,
              inputMain: 'w-[368px]'
            }}
          />
        </div>
        <div className="flex gap-[16px]">
          <InputField
            label={'PAN or Aadhar Number*'}
            onChange={() => {}}
            type="number"
            name={'pan_adhar'}
            value={''}
            placeholder={'Enter last name'}
            styles={{
              input: `rounded-l-[0px] ${
                errorText ? 'border-dangerMain' : 'border-neutral200'
              }`,
              inputMain: 'w-[368px]'
            }}
          />
          <InputField
            label={'Email*'}
            onChange={e =>
              handleInputChange(
                `formState.online.sections[${kycScreenIdentifierNames.COMPANY_OWNER_DETAILS}]['owner_email']`,
                e.target.value,
                dispatch,
                kycScreenIdentifierNames.COMPANY_OWNER_DETAILS,
                'owner_email'
                // formState
              )
            }
            type="email"
            name={'Email*'}
            value={
              formState?.online?.sections?.[
                kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
              ]?.['owner_email'] ?? ''
            }
            errorText={
              formErrorState?.online?.sections?.[
                kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
              ]?.['owner_email'] ?? ''
            }
            placeholder={'Enter email id'}
            styles={{
              input: `rounded-l-[0px] ${
                errorText ? 'border-dangerMain' : 'border-neutral200'
              }`,
              inputMain: 'w-[368px]'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyOwnerDetail;
