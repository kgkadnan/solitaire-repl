import { InputField } from '@/components/v2/common/input-field';
import { countries, kycScreenIdentifierNames } from '@/constants/enums/kyc';
import React, { useEffect } from 'react';
import { handleInputChange } from '../helper/handle-change';
import { ManageLocales } from '@/utils/v2/translate';
import { Tracking_KYC } from '@/constants/funnel-tracking';
import { trackEvent } from '@/utils/ga';

const BankingDetails = ({
  formErrorState,
  formState,
  dispatch,
  country,
  currentStepperStep
}: any) => {
  useEffect(() => {
    trackEvent({
      action: Tracking_KYC.KYC_Banking_Details_PageView,
      entry_point: localStorage.getItem('kyc_entryPoint') || '',
      category: 'KYC',
      country: localStorage.getItem('country') || ''
    });
  }, []);

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center gap-[16px]">
        <span className="rounded-[50%] bg-primaryMain flex items-center justify-center text-neutral25 text-lMedium font-medium w-[40px] h-[40px]">
          {currentStepperStep + 1}
        </span>
        <h1 className="text-headingS font-medium text-neutral900">
          {ManageLocales('app.kyc.bankingDetail.header.title')}
        </h1>
      </div>
      <hr className="border-neutral200" />
      <div className="flex justify-center">
        <div className="flex flex-col gap-[16px]  w-[760px]">
          {' '}
          <div className="flex gap-[16px]">
            <InputField
              label={'Bank Name*'}
              onChange={e =>
                handleInputChange(
                  `formState.online.sections[${[
                    kycScreenIdentifierNames.BANKING_DETAILS
                  ]}][bank_name]`,
                  e.target.value,
                  dispatch,
                  kycScreenIdentifierNames.BANKING_DETAILS,
                  'bank_name'
                )
              }
              type="text"
              name={'Bank Name*'}
              value={
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.BANKING_DETAILS
                ]?.['bank_name'] ?? ''
              }
              errorText={
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.BANKING_DETAILS
                ]?.['bank_name'] ?? ''
              }
              placeholder={'Enter name'}
              styles={{
                input: ` ${
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.BANKING_DETAILS
                  ]?.['bank_name']
                    ? 'border-dangerMain'
                    : 'border-neutral200'
                }`
              }}
            />
            <InputField
              label={'Account Holder Name*'}
              onChange={e =>
                handleInputChange(
                  `formState.online.sections[${kycScreenIdentifierNames.BANKING_DETAILS}][account_holder_name]`,
                  e.target.value,
                  dispatch,
                  kycScreenIdentifierNames.BANKING_DETAILS,
                  'account_holder_name'
                )
              }
              type="text"
              name={'Account Holder Name*'}
              value={
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.BANKING_DETAILS
                ]?.['account_holder_name'] ?? ''
              }
              errorText={
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.BANKING_DETAILS
                ]?.['account_holder_name'] ?? ''
              }
              placeholder={'Enter name'}
              styles={{
                input: ` ${
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.BANKING_DETAILS
                  ]?.['account_holder_name']
                    ? 'border-dangerMain'
                    : 'border-neutral200'
                }`
              }}
            />
          </div>
          <div className="flex gap-[16px]">
            <InputField
              label={`${
                country === countries.INDIA
                  ? 'Account Number*'
                  : 'Account Number/IBN Number*'
              }`}
              onChange={e =>
                handleInputChange(
                  `formState.online.sections[${kycScreenIdentifierNames.BANKING_DETAILS}][account_number]`,
                  e.target.value,
                  dispatch,
                  kycScreenIdentifierNames.BANKING_DETAILS,
                  'account_number'
                )
              }
              type="number"
              name={`${
                country === countries.INDIA
                  ? 'Account Number*'
                  : 'Account Number/IBN Number*'
              }`}
              value={
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.BANKING_DETAILS
                ]?.['account_number'] ?? ''
              }
              errorText={
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.BANKING_DETAILS
                ]?.['account_number'] ?? ''
              }
              placeholder={'Enter number'}
              styles={{
                input: ` ${
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.BANKING_DETAILS
                  ]?.['account_number']
                    ? 'border-dangerMain'
                    : 'border-neutral200'
                }`
              }}
            />
            <InputField
              label={`${
                country === countries.INDIA ? 'IFSC Code*' : 'Swift Code*'
              }`}
              onChange={e =>
                handleInputChange(
                  `formState.online.sections[${
                    kycScreenIdentifierNames.BANKING_DETAILS
                  }].${
                    country === countries.INDIA ? 'ifsc_code' : 'swift_code'
                  }`,
                  e.target.value,
                  dispatch,
                  kycScreenIdentifierNames.BANKING_DETAILS,
                  `${country === countries.INDIA ? 'ifsc_code' : 'swift_code'}`
                )
              }
              type="email"
              name={`${
                country === countries.INDIA ? 'IFSC Code*' : 'Swift Code*'
              }`}
              value={
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.BANKING_DETAILS
                ]?.[
                  `${country === countries.INDIA ? 'ifsc_code' : 'swift_code'}`
                ] ?? ''
              }
              errorText={
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.BANKING_DETAILS
                ]?.[
                  `${country === countries.INDIA ? 'ifsc_code' : 'swift_code'}`
                ] ?? ''
              }
              placeholder={'Enter code'}
              styles={{
                input: ` ${
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.BANKING_DETAILS
                  ]?.[
                    `${
                      country === countries.INDIA ? 'ifsc_code' : 'swift_code'
                    }`
                  ]
                    ? 'border-dangerMain'
                    : 'border-neutral200'
                }`
              }}
            />
          </div>
          {country === countries.INDIA && (
            <div>
              <InputField
                label={`Bank Address`}
                onChange={e =>
                  handleInputChange(
                    `formState.online.sections[${kycScreenIdentifierNames.BANKING_DETAILS}][bank_address]`,
                    e.target.value,
                    dispatch,
                    kycScreenIdentifierNames.BANKING_DETAILS,
                    'bank_address'
                  )
                }
                type="text"
                name={`Bank Address`}
                value={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.BANKING_DETAILS
                  ]?.['bank_address'] ?? ''
                }
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.BANKING_DETAILS
                  ]?.['bank_address'] ?? ''
                }
                placeholder={'Enter address'}
                styles={{
                  input: ` ${
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.BANKING_DETAILS
                    ]?.['bank_address']
                      ? 'border-dangerMain'
                      : 'border-neutral200'
                  }`
                }}
              />
            </div>
          )}
          <hr className="border-neutral200" />
        </div>
      </div>
    </div>
  );
};

export default BankingDetails;
