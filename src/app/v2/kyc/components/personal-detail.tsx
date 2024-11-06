import { InputField } from '@/components/v2/common/input-field';
import { kycScreenIdentifierNames } from '@/constants/enums/kyc';
import React, { useEffect } from 'react';
import { handleInputChange } from '../helper/handle-change';
import { RANGE_VALIDATION } from '@/constants/error-messages/kyc';
import { updateFormState } from '@/features/kyc/kyc';

import { DynamicMobileInput } from '@/components/v2/common/input-field/dynamic-mobile';
import { ManageLocales } from '@/utils/v2/translate';
import { trackEvent } from '@/utils/ga';
import { Tracking_KYC } from '@/constants/funnel-tracking';

const PersonalDetail = ({
  formErrorState,
  formState,
  dispatch,
  currentStepperStep
}: any) => {
  const findIso: any = {
    '1': 'CA',
    '7': 'KZ',
    '20': 'EG',
    '27': 'ZA',
    '30': 'GR',
    '31': 'NL',
    '32': 'BE',
    '33': 'FR',
    '34': 'ES',
    '36': 'HU',
    '39': 'IT',
    '40': 'RO',
    '41': 'CH',
    '43': 'AT',
    '44': 'GB',
    '45': 'DK',
    '46': 'SE',
    '47': 'NO',
    '48': 'PL',
    '49': 'DE',
    '55': 'BR',
    '56': 'CL',
    '60': 'MY',
    '61': 'AU',
    '62': 'ID',
    '64': 'NZ',
    '65': 'SG',
    '66': 'TH',
    '81': 'JP',
    '82': 'KR',
    '84': 'VN',
    '86': 'CN',
    '90': 'TR',
    '91': 'IN',
    '93': 'AF',
    '94': 'LK',
    '95': 'MM',
    '244': 'AO',
    '267': 'BW',
    '351': 'PT',
    '352': 'LU',
    '353': 'IE',
    '356': 'MT',
    '357': 'CY',
    '358': 'FI',
    '359': 'BG',
    '370': 'LT',
    '371': 'LV',
    '372': 'EE',
    '374': 'AM',
    '377': 'MC',
    '380': 'UA',
    '420': 'CZ',
    '852': 'HK',
    '855': 'KH',
    '886': 'TW',
    '961': 'LB',
    '968': 'OM',
    '971': 'AE',
    '972': 'IL',
    '1-684': 'AS'
  };

  useEffect(() => {
    trackEvent({
      action: Tracking_KYC.KYC_Form_Personal_Details_PageView,
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
                input: ` ${
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
                input: ` ${
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
              selectedCountryIso={
                findIso[
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.PERSONAL_DETAILS
                  ]?.['country_code']
                ]
              }
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
                    )
                  : dispatch(
                      updateFormState({
                        name: `formErrorState.online.sections[${[
                          kycScreenIdentifierNames.PERSONAL_DETAILS
                        ]}][phone]}`,
                        value: RANGE_VALIDATION('Contact Number*', 6, 15)
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
                  `+${formState?.online?.sections?.[
                    kycScreenIdentifierNames.PERSONAL_DETAILS
                  ]?.['country_code']}` ?? '',
                value:
                  `+${formState?.online?.sections?.[
                    kycScreenIdentifierNames.PERSONAL_DETAILS
                  ]?.['country_code']}` ?? ''
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
                input: ` ${
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
