import { InputField } from '@/components/v2/common/input-field';
import { kycScreenIdentifierNames } from '@/constants/enums/kyc';
import React, { useEffect } from 'react';
import { handleInputChange } from '../helper/handle-change';
import { RANGE_VALIDATION } from '@/constants/error-messages/kyc';
import { updateFormState } from '@/features/kyc/kyc';
import { DynamicMobileInput } from '@/components/v2/common/input-field/dynamic-mobile';
import { ManageLocales } from '@/utils/v2/translate';
import { useGetCountryCodeQuery } from '@/features/api/current-ip';

const CompanyOwnerDetail = ({
  formErrorState,
  formState,
  dispatch,
  currentStepperStep
}: any) => {
  const { data, error } = useGetCountryCodeQuery({});
  useEffect(() => {
    if (data) {
      dispatch(
        updateFormState({
          name: `formState.online.sections[${[
            kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
          ]}][owner_country_code]`,
          value: data.country_calling_code
        })
      );
    } else if (error) {
      console.error('Error fetching country code', error);
    }
  }, [data, error]);
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center gap-[16px]">
        <span className="rounded-[50%] bg-primaryMain flex items-center justify-center text-neutral25 text-lMedium font-medium w-[40px] h-[40px]">
          {currentStepperStep + 1}
        </span>
        <h1 className="text-headingS font-medium text-neutral900">
          {ManageLocales('app.kyc.companyOwnerDetail.header.title')}
        </h1>
      </div>
      <hr className="border-neutral200" />
      <div className="flex justify-center">
        <div className="flex flex-col gap-[16px] w-[760px]">
          {' '}
          <div className="flex gap-[16px]">
            <InputField
              label={'First Name*'}
              onChange={e =>
                handleInputChange(
                  `formState.online.sections[${[
                    kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                  ]}][owner_first_name]`,
                  e.target.value,
                  dispatch,
                  kycScreenIdentifierNames.COMPANY_OWNER_DETAILS,
                  'owner_first_name'
                  // formState
                )
              }
              type="text"
              name={'First Name*'}
              value={
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                ]?.['owner_first_name'] ?? ''
              }
              errorText={
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                ]?.['owner_first_name'] ?? ''
              }
              placeholder={'Enter first name'}
              styles={{
                input: ` ${
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                  ]?.['owner_first_name']
                    ? 'border-dangerMain'
                    : 'border-neutral200'
                }`
              }}
            />
            <InputField
              label={'Last Name*'}
              onChange={e =>
                handleInputChange(
                  `formState.online.sections[${[
                    kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                  ]}][owner_last_name]`,
                  e.target.value,
                  dispatch,
                  kycScreenIdentifierNames.COMPANY_OWNER_DETAILS,
                  'owner_last_name'
                  // formState
                )
              }
              type="text"
              name={'Last Name*'}
              value={
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                ]?.['owner_last_name'] ?? ''
              }
              errorText={
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                ]?.['owner_last_name'] ?? ''
              }
              placeholder={'Enter last name'}
              styles={{
                input: ` ${
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                  ]?.['owner_last_name']
                    ? 'border-dangerMain'
                    : 'border-neutral200'
                }`
              }}
            />
          </div>
          <div className="flex gap-[16px]">
            <InputField
              label={'PAN or Aadhar Number*'}
              onChange={e =>
                handleInputChange(
                  `formState.online.sections[${kycScreenIdentifierNames.COMPANY_OWNER_DETAILS}][owner_pan_or_aadhaar_number]`,
                  e.target.value,
                  dispatch,
                  kycScreenIdentifierNames.COMPANY_OWNER_DETAILS,
                  'owner_pan_or_aadhaar_number'
                  // formState
                )
              }
              type="text"
              name={'PAN or Aadhar Number*'}
              value={
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                ]?.['owner_pan_or_aadhaar_number'] ?? ''
              }
              errorText={
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                ]?.['owner_pan_or_aadhaar_number'] ?? ''
              }
              placeholder={'Enter pan or adhar'}
              styles={{
                input: ` ${
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                  ]?.['owner_pan_or_aadhaar_number']
                    ? 'border-dangerMain'
                    : 'border-neutral200'
                }`
              }}
            />
            <DynamicMobileInput
              label={'Contact Number*'}
              handleInputChange={e =>
                e.target.value.trim().length <= 15
                  ? handleInputChange(
                      `formState.online.sections[${[
                        kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                      ]}][owner_phone]`,
                      e.target.value,
                      dispatch,
                      kycScreenIdentifierNames.COMPANY_OWNER_DETAILS,
                      'owner_phone'
                      // formState
                    )
                  : dispatch(
                      updateFormState({
                        name: `formErrorState.online.sections[${[
                          kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                        ]}][owner_phone]}`,
                        value: RANGE_VALIDATION('Contact Number*', 0, 15)
                      })
                    )
              }
              handleSelectChange={({ value }: any) => {
                handleInputChange(
                  `formState.online.sections[${[
                    kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                  ]}][owner_country_code]`,
                  value,
                  dispatch,
                  kycScreenIdentifierNames.COMPANY_OWNER_DETAILS,
                  'owner_country_code'
                );
              }}
              containerStyle={'!w-full'}
              type="number"
              name="Contact Number*"
              errorText={
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                ]?.['owner_phone'] ?? ''
              }
              placeholder={'Enter contact number'}
              phoneValue={
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                ]?.['owner_phone'] ?? ''
              }
              countryCodeValue={{
                label:
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                  ]?.['owner_country_code'] ?? '',
                value:
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                  ]?.['owner_country_code'] ?? ''
              }}
            />
          </div>
          <div>
            <InputField
              label={'Email*'}
              onChange={e =>
                handleInputChange(
                  `formState.online.sections[${kycScreenIdentifierNames.COMPANY_OWNER_DETAILS}][owner_email]`,
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
                input: ` ${
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_OWNER_DETAILS
                  ]?.['owner_email']
                    ? 'border-dangerMain'
                    : 'border-neutral200'
                }`,
                inputMain: '!w-[368px]'
              }}
            />
          </div>
          <hr className="border-neutral200" />
        </div>
      </div>
    </div>
  );
};

export default CompanyOwnerDetail;
