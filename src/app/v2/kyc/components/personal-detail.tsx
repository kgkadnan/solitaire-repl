import { InputField } from '@/components/v2/common/input-field';
import { kycScreenIdentifierNames } from '@/constants/enums/kyc';
import React from 'react';
import { handleInputChange } from '../helper/handle-change';
import { RANGE_VALIDATION } from '@/constants/error-messages/kyc';
import { updateFormState } from '@/features/kyc/kyc';
import { DynamicMobileInput } from '@/components/v2/common/input-field/dynamic-mobile';
import { ManageLocales } from '@/utils/v2/translate';

const PersonalDetail = ({ formErrorState, formState, dispatch }: any) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center gap-[16px]">
        <span className="rounded-[50%] bg-primaryMain flex items-center justify-center text-neutral25 text-lMedium font-medium w-[40px] h-[40px]">
          1
        </span>
        <h1 className="text-headingS font-medium text-neutral900">
          {ManageLocales('app.kyc.personalDetail.header.title')}
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
                    kycScreenIdentifierNames.PERSONAL_DETAILS
                  ]}][first_name]`,
                  e.target.value,
                  dispatch,
                  kycScreenIdentifierNames.PERSONAL_DETAILS,
                  'first_name'
                  // formState
                )
              }
              type="text"
              name={'First Name*'}
              value={
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.PERSONAL_DETAILS
                ]?.['first_name'] ?? ''
              }
              errorText={
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.PERSONAL_DETAILS
                ]?.['first_name'] ?? ''
              }
              placeholder={'First name'}
              styles={{
                input: `rounded-l-[0px] ${
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.PERSONAL_DETAILS
                  ]?.['first_name']
                    ? 'border-dangerMain'
                    : 'border-neutral200'
                }`
              }}
            />
            <InputField
              label={'Last Name*'}
              onChange={e =>
                handleInputChange(
                  `formState.online.sections[${kycScreenIdentifierNames.PERSONAL_DETAILS}][last_name]`,
                  e.target.value,
                  dispatch,
                  kycScreenIdentifierNames.PERSONAL_DETAILS,
                  'last_name'
                  // formState
                )
              }
              type="text"
              name={'Last Name*'}
              value={
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.PERSONAL_DETAILS
                ]?.['last_name'] ?? ''
              }
              errorText={
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.PERSONAL_DETAILS
                ]?.['last_name'] ?? ''
              }
              placeholder={'Last name'}
              styles={{
                input: `rounded-l-[0px] ${
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.PERSONAL_DETAILS
                  ]?.['last_name']
                    ? 'border-dangerMain'
                    : 'border-neutral200'
                }`
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
                        kycScreenIdentifierNames.PERSONAL_DETAILS
                      ]}][phone]`,
                      e.target.value,
                      dispatch,
                      kycScreenIdentifierNames.PERSONAL_DETAILS,
                      'phone'
                      // formState
                    )
                  : dispatch(
                      updateFormState({
                        name: `formErrorState.online.sections[${[
                          kycScreenIdentifierNames.PERSONAL_DETAILS
                        ]}][phone]}`,
                        value: RANGE_VALIDATION('Contact Number*', 0, 15)
                      })
                    )
              }
              handleSelectChange={({ value }: any) => {
                handleInputChange(
                  `formState.online.sections[${[
                    kycScreenIdentifierNames.PERSONAL_DETAILS
                  ]}][country_code]`,
                  value,
                  dispatch,
                  kycScreenIdentifierNames.PERSONAL_DETAILS,
                  'country_code'
                );
              }}
              isNotEditable={true}
              containerStyle={'!w-full'}
              type="number"
              name="Contact Number*"
              errorText={
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.PERSONAL_DETAILS
                ]?.['phone'] ?? ''
              }
              placeholder={'Enter contact number'}
              phoneValue={
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.PERSONAL_DETAILS
                ]?.['phone'] ?? ''
              }
              countryCodeValue={{
                label:
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.PERSONAL_DETAILS
                  ]?.['country_code'] ?? '',
                value:
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.PERSONAL_DETAILS
                  ]?.['country_code'] ?? ''
              }}
            />
            <InputField
              label={'Email*'}
              onChange={e =>
                handleInputChange(
                  `formState.online.sections[${kycScreenIdentifierNames.PERSONAL_DETAILS}][email]`,
                  e.target.value,
                  dispatch,
                  kycScreenIdentifierNames.PERSONAL_DETAILS,
                  'email'
                  // formState
                )
              }
              type="email"
              name={'Email*'}
              value={
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.PERSONAL_DETAILS
                ]?.['email'] ?? ''
              }
              errorText={
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.PERSONAL_DETAILS
                ]?.['email'] ?? ''
              }
              disabled={formState.isEmailVerified}
              placeholder={'Enter email id'}
              styles={{
                input: `rounded-l-[0px] ${
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.PERSONAL_DETAILS
                  ]?.['email']
                    ? 'border-dangerMain'
                    : 'border-neutral200'
                }`
              }}
            />
          </div>
          <hr className="border-neutral200" />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetail;
