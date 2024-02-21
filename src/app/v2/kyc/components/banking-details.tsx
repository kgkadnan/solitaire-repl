import { InputField } from '@/components/v2/common/input-field';
import { kycScreenIdentifierNames } from '@/constants/enums/kyc';
import React from 'react';
import { handleInputChange } from '../helper/handle-change';
import { RANGE_VALIDATION } from '@/constants/error-messages/kyc';
import { updateFormState } from '@/features/kyc/kyc';
import { DynamicMobileInput } from '@/components/v2/common/input-field/dynamic-mobile';
import { ManageLocales } from '@/utils/v2/translate';

const BankingDetails = ({ formErrorState, formState, dispatch }: any) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center gap-[16px]">
        <span className="rounded-[50%] bg-primaryMain flex items-center justify-center text-neutral25 text-lMedium font-medium w-[40px] h-[40px]">
          4
        </span>
        <h1 className="text-headingS font-medium text-neutral900">
          {ManageLocales('app.kyc.bankingDetail.header.title')}
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
                `formState.online.sections[${[
                  kycScreenIdentifierNames.BANKING_DETAILS
                ]}][owner_full_name]`,
                e.target.value,
                dispatch,
                kycScreenIdentifierNames.BANKING_DETAILS,
                'owner_full_name'
                // formState
              )
            }
            type="text"
            name={'First Name*'}
            value={
              formState?.online?.sections?.[
                kycScreenIdentifierNames.BANKING_DETAILS
              ]?.['owner_full_name'] ?? ''
            }
            errorText={
              formErrorState?.online?.sections?.[
                kycScreenIdentifierNames.BANKING_DETAILS
              ]?.['owner_full_name'] ?? ''
            }
            placeholder={'Enter first name'}
            styles={{
              input: `rounded-l-[0px] ${
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.BANKING_DETAILS
                ]?.['owner_full_name']
                  ? 'border-dangerMain'
                  : 'border-neutral200'
              }`,
              inputMain: '!w-[368px]'
            }}
          />
          <InputField
            label={'PAN or Aadhar Number*'}
            onChange={e =>
              handleInputChange(
                `formState.online.sections[${kycScreenIdentifierNames.BANKING_DETAILS}][owner_pan_number]`,
                e.target.value,
                dispatch,
                kycScreenIdentifierNames.BANKING_DETAILS,
                'owner_pan_number'
                // formState
              )
            }
            type="text"
            name={'PAN or Aadhar Number*'}
            value={
              formState?.online?.sections?.[
                kycScreenIdentifierNames.BANKING_DETAILS
              ]?.['owner_pan_number'] ?? ''
            }
            errorText={
              formErrorState?.online?.sections?.[
                kycScreenIdentifierNames.BANKING_DETAILS
              ]?.['owner_pan_number'] ?? ''
            }
            placeholder={'Enter pan or adhar'}
            styles={{
              input: `rounded-l-[0px] ${
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.BANKING_DETAILS
                ]?.['owner_pan_number']
                  ? 'border-dangerMain'
                  : 'border-neutral200'
              }`,
              inputMain: '!w-[368px]'
            }}
          />
        </div>
        <div className="flex gap-[16px]">
          <DynamicMobileInput
            label={'Contact Number*'}
            handleInputChange={e =>
              e.target.value.trim().length <= 15
                ? handleInputChange(
                    `formState.online.sections[${[
                      kycScreenIdentifierNames.BANKING_DETAILS
                    ]}][owner_phone]`,
                    e.target.value,
                    dispatch,
                    kycScreenIdentifierNames.BANKING_DETAILS,
                    'owner_phone'
                    // formState
                  )
                : dispatch(
                    updateFormState({
                      name: `formErrorState.online.sections[${[
                        kycScreenIdentifierNames.BANKING_DETAILS
                      ]}][owner_phone]}`,
                      value: RANGE_VALIDATION('Contact Number*', 0, 15)
                    })
                  )
            }
            handleSelectChange={({ value }: any) => {
              handleInputChange(
                `formState.online.sections[${[
                  kycScreenIdentifierNames.BANKING_DETAILS
                ]}][owner_country_code]`,
                value,
                dispatch,
                kycScreenIdentifierNames.BANKING_DETAILS,
                'owner_country_code'
              );
            }}
            type="number"
            name="Contact Number*"
            errorText={
              formErrorState?.online?.sections?.[
                kycScreenIdentifierNames.BANKING_DETAILS
              ]?.['owner_phone'] ?? ''
            }
            placeholder={'Enter contact number'}
            phoneValue={
              formState?.online?.sections?.[
                kycScreenIdentifierNames.BANKING_DETAILS
              ]?.['owner_phone'] ?? ''
            }
            containerStyle={'!w-[368px]'}
            countryCodeValue={{
              label:
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.BANKING_DETAILS
                ]?.['owner_country_code'] ?? '',
              value:
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.BANKING_DETAILS
                ]?.['owner_country_code'] ?? ''
            }}
          />
          <InputField
            label={'Email*'}
            onChange={e =>
              handleInputChange(
                `formState.online.sections[${kycScreenIdentifierNames.BANKING_DETAILS}][owner_email]`,
                e.target.value,
                dispatch,
                kycScreenIdentifierNames.BANKING_DETAILS,
                'owner_email'
                // formState
              )
            }
            type="email"
            name={'Email*'}
            value={
              formState?.online?.sections?.[
                kycScreenIdentifierNames.BANKING_DETAILS
              ]?.['owner_email'] ?? ''
            }
            errorText={
              formErrorState?.online?.sections?.[
                kycScreenIdentifierNames.BANKING_DETAILS
              ]?.['owner_email'] ?? ''
            }
            placeholder={'Enter email id'}
            styles={{
              input: `rounded-l-[0px] ${
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.BANKING_DETAILS
                ]?.['owner_email']
                  ? 'border-dangerMain'
                  : 'border-neutral200'
              }`,
              inputMain: '!w-[368px]'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BankingDetails;
