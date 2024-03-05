import { InputField } from '@/components/v2/common/input-field';
import { countries, kycScreenIdentifierNames } from '@/constants/enums/kyc';
import React, { useState } from 'react';
import { handleInputChange } from '../helper/handle-change';
import { ManageLocales } from '@/utils/v2/translate';
import { DynamicMobileInput } from '@/components/v2/common/input-field/dynamic-mobile';
import { updateFormState } from '@/features/kyc/kyc';
import { RANGE_VALIDATION } from '@/constants/error-messages/kyc';
import Select from 'react-select';
import { colourStyles } from '../style/select-style';
import { RadioButton } from '@/components/v2/common/radio';

import CheckboxWithInput from '@/components/v2/common/check';
import RadioButtonWithInput from '@/components/v2/common/radio-with-input';

const cities = [
  'AHMEDABAD',
  'SURAT',
  'RAJKOT',
  'NAVSARI',
  'PALANPUR',
  'VALSAD',
  'BHAYANDER',
  'BHAVNAGAR',
  'BOTAD',
  'DEESA',
  'GURGAON',
  'CHENNAI',
  'COIMBATORE',
  'HOSUR',
  'SALEM',
  'VELLORE',
  'HYDERABAD',
  'INDORE',
  'GWALIOR',
  'JAIPUR',
  'JALANDHAR',
  'LUDHIANA',
  'AMRITSAR',
  'KOLKATA',
  'LUCKNOW',
  'NEW DELHI',
  'AGRA',
  'PANT NAGAR',
  'MANGALORE',
  'BANGALORE',
  'MUMBAI',
  'PUNE',
  'THANE',
  'NAGPUR',
  'PALGHAR',
  'RAIPUR',
  'THRISSUR',
  'ERNAKULAM',
  'VIJAYAWADA',
  'VISAKHAPATNAM',
  'BHUBANESWAR',
  'DEHRADUN'

  // Other states and cities...
];

const computeCountryDropdownField = (cities: any) => {
  return cities?.map((city: any) => ({
    label: city,
    value: city
  }));
};

const CompanyDetail = ({
  formErrorState,
  formState,
  dispatch,
  country,
  currentStepperStep
}: any) => {
  const handleRadioChange = ({ value, formKey }: any) => {
    handleInputChange(
      `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][${formKey}]`,
      value,
      dispatch,
      kycScreenIdentifierNames.COMPANY_DETAILS,
      formKey
    );
  };

  const memberOfAnyBusinessOrganisation = [
    {
      id: '1',
      value: true,
      label: 'Yes',
      requiresInput: true
    },
    {
      id: '2',
      value: false,
      label: 'No',
      requiresInput: false
    }
  ];

  const msmeData = [
    {
      name: 'isMsmeRegistered',
      id: '1',
      value: true,
      label: 'Yes',
      checked:
        formState?.online?.sections?.[
          kycScreenIdentifierNames.COMPANY_DETAILS
        ]?.['is_msme_registered'] === true,
      inputs: [
        {
          id: '1',
          type: 'text',
          name: 'MSME type If you select “Yes”',
          onInputChange: (e: any) => {
            handleInputChange(
              `formState.online.sections[${[
                kycScreenIdentifierNames.COMPANY_DETAILS
              ]}][msme_type]`,
              e.target.value,
              dispatch,
              kycScreenIdentifierNames.COMPANY_DETAILS,
              'msme_type'
              // formState
            );
          },
          error:
            formErrorState?.online?.sections?.[
              kycScreenIdentifierNames.COMPANY_DETAILS
            ]?.['msme_type'] ?? '',
          placeholder: 'MSME type If you select “Yes”',
          value:
            formState?.online?.sections?.[
              kycScreenIdentifierNames.COMPANY_DETAILS
            ]?.['msme_type'] ?? ''
        },
        {
          id: '2',
          type: 'number',
          name: 'Registration Number If you select “Yes”',
          onInputChange: (e: any) => {
            handleInputChange(
              `formState.online.sections[${[
                kycScreenIdentifierNames.COMPANY_DETAILS
              ]}][msme_registration_number]`,
              e.target.value,
              dispatch,
              kycScreenIdentifierNames.COMPANY_DETAILS,
              'msme_registration_number'
              // formState
            );
          },
          error:
            formErrorState?.online?.sections?.[
              kycScreenIdentifierNames.COMPANY_DETAILS
            ]?.['msme_registration_number'] ?? '',
          placeholder: 'Registration Number If you select “Yes”',
          value:
            formState?.online?.sections?.[
              kycScreenIdentifierNames.COMPANY_DETAILS
            ]?.['msme_registration_number'] ?? ''
        }
      ]
    },
    {
      name: 'isMsmeRegistered',
      id: '2',
      value: false,
      label: 'No',
      checked:
        formState?.online?.sections?.[
          kycScreenIdentifierNames.COMPANY_DETAILS
        ]?.['is_msme_registered'] === false
    }
  ];

  const moneyLaundering = [
    {
      id: '1',
      value: true,
      label: 'Yes',
      requiresInput: true
    },
    {
      id: '2',
      value: false,
      label: 'No',
      requiresInput: false
    }
  ];

  const [memberOfAnyBusiness, setMenberOfAnyBusiness] = useState();
  const [moneyLaunderingState, setMoneyLaunderingState] = useState();
  const [organisationType, setOrganisationType] = useState();

  const handleSelect = (value: any, formKey: string, setState: any) => {
    setState(value);
    // Update the data array to include only the selected option, removing any previous selections
    // setData([value]);

    handleInputChange(
      `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][${formKey}]`,
      value,
      dispatch,
      kycScreenIdentifierNames.COMPANY_DETAILS,
      formKey
    );
  };

  const handleInputValueChange = (
    radioValue: any,
    inputValue: any,
    formKey: string
  ) => {
    // Update the data array to include the input value associated with the selected radio button

    handleInputChange(
      `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][${formKey}]`,
      [radioValue, inputValue],
      dispatch,
      kycScreenIdentifierNames.COMPANY_DETAILS,
      formKey
    );
  };

  const handleDataUpdate = (
    label: any,
    isChecked: any,
    screenName: any,
    key: any,
    inputValue: any,
    path: any,
    requiresInput: any
  ) => {
    let newData: any = formState.online.sections[screenName]?.[key]?.filter(
      (item: any) => item[0] !== label
    );
    newData = newData ?? [];

    if (isChecked) {
      // If the checkbox requires input and it's provided, add both label and input value
      if (requiresInput && inputValue.trim()) {
        newData.push([label, inputValue]);
      } else if (!requiresInput) {
        // If the checkbox doesn't require input, add only the label
        newData.push(label);
      }
    }

    dispatch(updateFormState({ name: path, value: newData }));
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center gap-[16px]">
        <span className="rounded-[50%] bg-primaryMain flex items-center justify-center text-neutral25 text-lMedium font-medium w-[40px] h-[40px]">
          {currentStepperStep + 1}
        </span>
        <h1 className="text-headingS font-medium text-neutral900">
          {ManageLocales('app.kyc.companyDetail.header.title')}
        </h1>
      </div>
      <hr className="border-neutral200" />
      <div className="flex justify-center">
        <div className="flex flex-col flex-wrap h-[990px] gap-[16px]  w-[760px]">
          {' '}
          {/* <div className="flex gap-[16px]"> */}
          <div className={'w-[50%]'}>
            <InputField
              label={'Registered Company Name*'}
              onChange={e =>
                handleInputChange(
                  `formState.online.sections[${[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]}][company_name]`,
                  e.target.value,
                  dispatch,
                  kycScreenIdentifierNames.COMPANY_DETAILS,
                  'company_name'
                  // formState
                )
              }
              type="text"
              name={'Registered Company Name*'}
              value={
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_DETAILS
                ]?.['company_name'] ?? ''
              }
              errorText={
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_DETAILS
                ]?.['company_name'] ?? ''
              }
              placeholder={'Enter name'}
              styles={{
                input: `${
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['company_name']
                    ? 'border-dangerMain'
                    : 'border-neutral200'
                }`
              }}
            />
          </div>
          <div className={'w-[50%]'}>
            {' '}
            <InputField
              label={'Year of Establishment*'}
              onChange={e =>
                handleInputChange(
                  `formState.online.sections[${[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]}][year_of_establishment]`,
                  e.target.value,
                  dispatch,
                  kycScreenIdentifierNames.COMPANY_DETAILS,
                  'year_of_establishment'
                  // formState
                )
              }
              type="text"
              name={'Year of Establishment*'}
              value={
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_DETAILS
                ]?.['year_of_establishment'] ?? ''
              }
              errorText={
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_DETAILS
                ]?.['year_of_establishment'] ?? ''
              }
              placeholder={'Enter year'}
              styles={{
                input: `${
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['year_of_establishment']
                    ? 'border-dangerMain'
                    : 'border-neutral200'
                }`
              }}
            />
          </div>
          {country === countries.INDIA && (
            <div className={'w-[50%]'}>
              {' '}
              <InputField
                label={'Registered Address*'}
                onChange={e =>
                  handleInputChange(
                    `formState.online.sections[${[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]}][address]`,
                    e.target.value,
                    dispatch,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    'address'
                    // formState
                  )
                }
                type="text"
                name={'Registered Address*'}
                value={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['address'] ?? ''
                }
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['address'] ?? ''
                }
                placeholder={'Address line'}
                styles={{
                  input: `${
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['address']
                      ? 'border-dangerMain'
                      : 'border-neutral200'
                  }`
                }}
              />{' '}
            </div>
          )}
          {(country === countries.BELGIUM || country === countries.USA) && (
            <div className={'w-[50%]'}>
              <InputField
                label={'Registered Address Line 1*'}
                onChange={e =>
                  handleInputChange(
                    `formState.online.sections[${[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]}][address_line_1]`,
                    e.target.value,
                    dispatch,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    'address_line_1'
                    // formState
                  )
                }
                type="text"
                name={'Registered Address Line 1*'}
                value={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['address_line_1'] ?? ''
                }
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['address_line_1'] ?? ''
                }
                placeholder={'Enter address line 1'}
                styles={{
                  input: `${
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['address_line_1']
                      ? 'border-dangerMain'
                      : 'border-neutral200'
                  }`
                }}
              />
            </div>
          )}
          {country === countries.INDIA && (
            <div className={'w-[50%]'}>
              <div className="flex text-left flex-col w-full">
                {' '}
                <p className="text-mRegular text-neutral-900">City*</p>
                <Select
                  name="city"
                  placeholder={'Search by Saved Filter Parameter'}
                  options={computeCountryDropdownField(cities)}
                  onChange={({ value }: any) => {
                    handleInputChange(
                      `formState.online.sections[${[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]}][city]`,
                      value,
                      dispatch,
                      kycScreenIdentifierNames.COMPANY_DETAILS,
                      'city'
                    );
                  }}
                  styles={colourStyles(
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['city'] ?? ''
                  )}
                  value={{
                    label:
                      formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['city'],
                    value:
                      formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['city']
                  }}
                  // autoFocus={false}
                />
              </div>
            </div>
          )}
          {(country === countries.BELGIUM || country === countries.USA) && (
            <div className={'w-[50%]'}>
              {' '}
              <InputField
                label={'Registered Address Line 2*'}
                onChange={e =>
                  handleInputChange(
                    `formState.online.sections[${[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]}][address_line_2]`,
                    e.target.value,
                    dispatch,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    'address_line_2'
                    // formState
                  )
                }
                type="text"
                name={'Registered Address Line 2*'}
                value={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['address_line_2'] ?? ''
                }
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['address_line_2'] ?? ''
                }
                placeholder={'Enter address line 2'}
                styles={{
                  input: `${
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['address_line_2']
                      ? 'border-dangerMain'
                      : 'border-neutral200'
                  }`
                }}
              />
            </div>
          )}
          {country === countries.INDIA && (
            <div className={'w-[50%]'}>
              {' '}
              <InputField
                label={'State*'}
                onChange={e =>
                  handleInputChange(
                    `formState.online.sections[${[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]}][state]`,
                    e.target.value,
                    dispatch,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    'state'
                    // formState
                  )
                }
                type="text"
                name={'State*'}
                value={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['state'] ?? ''
                }
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['state'] ?? ''
                }
                disabled={true}
                placeholder={'Enter state'}
                styles={{
                  input: `${
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['state']
                      ? 'border-dangerMain'
                      : 'border-neutral200'
                  }`
                }}
              />{' '}
            </div>
          )}
          {(country === countries.BELGIUM || country === countries.USA) && (
            <div className={'w-[50%]'}>
              {' '}
              <DynamicMobileInput
                label={'Contact Number*'}
                handleInputChange={e =>
                  e.target.value.trim().length <= 15
                    ? handleInputChange(
                        `formState.online.sections[${[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]}][company_phone_number]`,
                        e.target.value,
                        dispatch,
                        kycScreenIdentifierNames.COMPANY_DETAILS,
                        'company_phone_number'
                        // formState
                      )
                    : dispatch(
                        updateFormState({
                          name: `formErrorState.online.sections[${[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]}][company_phone_number]}`,
                          value: RANGE_VALIDATION('Contact Number*', 0, 15)
                        })
                      )
                }
                handleSelectChange={({ value }: any) => {
                  handleInputChange(
                    `formState.online.sections[${[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]}][company_country_code]`,
                    value,
                    dispatch,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    'company_country_code'
                  );
                }}
                isNotEditable={true}
                containerStyle={'!w-full'}
                type="number"
                name="Contact Number*"
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['company_phone_number'] ?? ''
                }
                placeholder={'Enter contact number'}
                phoneValue={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['company_phone_number'] ?? ''
                }
                countryCodeValue={{
                  label:
                    formState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['company_country_code'] ?? '',
                  value:
                    formState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['company_country_code'] ?? ''
                }}
              />{' '}
            </div>
          )}
          {country === countries.INDIA && (
            <div className={'w-[50%]'}>
              {' '}
              <InputField
                label={'Pin-Code*'}
                onChange={e =>
                  handleInputChange(
                    `formState.online.sections[${[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]}][pincode]`,
                    e.target.value,
                    dispatch,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    'pincode'
                    // formState
                  )
                }
                type="number"
                name={'Pin-Code*'}
                value={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['pincode'] ?? ''
                }
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['pincode'] ?? ''
                }
                placeholder={'Enter pin-code'}
                styles={{
                  input: `${
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['pincode']
                      ? 'border-dangerMain'
                      : 'border-neutral200'
                  }`
                }}
              />{' '}
            </div>
          )}
          {(country === countries.BELGIUM || country === countries.USA) && (
            <div className={'w-[50%]'}>
              {' '}
              <InputField
                label={'Company Email-ID*'}
                onChange={e =>
                  handleInputChange(
                    `formState.online.sections[${[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]}][company_email]`,
                    e.target.value,
                    dispatch,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    'company_email'
                    // formState
                  )
                }
                type="text"
                name={'Company Email-ID*'}
                value={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['company_email'] ?? ''
                }
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['company_email'] ?? ''
                }
                placeholder={'Enter email id'}
                styles={{
                  input: `${
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['company_email']
                      ? 'border-dangerMain'
                      : 'border-neutral200'
                  }`
                }}
              />
            </div>
          )}
          {country === countries.INDIA && (
            <div className={'w-[50%]'}>
              <DynamicMobileInput
                label={'Contact Number*'}
                handleInputChange={e =>
                  e.target.value.trim().length <= 15
                    ? handleInputChange(
                        `formState.online.sections[${[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]}][company_phone_number]`,
                        e.target.value,
                        dispatch,
                        kycScreenIdentifierNames.COMPANY_DETAILS,
                        'company_phone_number'
                        // formState
                      )
                    : dispatch(
                        updateFormState({
                          name: `formErrorState.online.sections[${[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]}][company_phone_number]}`,
                          value: RANGE_VALIDATION('Contact Number*', 0, 15)
                        })
                      )
                }
                handleSelectChange={({ value }: any) => {
                  handleInputChange(
                    `formState.online.sections[${[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]}][company_country_code]`,
                    value,
                    dispatch,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    'company_country_code'
                  );
                }}
                isNotEditable={false}
                containerStyle={'!w-full'}
                type="number"
                name="Contact Number*"
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['company_phone_number'] ?? ''
                }
                placeholder={'Enter contact number'}
                phoneValue={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['company_phone_number'] ?? ''
                }
                countryCodeValue={{
                  label:
                    formState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['company_country_code'] ?? '',
                  value:
                    formState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['company_country_code'] ?? ''
                }}
              />
            </div>
          )}
          {country === countries.INDIA && (
            <div className="flex w-[50%]">
              <div className="w-full flex flex-col gap-[10px]">
                <p className="text-mRegular text-neutral900">Business Type*</p>

                <div className="flex flex-wrap gap-[14px]">
                  {' '}
                  <div className="w-[46%]">
                    <CheckboxWithInput
                      label="Manufacturer"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['business_type']?.includes('Manufacturer')}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'business_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][business_type]`,
                          false
                        )
                      }
                    />
                  </div>
                  <div className="w-[50%]">
                    <CheckboxWithInput
                      label="Retailer"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['business_type']?.includes('Retailer')}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'business_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][business_type]`,
                          false
                        )
                      }
                    />
                  </div>
                  <div className="w-[46%]">
                    <CheckboxWithInput
                      label="Wholesaler"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['business_type']?.includes('Wholesaler')}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'business_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][business_type]`,
                          false
                        )
                      }
                    />
                  </div>
                  <div className="w-[50%]">
                    <CheckboxWithInput
                      label="Corporate Retailer"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['business_type']?.includes('Corporate Retailer')}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'business_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][business_type]`,
                          false
                        )
                      }
                    />
                  </div>
                  <div className="w-[100%]">
                    <CheckboxWithInput
                      label="Other"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['business_type']?.some((items: any) => {
                        if (Array.isArray(items)) {
                          return items[0] === 'Other';
                        }
                        return false; // Default value if items is not an array
                      })}
                      defaultValue={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['business_type']?.map((items: any) => {
                        if (Array.isArray(items)) {
                          return items[1];
                        }
                      })}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'business_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][business_type]`,
                          true
                        )
                      }
                      showInput={true}
                      inputName={'Other'}
                      inputPlaceHolder={'If other please specify'}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {country === countries.INDIA && (
            <div className="w-[50%] flex flex-col gap-[10px] h-[24vh]">
              <p className="text-mRegular text-neutral900">
                Organisation Type*
              </p>

              <div className="flex  w-full justify-between flex-wrap  ">
                {' '}
                <div className="w-[50%] mb-3">
                  <RadioButtonWithInput
                    name="organisationType"
                    label={'Individual'}
                    value={'Individual'}
                    requiresInput={false}
                    selectedOption={organisationType}
                    defaultSelected={
                      formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['organisation_type'] === 'Individual'
                    }
                    setState={setOrganisationType}
                    onSelect={handleSelect}
                    formKey={'organisation_type'}
                    customStyle={{
                      radio: '!text-mRegular !text-neutral900'
                    }}
                  />
                </div>
                <div className="w-[50%] mb-3">
                  <RadioButtonWithInput
                    name="organisationType"
                    label={'Partnership Firm'}
                    value={'Partnership Firm'}
                    defaultSelected={
                      formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['organisation_type'] === 'Partnership Firm'
                    }
                    requiresInput={false}
                    selectedOption={organisationType}
                    setState={setOrganisationType}
                    onSelect={handleSelect}
                    formKey={'organisation_type'}
                    customStyle={{
                      radio: '!text-mRegular !text-neutral900'
                    }}
                  />
                </div>
                <div className="w-[50%] mb-3">
                  <RadioButtonWithInput
                    name="organisationType"
                    label={'Private Ltd.'}
                    value={'Private Ltd.'}
                    defaultSelected={
                      formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['organisation_type'] === 'Private Ltd.'
                    }
                    requiresInput={false}
                    setState={setOrganisationType}
                    selectedOption={organisationType}
                    onSelect={handleSelect}
                    formKey={'organisation_type'}
                    customStyle={{
                      radio: '!text-mRegular !text-neutral900'
                    }}
                  />
                </div>{' '}
                <div className="w-[50%] mb-3">
                  <RadioButtonWithInput
                    name="organisationType"
                    label={'LLP'}
                    value={'LLP'}
                    defaultSelected={
                      formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['organisation_type'] === 'LLP'
                    }
                    requiresInput={false}
                    selectedOption={organisationType}
                    setState={setOrganisationType}
                    onSelect={handleSelect}
                    formKey={'organisation_type'}
                    customStyle={{
                      radio: '!text-mRegular !text-neutral900'
                    }}
                  />
                </div>{' '}
                <div className="w-[50%] mb-3">
                  <RadioButtonWithInput
                    name="organisationType"
                    label={'Public Ltd.'}
                    value={'Public Ltd.'}
                    defaultSelected={
                      formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['organisation_type'] === 'Public Ltd.'
                    }
                    requiresInput={false}
                    selectedOption={organisationType}
                    setState={setOrganisationType}
                    onSelect={handleSelect}
                    formKey={'organisation_type'}
                    customStyle={{
                      radio: '!text-mRegular !text-neutral900'
                    }}
                  />
                </div>{' '}
                <div className="w-[50%] mb-3">
                  <RadioButtonWithInput
                    name="organisationType"
                    label={'OPC'}
                    value={'OPC'}
                    defaultSelected={
                      formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['organisation_type'] === 'OPC'
                    }
                    requiresInput={false}
                    selectedOption={organisationType}
                    setState={setOrganisationType}
                    onSelect={handleSelect}
                    formKey={'organisation_type'}
                    customStyle={{
                      radio: '!text-mRegular !text-neutral900'
                    }}
                  />
                </div>{' '}
                <div className="w-[100%] relative">
                  <RadioButtonWithInput
                    name="organisationType"
                    label={'Other'}
                    value={'Other'}
                    defaultSelected={formState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['organisation_type'].includes('Other')}
                    requiresInput={true}
                    selectedOption={organisationType}
                    setState={setOrganisationType}
                    onSelect={handleSelect}
                    onInputValueChange={handleInputValueChange}
                    formKey={'organisation_type'}
                    customStyle={{
                      radio: '!text-mRegular !text-neutral900'
                    }}
                    placeholder={'If other please specify'}
                  />
                </div>{' '}
              </div>
            </div>
          )}
          {country === countries.INDIA && (
            <div className={'w-[50%]'}>
              {' '}
              <InputField
                label={'Company Email-ID*'}
                onChange={e =>
                  handleInputChange(
                    `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][company_email]`,
                    e.target.value,
                    dispatch,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    'company_email'
                    // formState
                  )
                }
                type="text"
                name={'Company Email-ID*'}
                value={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['company_email'] ?? ''
                }
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['company_email'] ?? ''
                }
                placeholder={'Enter email id'}
                styles={{
                  input: `${
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['company_email']
                      ? 'border-dangerMain'
                      : 'border-neutral200'
                  }`
                }}
              />{' '}
            </div>
          )}
          {(country === countries.BELGIUM || country === countries.USA) && (
            <div className="flex w-[50%]">
              <div className="w-full flex flex-col gap-[5px]">
                <p className="text-mRegular text-neutral900">Business Type*</p>

                <div className="flex flex-wrap gap-[14px]">
                  {' '}
                  <div className="w-[46%]">
                    <CheckboxWithInput
                      label="Manufacturer"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['business_type']?.includes('Manufacturer')}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'business_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][business_type]`,
                          false
                        )
                      }
                    />
                  </div>
                  <div className="w-[50%]">
                    <CheckboxWithInput
                      label="Retailer"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['business_type']?.includes('Retailer')}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'business_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][business_type]`,
                          false
                        )
                      }
                    />
                  </div>
                  <div className="w-[46%]">
                    <CheckboxWithInput
                      label="Wholesaler"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['business_type']?.includes('Wholesaler')}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'business_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][business_type]`,
                          false
                        )
                      }
                    />
                  </div>
                  <div className="w-[50%]">
                    <CheckboxWithInput
                      label="Corporate Retailer"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['business_type']?.includes('Corporate Retailer')}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'business_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][business_type]`,
                          false
                        )
                      }
                    />
                  </div>
                  <div className="w-[100%]">
                    <CheckboxWithInput
                      label="Other"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['business_type']?.some((items: any) => {
                        if (Array.isArray(items)) {
                          return items[0] === 'Other';
                        }
                        return false; // Default value if items is not an array
                      })}
                      defaultValue={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['business_type']?.map((items: any) => {
                        if (Array.isArray(items)) {
                          return items[1];
                        }
                      })}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'business_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][business_type]`,
                          true
                        )
                      }
                      showInput={true}
                      inputName={'Other'}
                      inputPlaceHolder={'If other please specify'}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {(country === countries.BELGIUM || country === countries.USA) && (
            <div className="flex">
              <div className="w-full flex flex-col gap-[5px]">
                <p className="text-mRegular text-neutral900">
                  Type of Industry*
                </p>

                <div className="flex flex-wrap gap-[14px]">
                  {' '}
                  <div className="w-[30%]">
                    <CheckboxWithInput
                      label="Diamonds"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['industry_type']?.includes('Diamonds')}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'industry_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][industry_type]`,
                          false
                        )
                      }
                    />
                  </div>
                  <div className="pl-[30px]">
                    <CheckboxWithInput
                      label="Colour Stones"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['industry_type']?.includes('Colour Stones')}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'industry_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][industry_type]`,
                          false
                        )
                      }
                    />
                  </div>
                  <div className="w-[100%]">
                    <CheckboxWithInput
                      label="Jewellery"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['industry_type']?.includes('Jewellery')}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'industry_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][industry_type]`,
                          false
                        )
                      }
                    />
                  </div>
                  <div className="w-[100%]">
                    <CheckboxWithInput
                      label="Other"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['industry_type']?.includes('Other')}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'business_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][business_type]`,
                          true
                        )
                      }
                      showInput={true}
                      inputName={'Other'}
                      inputPlaceHolder={'If other please specify'}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {(country === countries.BELGIUM || country === countries.USA) && (
            <div className={'w-[50%]'}>
              {' '}
              <InputField
                label={'Business Registration Number(CIN)*'}
                onChange={e =>
                  handleInputChange(
                    `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][business_registration_number]`,
                    e.target.value,
                    dispatch,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    'business_registration_number'
                    // formState
                  )
                }
                type="text"
                name={'Business Registration Number(CIN)*'}
                value={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['business_registration_number'] ?? ''
                }
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['business_registration_number'] ?? ''
                }
                placeholder={'Enter number'}
                styles={{
                  input: `${
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['business_registration_number']
                      ? 'border-dangerMain'
                      : 'border-neutral200'
                  }`
                }}
              />{' '}
            </div>
          )}
          {country === countries.INDIA && (
            <div className={'w-[50%]'}>
              {' '}
              <InputField
                label={'Company Pan-Card Number*'}
                onChange={e =>
                  handleInputChange(
                    `formState.online.sections[${[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]}][company_pan_number]`,
                    e.target.value,
                    dispatch,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    'company_pan_number'
                    // formState
                  )
                }
                type="text"
                name={'Company Pan-Card Number*'}
                value={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['company_pan_number'] ?? ''
                }
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['company_pan_number'] ?? ''
                }
                placeholder={'Enter number'}
                styles={{
                  input: `${
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['company_pan_number']
                      ? 'border-dangerMain'
                      : 'border-neutral200'
                  }`
                }}
              />{' '}
            </div>
          )}{' '}
          {(country === countries.BELGIUM || country === countries.USA) && (
            <div className={'w-[50%]'}>
              {' '}
              <InputField
                label={'VAT Number*'}
                onChange={e =>
                  handleInputChange(
                    `formState.online.sections[${[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]}][vat_number]`,
                    e.target.value,
                    dispatch,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    'vat_number'
                    // formState
                  )
                }
                type="text"
                name={'VAT Number*'}
                value={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['vat_number'] ?? ''
                }
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['vat_number'] ?? ''
                }
                placeholder={'Enter number'}
                styles={{
                  input: `${
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['vat_number']
                      ? 'border-dangerMain'
                      : 'border-neutral200'
                  }`
                }}
              />{' '}
            </div>
          )}
          {country === countries.INDIA && (
            <div className={'w-[50%]'}>
              {' '}
              <InputField
                label={'GST Identification Number*'}
                onChange={e =>
                  handleInputChange(
                    `formState.online.sections[${[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]}][gst_number]`,
                    e.target.value,
                    dispatch,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    'gst_number'
                    // formState
                  )
                }
                type="text"
                name={'GST Identification Number*'}
                value={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['gst_number'] ?? ''
                }
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['gst_number'] ?? ''
                }
                placeholder={'Enter number'}
                styles={{
                  input: `${
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['gst_number']
                      ? 'border-dangerMain'
                      : 'border-neutral200'
                  }`
                }}
              />{' '}
            </div>
          )}
          {(country === countries.BELGIUM || country === countries.USA) && (
            <div className={'w-[50%]'}>
              {' '}
              <InputField
                label={'FAX Number'}
                onChange={e =>
                  handleInputChange(
                    `formState.online.sections[${[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]}][fax_number]`,
                    e.target.value,
                    dispatch,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    'fax_number'
                    // formState
                  )
                }
                type="text"
                name={'FAX Number'}
                value={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['fax_number'] ?? ''
                }
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['fax_number'] ?? ''
                }
                placeholder={'Enter number'}
                styles={{
                  input: `${
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['fax_number']
                      ? 'border-dangerMain'
                      : 'border-neutral200'
                  }`
                }}
              />
            </div>
          )}
          {country === countries.INDIA && (
            <div className={'w-[50%]'}>
              <InputField
                label={'Business Registration Number (CIN)'}
                onChange={e =>
                  handleInputChange(
                    `formState.online.sections[${[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]}][business_registration_number]`,
                    e.target.value,
                    dispatch,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    'business_registration_number'
                    // formState
                  )
                }
                type="text"
                name={'Business Registration Number (CIN)'}
                value={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['business_registration_number'] ?? ''
                }
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['business_registration_number'] ?? ''
                }
                placeholder={'Enter number'}
                styles={{
                  input: `${
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['business_registration_number']
                      ? 'border-dangerMain'
                      : 'border-neutral200'
                  }`
                }}
              />{' '}
            </div>
          )}
          <div className={'w-[50%]'}>
            <InputField
              label={'Subsidiary/Affiliated Company'}
              onChange={e =>
                handleInputChange(
                  `formState.online.sections[${[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]}][subsidiary_company]`,
                  e.target.value,
                  dispatch,
                  kycScreenIdentifierNames.COMPANY_DETAILS,
                  'subsidiary_company'
                  // formState
                )
              }
              type="text"
              name={'Subsidiary/Affiliated Company'}
              value={
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_DETAILS
                ]?.['subsidiary_company'] ?? ''
              }
              errorText={
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_DETAILS
                ]?.['subsidiary_company'] ?? ''
              }
              placeholder={'Enter name'}
              styles={{
                input: `${
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['subsidiary_company']
                    ? 'border-dangerMain'
                    : 'border-neutral200'
                }`
              }}
            />
          </div>
          <div className={'w-[50%]'}>
            <InputField
              label={'Ultimate Beneficiary Name*'}
              onChange={e =>
                handleInputChange(
                  `formState.online.sections[${[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]}][ultimate_beneficiary_name]`,
                  e.target.value,
                  dispatch,
                  kycScreenIdentifierNames.COMPANY_DETAILS,
                  'ultimate_beneficiary_name'
                  // formState
                )
              }
              type="text"
              name={'Ultimate Beneficiary Name*'}
              value={
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_DETAILS
                ]?.['ultimate_beneficiary_name'] ?? ''
              }
              errorText={
                formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_DETAILS
                ]?.['ultimate_beneficiary_name'] ?? ''
              }
              placeholder={'Enter name'}
              styles={{
                input: `${
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['ultimate_beneficiary_name']
                    ? 'border-dangerMain'
                    : 'border-neutral200'
                }`
              }}
            />
          </div>
          {(country === countries.BELGIUM || country === countries.USA) && (
            <div className={'w-[50%]'}>
              {' '}
              <InputField
                label={'Ultimate Beneficiary Ownership%'}
                onChange={e =>
                  handleInputChange(
                    `formState.online.sections[${[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]}][ownership_percentage]`,
                    e.target.value,
                    dispatch,
                    kycScreenIdentifierNames.COMPANY_DETAILS,
                    'ownership_percentage'
                    // formState
                  )
                }
                type="text"
                name={'Ultimate Beneficiary Ownership%'}
                value={
                  formState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['ownership_percentage'] ?? ''
                }
                errorText={
                  formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['ownership_percentage'] ?? ''
                }
                placeholder={'Ownership%'}
                styles={{
                  input: `${
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['ownership_percentage']
                      ? 'border-dangerMain'
                      : 'border-neutral200'
                  }`
                }}
              />{' '}
            </div>
          )}
          {country === countries.INDIA && (
            <div className="flex">
              <div className="w-full flex flex-col gap-[5px]">
                <p className="text-mRegular text-neutral900">
                  Type of Industry*
                </p>

                <div className="flex flex-wrap gap-[14px]">
                  {' '}
                  <div className="w-[30%]">
                    <CheckboxWithInput
                      label="Diamonds"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['industry_type']?.includes('Diamonds')}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'industry_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][industry_type]`,
                          false
                        )
                      }
                    />
                  </div>
                  <div className="pl-[30px]">
                    <CheckboxWithInput
                      label="Colour Stones"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['industry_type']?.includes('Colour Stones')}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'industry_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][industry_type]`,
                          false
                        )
                      }
                    />
                  </div>
                  <div className="w-[100%]">
                    <CheckboxWithInput
                      label="Jewellery"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['industry_type']?.includes('Jewellery')}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'industry_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][industry_type]`,
                          false
                        )
                      }
                    />
                  </div>
                  <div className="w-[100%]">
                    <CheckboxWithInput
                      label="Other"
                      defaultChecked={formState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['industry_type']?.includes('Other')}
                      onDataUpdate={(
                        label: string,
                        isChecked: boolean,
                        inputValue: string
                      ) =>
                        handleDataUpdate(
                          label,
                          isChecked,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'business_type',
                          inputValue,
                          `formState.online.sections[${kycScreenIdentifierNames.COMPANY_DETAILS}][business_type]`,
                          true
                        )
                      }
                      showInput={true}
                      inputName={'Other'}
                      inputPlaceHolder={'If other please specify'}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            className={`w-[50%] flex flex-col gap-[25px]  ${
              memberOfAnyBusiness === true && 'mb-[45px]'
            }`}
          >
            <div>
              <p className="text-mRegular text-neutral900">
                Member of any Business Organisation / Council*
              </p>
              <p className="text-sRegular text-neutral400">
                If yes then provide the name
              </p>
            </div>
            <div className="flex justify-between w-[60%] relative">
              {' '}
              {memberOfAnyBusinessOrganisation.map(data => {
                return (
                  <div key={data.id}>
                    <RadioButtonWithInput
                      name="isMemberOfBusiness"
                      label={data.label}
                      value={data.value}
                      defaultSelected={
                        formState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['is_member_of_business'] === data.value
                      }
                      requiresInput={data.requiresInput}
                      selectedOption={memberOfAnyBusiness}
                      setState={setMenberOfAnyBusiness}
                      onSelect={handleSelect}
                      onInputValueChange={handleInputValueChange}
                      formKey={'is_member_of_business'}
                      placeholder={'Name If you select “Yes”'}
                      customStyle={{
                        radio: `!text-mRegular !text-neutral900  ${
                          memberOfAnyBusiness === 'true' && 'mb-[10px]'
                        }`
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {country === countries.INDIA && (
            <div className="w-[50%] flex flex-col gap-[25px]">
              <div>
                <p className="text-mRegular text-neutral900">
                  Registered under MSME Act*
                </p>
                <p className="text-sRegular text-neutral400">
                  If yes then provide the name field & registration number
                </p>
              </div>
              <div className="flex justify-between w-[60%] relative">
                {' '}
                {msmeData.map(data => {
                  return (
                    <div key={data.id}>
                      <RadioButton
                        radioMetaData={data}
                        onChange={() => {
                          handleRadioChange({
                            value: data.value,
                            formKey: 'is_msme_registered'
                          });
                        }}
                        customStyle={{
                          radio: `!text-mRegular !text-neutral900  ${
                            formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['is_msme_registered'] === true && 'mb-[10px]'
                          }`
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {country === countries.USA && (
            <div className="w-[50%] flex flex-col gap-[25px]">
              <div>
                <p className="text-mRegular text-neutral900">
                  Have you instituted an Anti-Money laundering policy in your
                  company?*
                </p>
                <p className="text-sRegular text-neutral400">
                  If “No” please specify why?
                </p>
              </div>
              <div className="flex justify-between w-[60%] relative">
                {' '}
                {moneyLaundering.map(data => {
                  return (
                    <div key={data.id}>
                      <RadioButtonWithInput
                        name="antiMoneyLaunderingPolicyName"
                        label={data.label}
                        value={data.value}
                        defaultSelected={
                          formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['is_anti_money_laundering'] === data.value
                        }
                        requiresInput={data.requiresInput}
                        selectedOption={moneyLaunderingState}
                        setState={setMoneyLaunderingState}
                        onSelect={handleSelect}
                        onInputValueChange={handleInputValueChange}
                        formKey={'is_anti_money_laundering'}
                        placeholder={'Specify here'}
                        customStyle={{
                          radio: `!text-mRegular !text-neutral900  ${
                            moneyLaunderingState === 'true' && 'mb-[10px]'
                          }`
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <hr className="border-neutral200" />
      </div>
    </div>
  );
};

export default CompanyDetail;
