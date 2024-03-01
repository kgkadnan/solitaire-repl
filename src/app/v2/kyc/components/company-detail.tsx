import { InputField } from '@/components/v2/common/input-field';
import { countries, kycScreenIdentifierNames } from '@/constants/enums/kyc';
import React from 'react';
import { handleInputChange } from '../helper/handle-change';
import { ManageLocales } from '@/utils/v2/translate';
import { DynamicMobileInput } from '@/components/v2/common/input-field/dynamic-mobile';
import { updateFormState } from '@/features/kyc/kyc';
import { RANGE_VALIDATION } from '@/constants/error-messages/kyc';
import Select from 'react-select';
import { colourStyles } from '../style/select-style';
import CheckboxComponent from '@/components/v2/common/checkbox';
import { RadioButton } from '@/components/v2/common/radio';

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
  country
}: any) => {
  const memberOfAnyBusinessOrganisation = [
    {
      name: 'country',
      id: '1',
      value: countries.INDIA,
      label: 'Yes'
      // checked: selectedCountry === countries.INDIA
    },
    {
      name: 'country',
      id: '2',
      value: countries.BELGIUM,
      label: 'No'
      // checked: selectedCountry === countries.BELGIUM
    }
  ];

  const msmeData = [
    {
      name: 'country',
      id: '1',
      value: countries.INDIA,
      label: 'Yes'
      // checked: selectedCountry === countries.INDIA
    },
    {
      name: 'country',
      id: '2',
      value: countries.BELGIUM,
      label: 'No'
      // checked: selectedCountry === countries.BELGIUM
    }
  ];

  const moneyLaundering = [
    {
      name: 'country',
      id: '1',
      value: countries.INDIA,
      label: 'Yes'
      // checked: selectedCountry === countries.INDIA
    },
    {
      name: 'country',
      id: '2',
      value: countries.BELGIUM,
      label: 'No'
      // checked: selectedCountry === countries.BELGIUM
    }
  ];

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center gap-[16px]">
        <span className="rounded-[50%] bg-primaryMain flex items-center justify-center text-neutral25 text-lMedium font-medium w-[40px] h-[40px]">
          2
        </span>
        <h1 className="text-headingS font-medium text-neutral900">
          {ManageLocales('app.kyc.companyDetail.header.title')}
        </h1>
      </div>
      <hr className="border-neutral200" />
      <div className="flex justify-center">
        <div className="flex flex-col flex-wrap h-[920px] gap-[16px]  w-[760px]">
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
                type="text"
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
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Manufacturer'}
                    />
                  </div>
                  <div className="w-[50%]">
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Retailer'}
                    />
                  </div>
                  <div className="w-[46%]">
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Wholesaler'}
                    />
                  </div>
                  <div className="w-[50%]">
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Corporate Retailer'}
                    />
                  </div>
                  <div className="w-[100%]">
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Other'}
                      showInput={true}
                      onInputChange={(e: any) => {
                        handleInputChange(
                          `formState.online.sections[${[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]}][organisationType_Other]`,
                          e.target.value,
                          dispatch,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'organisationType_Other'
                        );
                      }}
                      inputValue={
                        formState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['organisationType_Other'] ?? ''
                      }
                      inputError={
                        formErrorState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['organisationType_Other'] ?? ''
                      }
                      inputName={'Other'}
                      inputPlaceHolder="If other please specify"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {country === countries.INDIA && (
            <div className="w-[50%] flex flex-col gap-[10px]">
              <p className="text-mRegular text-neutral900">
                Organisation Type*
              </p>

              <div className="flex  w-full justify-between flex-wrap  h-[13vh]">
                {' '}
                <div className="w-[50%]">
                  <RadioButton
                    radioMetaData={{
                      name: 'country',
                      id: '1',
                      value: countries.INDIA,
                      label: 'Individual'
                      // checked: selectedCountry === countries.INDIA
                    }}
                    onChange={() => {}}
                    customStyle={{
                      radio: '!text-mRegular !text-neutral900'
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <RadioButton
                    radioMetaData={{
                      name: 'country',
                      id: '2',
                      value: countries.BELGIUM,
                      label: 'Partnership Firm'
                      // checked: selectedCountry === countries.BELGIUM
                    }}
                    onChange={() => {}}
                    customStyle={{
                      radio: '!text-mRegular !text-neutral900'
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <RadioButton
                    radioMetaData={{
                      name: 'country',
                      id: '3',
                      value: countries.BELGIUM,
                      label: 'Private Ltd.'
                      // checked: selectedCountry === countries.BELGIUM
                    }}
                    onChange={() => {}}
                    customStyle={{
                      radio: '!text-mRegular !text-neutral900'
                    }}
                  />
                </div>{' '}
                <div className="w-[50%]">
                  <RadioButton
                    radioMetaData={{
                      name: 'country',
                      id: '4',
                      value: countries.BELGIUM,
                      label: 'LLP'
                      // checked: selectedCountry === countries.BELGIUM
                    }}
                    onChange={() => {}}
                    customStyle={{
                      radio: '!text-mRegular !text-neutral900'
                    }}
                  />
                </div>{' '}
                <div className="w-[50%]">
                  <RadioButton
                    radioMetaData={{
                      name: 'country',
                      id: '5',
                      value: countries.BELGIUM,
                      label: 'Public Ltd.'
                      // checked: selectedCountry === countries.BELGIUM
                    }}
                    onChange={() => {}}
                    customStyle={{
                      radio: '!text-mRegular !text-neutral900'
                    }}
                  />
                </div>{' '}
                <div className="w-[50%]">
                  <RadioButton
                    radioMetaData={{
                      name: 'country',
                      id: '6',
                      value: countries.BELGIUM,
                      label: 'OPC'
                      // checked: selectedCountry === countries.BELGIUM
                    }}
                    onChange={() => {}}
                    customStyle={{
                      radio: '!text-mRegular !text-neutral900'
                    }}
                  />
                </div>{' '}
                <div className="w-[50%]">
                  <RadioButton
                    radioMetaData={{
                      name: 'country',
                      id: '7',
                      value: countries.BELGIUM,
                      label: 'Other'
                      // checked: selectedCountry === countries.BELGIUM
                    }}
                    onChange={() => {}}
                    customStyle={{
                      radio: '!text-mRegular !text-neutral900'
                    }}
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
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Manufacturer'}
                    />
                  </div>
                  <div className="w-[50%]">
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Retailer'}
                    />
                  </div>
                  <div className="w-[46%]">
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Wholesaler'}
                    />
                  </div>
                  <div className="w-[50%]">
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Corporate Retailer'}
                    />
                  </div>
                  <div className="w-[100%]">
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Other'}
                      showInput={true}
                      onInputChange={(e: any) => {
                        handleInputChange(
                          `formState.online.sections[${[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]}][organisationType_Other]`,
                          e.target.value,
                          dispatch,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'organisationType_Other'
                        );
                      }}
                      inputValue={
                        formState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['organisationType_Other'] ?? ''
                      }
                      inputError={
                        formErrorState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['organisationType_Other'] ?? ''
                      }
                      inputName={'Other'}
                      inputPlaceHolder="If other please specify"
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
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Diamonds'}
                    />
                  </div>
                  <div className="pl-[30px]">
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Colour Stones'}
                    />
                  </div>
                  <div className="w-[100%]">
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Jewellery'}
                    />
                  </div>
                  <div className="w-[100%]">
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Other'}
                      showInput={true}
                      onInputChange={(e: any) => {
                        handleInputChange(
                          `formState.online.sections[${[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]}][organisationType_Other]`,
                          e.target.value,
                          dispatch,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'organisationType_Other'
                        );
                      }}
                      inputValue={
                        formState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['organisationType_Other'] ?? ''
                      }
                      inputError={
                        formErrorState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['organisationType_Other'] ?? ''
                      }
                      inputName={'Other'}
                      inputPlaceHolder="If other please specify"
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
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Diamonds'}
                    />
                  </div>
                  <div className="pl-[30px]">
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Colour Stones'}
                    />
                  </div>
                  <div className="w-[100%]">
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Jewellery'}
                    />
                  </div>
                  <div className="w-[100%]">
                    <CheckboxComponent
                      onClick={() => {}}
                      isChecked={false}
                      checkboxLabel={'Other'}
                      showInput={true}
                      onInputChange={(e: any) => {
                        handleInputChange(
                          `formState.online.sections[${[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]}][organisationType_Other]`,
                          e.target.value,
                          dispatch,
                          kycScreenIdentifierNames.COMPANY_DETAILS,
                          'organisationType_Other'
                        );
                      }}
                      inputValue={
                        formState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['organisationType_Other'] ?? ''
                      }
                      inputError={
                        formErrorState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['organisationType_Other'] ?? ''
                      }
                      inputName={'Other'}
                      inputPlaceHolder="If other please specify"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="w-[50%] flex flex-col gap-[25px]">
            <div>
              <p className="text-mRegular text-neutral900">
                Member of any Business Organisation / Council*
              </p>
              <p className="text-sRegular text-neutral400">
                If yes then provide the name
              </p>
            </div>
            <div className="flex justify-between w-[60%]">
              {' '}
              {memberOfAnyBusinessOrganisation.map(data => {
                return (
                  <div key={data.id}>
                    <RadioButton
                      radioMetaData={data}
                      onChange={() => {}}
                      customStyle={{ radio: '!text-mRegular !text-neutral900' }}
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
              <div className="flex justify-between w-[60%]">
                {' '}
                {msmeData.map(data => {
                  return (
                    <div key={data.id}>
                      <RadioButton
                        radioMetaData={data}
                        onChange={() => {}}
                        customStyle={{
                          radio: '!text-mRegular !text-neutral900'
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
              <div className="flex justify-between w-[60%]">
                {' '}
                {moneyLaundering.map(data => {
                  return (
                    <div key={data.id}>
                      <RadioButton
                        radioMetaData={data}
                        onChange={() => {}}
                        customStyle={{
                          radio: '!text-mRegular !text-neutral900'
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
