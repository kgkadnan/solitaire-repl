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
  console.log(
    formState?.online?.sections?.[kycScreenIdentifierNames.COMPANY_DETAILS].city
  );

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
        <div className="flex flex-col gap-[16px] w-[760px]">
          {' '}
          <div className="flex gap-[16px]">
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
            {country === countries.BELGIUM ||
              (country === countries.USA && (
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
                />
              ))}

            {country === countries.INDIA && (
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
              />
            )}
          </div>
          <div className="flex gap-[16px]">
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

            {country === countries.BELGIUM ||
              (country === countries.USA && (
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
                />
              ))}

            {country === countries.INDIA && (
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
              />
            )}
          </div>
          <div className="flex gap-[16px]">
            {country === countries.INDIA && (
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
              />
            )}
            {country === countries.BELGIUM ||
              (country === countries.USA && (
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
              ))}

            {country === countries.INDIA && (
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
              />
            )}

            {country === countries.BELGIUM ||
              (country === countries.USA && (
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
              ))}
          </div>
          <div className="flex gap-[16px]">
            {country === countries.INDIA && (
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
            )}
            {country === countries.BELGIUM ||
              (country === countries.USA && (
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
              ))}
            {country === countries.INDIA && (
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
              />
            )}
            {country === countries.BELGIUM ||
              (country === countries.USA && (
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
              ))}
          </div>
          <div className="flex gap-[16px]">
            {country === countries.INDIA && (
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
              />
            )}
            {country === countries.BELGIUM ||
              (country === countries.USA && (
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
              ))}
            {country === countries.INDIA && (
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
            )}
            {country === countries.BELGIUM ||
              (country === countries.USA && (
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
              ))}
          </div>
          <div className="flex gap-[16px]">
            {country === countries.INDIA && (
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
            )}
            <div className="w-full flex flex-col gap-[5px]">
              <p className="text-mRegular text-neutral900">Type of Industry</p>

              <div className="flex justify-between flex-wrap gap-[10px]">
                {' '}
                <div className="w-[50%]">
                  <CheckboxComponent
                    onClick={() => {}}
                    isChecked={false}
                    checkboxLabel={'Diamonds'}
                  />
                </div>
                <div className="">
                  <CheckboxComponent
                    onClick={() => {}}
                    isChecked={false}
                    checkboxLabel={'Colour Stones'}
                  />
                </div>
                <div className="">
                  <CheckboxComponent
                    onClick={() => {}}
                    isChecked={false}
                    checkboxLabel={'Jewellery'}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr className="border-neutral200" />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
