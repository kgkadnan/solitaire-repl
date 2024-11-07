import { InputField } from '@/components/v2/common/input-field';
import { countries, kycScreenIdentifierNames } from '@/constants/enums/kyc';
import React, { useEffect, useState } from 'react';
import { handleInputChange } from '../helper/handle-change';
import { ManageLocales } from '@/utils/v2/translate';
import { DynamicMobileInput } from '@/components/v2/common/input-field/dynamic-mobile';
import { updateFormState } from '@/features/kyc/kyc';

import Select from 'react-select';
import { colourStyles } from '../helper/style/select-style';
import { RadioButton } from '@/components/v2/common/radio';

import CheckboxWithInput from '@/components/v2/common/check';
import RadioButtonWithInput from '@/components/v2/common/radio-with-input';
import { useGetCountryCodeQuery } from '@/features/api/current-ip';
import { useLazyGetAllCountryCodeQuery } from '@/features/api/get-country-code';
import { Tracking_KYC } from '@/constants/funnel-tracking';
import { trackEvent } from '@/utils/ga';

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

const businessTypes = [
  'Manufacturer',
  'Retailer',
  'Wholesaler',
  'Corporate Retailer'
];

const typesOfIndustryTypes = ['Diamonds', 'Colour Stones', 'Jewellery'];

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
  const { data, error } = useGetCountryCodeQuery({});
  const [triggerGetAllCountryCode] = useLazyGetAllCountryCodeQuery({});
  useEffect(() => {
    let isCountryCodeAvbl =
      formState.online.sections[kycScreenIdentifierNames.COMPANY_DETAILS][
        'company_country_code'
      ];

    let getCountryCodeFromLocalStorage = localStorage.getItem('userIp');
    let parsedData;
    if (getCountryCodeFromLocalStorage) {
      parsedData = JSON.parse(getCountryCodeFromLocalStorage); // Parse the JSON string
    }

    if (isCountryCodeAvbl?.length) {
      triggerGetAllCountryCode({}).then(data => {
        let getSpecificCountryData = data.data.filter((country: any) => {
          return country.code === isCountryCodeAvbl;
        });
        setSelectedCountryIso(getSpecificCountryData[0].iso);
      });
    } else if (parsedData.countryCode && parsedData.iso) {
      dispatch(
        updateFormState({
          name: `formState.online.sections[${[
            kycScreenIdentifierNames.COMPANY_DETAILS
          ]}][company_country_code]`,
          value: parsedData.countryCode
        })
      );
      setSelectedCountryIso(parsedData?.iso);
    } else {
      const userIp = JSON.parse(localStorage.getItem('userIp')!);

      if (userIp) {
        dispatch(
          updateFormState({
            name: `formState.online.sections[${[
              kycScreenIdentifierNames.COMPANY_DETAILS
            ]}][company_country_code]`,
            value: userIp.countryCode
          })
        );
        setSelectedCountryIso(userIp?.iso);
      } else if (data) {
        dispatch(
          updateFormState({
            name: `formState.online.sections[${[
              kycScreenIdentifierNames.COMPANY_DETAILS
            ]}][company_country_code]`,
            value: data.country_calling_code.replace('+', '')
          })
        );
        setSelectedCountryIso(data?.country);
      } else if (error) {
        console.error('Error fetching country code', error);
      }
    }
  }, [data, error]);

  useEffect(() => {
    trackEvent({
      action: Tracking_KYC.KYC_Company_Details_PageView,
      entry_point: localStorage.getItem('kyc_entryPoint') || '',
      category: 'KYC',
      country: localStorage.getItem('country') || ''
    });
  }, []);

  const [selectedCountryIso, setSelectedCountryIso] = useState('');

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
      name: 'isMemberOfBusiness',
      id: '1',
      value: true,
      label: 'Yes',
      checked:
        formState?.online?.sections?.[
          kycScreenIdentifierNames.COMPANY_DETAILS
        ]?.['is_member_of_business'] === true,
      inputs: [
        {
          id: '1',
          type: 'text',
          name: 'Name If you select “Yes”',
          onInputChange: (e: any) => {
            handleInputChange(
              `formState.online.sections[${[
                kycScreenIdentifierNames.COMPANY_DETAILS
              ]}][member_of_business_name]`,
              e.target.value,
              dispatch,
              kycScreenIdentifierNames.COMPANY_DETAILS,
              'member_of_business_name'
            );
          },
          error:
            formErrorState?.online?.sections?.[
              kycScreenIdentifierNames.COMPANY_DETAILS
            ]?.['member_of_business_name'] ?? '',
          placeholder: 'Enter Name',
          value:
            formState?.online?.sections?.[
              kycScreenIdentifierNames.COMPANY_DETAILS
            ]?.['member_of_business_name'] ?? ''
        }
      ]
    },
    {
      name: 'isMemberOfBusiness',
      id: '2',
      value: false,
      label: 'No',
      checked:
        formState?.online?.sections?.[
          kycScreenIdentifierNames.COMPANY_DETAILS
        ]?.['is_member_of_business'] === false
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
          type: 'text',
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
      name: 'antiMoneyLaunderingPolicyName',
      id: '1',
      value: true,
      label: 'Yes',
      checked:
        formState?.online?.sections?.[
          kycScreenIdentifierNames.COMPANY_DETAILS
        ]?.['is_anti_money_laundering'] === true
    },
    {
      name: 'antiMoneyLaunderingPolicyName',
      id: '2',
      value: false,
      label: 'No',
      checked:
        formState?.online?.sections?.[
          kycScreenIdentifierNames.COMPANY_DETAILS
        ]?.['is_anti_money_laundering'] === false,
      inputs: [
        {
          id: '1',
          type: 'text',
          name: 'Specify here',
          onInputChange: (e: any) => {
            handleInputChange(
              `formState.online.sections[${[
                kycScreenIdentifierNames.COMPANY_DETAILS
              ]}][no_anti_money_laundering_policy_reason]`,
              e.target.value,
              dispatch,
              kycScreenIdentifierNames.COMPANY_DETAILS,
              'no_anti_money_laundering_policy_reason'
            );
          },
          error:
            formErrorState?.online?.sections?.[
              kycScreenIdentifierNames.COMPANY_DETAILS
            ]?.['no_anti_money_laundering_policy_reason'] ?? '',
          placeholder: 'Specify here',
          value:
            formState?.online?.sections?.[
              kycScreenIdentifierNames.COMPANY_DETAILS
            ]?.['no_anti_money_laundering_policy_reason'] ?? ''
        }
      ],
      inputCustomStyle: 'right-[-154px]'
    }
  ];

  const organisationTypes = [
    'OPC',
    'Public Ltd.',
    'LLP',
    'Private Ltd.',
    'Partnership Firm',
    'Individual'
  ];
  const organisationTypesNew = [
    'OPC',
    'Public Ltd.',
    'LLP',
    'Private Ltd.',
    'Partnership Firm',
    'Individual',
    'Other'
  ];

  const [organisationType, setOrganisationType] = useState();

  const handleSelect = (value: any, formKey: string, setState: any) => {
    setState(value);

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
      inputValue,
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
    requiresInput: any,
    allowedValues?: any
  ) => {
    let newData: any = formState.online.sections[screenName]?.[key]?.filter(
      (item: any) => (Array.isArray(item) ? item[0] !== label : item !== label)
    );

    newData = newData ?? [];

    if (isChecked) {
      // If the checkbox requires input and it's provided, add both label and input value
      if (requiresInput) {
        inputValue = inputValue.replace(',', '');
        newData.push([label, inputValue]);

        let ndata = newData.filter((item: any) => {
          if (Array.isArray(item)) {
            return true; // Keep arrays
          } else {
            return allowedValues.includes(item); // Keep allowed strings
          }
        });

        newData = ndata;
      } else if (!requiresInput) {
        // If the checkbox doesn't require input, add only the label
        newData.push(label);
      }
    } else {
      if (
        label === 'Other' &&
        !isChecked &&
        inputValue &&
        !newData.some((item: any) => Array.isArray(item))
      ) {
        const filteredData = newData.filter((items: any) => {
          return items !== inputValue;
        });

        let ndata = filteredData.filter((item: any) => {
          if (Array.isArray(item)) {
            return true; // Keep arrays
          } else {
            return allowedValues.includes(item); // Keep allowed strings
          }
        });

        newData = ndata;
      }
    }

    dispatch(
      updateFormState({
        name: `formErrorState.online.sections.${[screenName]}.${[key]}`,
        value: ''
      })
    );
    dispatch(updateFormState({ name: path, value: newData }));
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center gap-[16px]">
        <span className="rounded-[100%] bg-primaryMain flex items-center justify-center text-neutral25 text-lMedium font-medium w-[40px] h-[40px]">
          {currentStepperStep + 1}
        </span>
        <h1 className="text-headingS font-medium text-neutral900">
          {ManageLocales('app.kyc.companyDetail.header.title')}
        </h1>
      </div>
      <hr className="border-neutral200" />
      <div className="flex justify-center">
        <div
          className={` flex flex-col gap-[16px] flex-wrap   w-[760px] ${
            country === 'Belgium'
              ? 'h-[121vh]'
              : country === 'India'
                ? 'h-[137vh]'
                : 'h-[1080px]'
          }`}
        >
          <div className="w-[50%] flex flex-col gap-[16px]">
            {' '}
            {/* <div className="flex gap-[16px]"> */}
            <div className={'w-[100%]'}>
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
            <div className={'w-[100%]'}>
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
                  )
                }
                type="number"
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
              <div className={'w-[100%]'}>
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
              <div className={'w-[100%]'}>
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
              <>
                <div className={'w-[100%]'}>
                  <div className="flex text-left flex-col w-full">
                    {' '}
                    <p className="text-mRegular text-neutral-900">City*</p>
                    <Select
                      name="city"
                      placeholder={'Enter City'}
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
                      value={
                        formState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['city']
                          ? {
                              label:
                                formState?.online?.sections?.[
                                  kycScreenIdentifierNames.COMPANY_DETAILS
                                ]?.['city'],
                              value:
                                formState?.online?.sections?.[
                                  kycScreenIdentifierNames.COMPANY_DETAILS
                                ]?.['city']
                            }
                          : ''
                      }
                      // autoFocus={false}
                    />
                    {formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['city'] && (
                      <p className="text-dangerMain h-1">
                        {formErrorState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['city'] &&
                          formErrorState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['city']}
                      </p>
                    )}
                  </div>
                  <div className="h-[4px]"></div>
                </div>
              </>
            )}
            {(country === countries.BELGIUM || country === countries.USA) && (
              <div className={'w-[100%]'}>
                {' '}
                <InputField
                  label={'Registered Address Line 2'}
                  onChange={e =>
                    handleInputChange(
                      `formState.online.sections[${[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]}][address_line_2]`,
                      e.target.value,
                      dispatch,
                      kycScreenIdentifierNames.COMPANY_DETAILS,
                      'address_line_2'
                    )
                  }
                  type="text"
                  name={'Registered Address Line 2'}
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
              <div className={'w-[100%]'}>
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
              <div className={'w-[100%]'}>
                {' '}
                <DynamicMobileInput
                  selectedCountryIso={selectedCountryIso}
                  label={'Contact Number*'}
                  handleInputChange={e =>
                    handleInputChange(
                      `formState.online.sections[${[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]}][company_phone_number]`,
                      e.target.value,
                      dispatch,
                      kycScreenIdentifierNames.COMPANY_DETAILS,
                      'company_phone_number'
                    )
                  }
                  handleSelectChange={({ value, iso }: any) => {
                    setSelectedCountryIso(iso);
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
                      `+${
                        formState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['company_country_code']
                      }` ?? '',
                    value:
                      `+${
                        formState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['company_country_code']
                      }` ?? ''
                  }}
                />{' '}
              </div>
            )}
            {country === countries.INDIA && (
              <div className={'w-[100%]'}>
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
              <div className={'w-[100%]'}>
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
              <div className={'w-[100%]'}>
                <DynamicMobileInput
                  selectedCountryIso={selectedCountryIso}
                  label={'Contact Number*'}
                  handleInputChange={e =>
                    handleInputChange(
                      `formState.online.sections[${[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]}][company_phone_number]`,
                      e.target.value,
                      dispatch,
                      kycScreenIdentifierNames.COMPANY_DETAILS,
                      'company_phone_number'
                    )
                  }
                  handleSelectChange={({ value, iso }: any) => {
                    setSelectedCountryIso(iso);
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
                      `+${
                        formState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['company_country_code']
                      }` ?? '',
                    value:
                      `+${
                        formState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['company_country_code']
                      }` ?? ''
                  }}
                />
              </div>
            )}
            {country === countries.INDIA && (
              <div className="flex w-[100%]">
                <div className="w-full flex flex-col">
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-mRegular text-neutral900">
                      Business Type*
                    </p>

                    <div className="flex flex-wrap gap-[14px]">
                      {' '}
                      <div className="w-[46%]">
                        <CheckboxWithInput
                          label="Manufacturer"
                          defaultChecked={formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['business_type']?.includes('Manufacturer')}
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['business_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['business_type']) ??
                            ''
                          }
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
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['business_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['business_type']) ??
                            ''
                          }
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
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['business_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['business_type']) ??
                            ''
                          }
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
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['business_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['business_type']) ??
                            ''
                          }
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
                          ]?.['business_type']?.some(
                            (item: any) => !businessTypes.includes(item)
                          )}
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['business_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['business_type']) ??
                            ''
                          }
                          inputError={
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['business_type'] ?? ''
                          }
                          showError={false}
                          defaultValue={formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['business_type']?.find(
                            (item: any) => !businessTypes.includes(item)
                          )}
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
                              true,
                              businessTypes
                            )
                          }
                          showInput={true}
                          inputName={'Other'}
                          inputPlaceHolder={'If other please specify'}
                        />
                      </div>
                    </div>
                  </div>
                  {formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['business_type'] && (
                    <span className="text-dangerMain">
                      {
                        formErrorState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['business_type']
                      }
                    </span>
                  )}
                </div>
              </div>
            )}
            {country === countries.INDIA && (
              <div className="w-[100%] flex flex-col  h-[26vh]">
                <div className="flex flex-col gap-[10px]">
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
                        onError={
                          (formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type'] !== 'Other' &&
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']) ??
                          ''
                        }
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
                        onError={
                          (formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type'] !== 'Other' &&
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']) ??
                          ''
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
                        onError={
                          (formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type'] !== 'Other' &&
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']) ??
                          ''
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
                        onError={
                          (formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type'] !== 'Other' &&
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']) ??
                          ''
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
                        onError={
                          (formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type'] !== 'Other' &&
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']) ??
                          ''
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
                        onError={
                          (formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type'] !== 'Other' &&
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']) ??
                          ''
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
                    <div
                      className={`w-[100%] relative ${
                        organisationTypes.includes(
                          formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type']
                        ) && 'mb-[45px]'
                      }`}
                    >
                      <RadioButtonWithInput
                        name="organisationType"
                        label={'Other'}
                        value={'Other'}
                        showError={false}
                        defaultSelected={
                          formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type']?.length > 0
                            ? organisationTypes.includes(
                                formState?.online?.sections?.[
                                  kycScreenIdentifierNames.COMPANY_DETAILS
                                ]?.['organisation_type']
                              )
                              ? false
                              : true
                            : false
                        }
                        defaultValue={
                          formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type']?.length > 0 &&
                          organisationTypesNew.includes(
                            formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']
                          )
                            ? ''
                            : formState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['organisation_type']
                        }
                        onError={
                          (formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type'] !== 'Other' &&
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']) ??
                          ''
                        }
                        onInputError={
                          formErrorState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type'] ?? ''
                        }
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
                {formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_DETAILS
                ]?.['organisation_type'] && (
                  <span
                    className={`text-dangerMain ${
                      organisationType === 'Other' && 'mt-[3.25rem]'
                    }`}
                  >
                    {
                      formErrorState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['organisation_type']
                    }
                  </span>
                )}
              </div>
            )}
            {(country === countries.BELGIUM || country === countries.USA) && (
              <div className="flex w-[100%]">
                <div className="w-full flex flex-col">
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-mRegular text-neutral900">
                      Business Type*
                    </p>

                    <div className="flex flex-wrap gap-[14px]">
                      {' '}
                      <div className="w-[46%]">
                        <CheckboxWithInput
                          label="Manufacturer"
                          defaultChecked={formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['business_type']?.includes('Manufacturer')}
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['business_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['business_type']) ??
                            ''
                          }
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
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['business_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['business_type']) ??
                            ''
                          }
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
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['business_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['business_type']) ??
                            ''
                          }
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
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['business_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['business_type']) ??
                            ''
                          }
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
                          ]?.['business_type']?.some(
                            (item: any) => !businessTypes.includes(item)
                          )}
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['business_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['business_type']) ??
                            ''
                          }
                          inputError={
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['business_type'] ?? ''
                          }
                          showError={false}
                          defaultValue={formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['business_type']?.find(
                            (item: any) => !businessTypes.includes(item)
                          )}
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
                              true,
                              businessTypes
                            )
                          }
                          showInput={true}
                          inputName={'Other'}
                          inputPlaceHolder={'If other please specify'}
                        />
                      </div>
                    </div>
                  </div>
                  {formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['business_type'] && (
                    <span className="text-dangerMain">
                      {
                        formErrorState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['business_type']
                      }
                    </span>
                  )}
                </div>
              </div>
            )}
            {(country === countries.BELGIUM || country === countries.USA) && (
              <div
                className={`flex w-[380px] ${
                  country === 'Belgium' && 'h-[22vh]'
                } `}
              >
                <div className="w-full flex flex-col ">
                  <div className="flex flex-col gap-[5px]">
                    <p className="text-mRegular text-neutral900">
                      Type of Industry*
                    </p>

                    <div className="flex flex-wrap gap-[14px]">
                      {' '}
                      <div className="w-[46%]">
                        <CheckboxWithInput
                          label="Diamonds"
                          defaultChecked={formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['industry_type']?.includes('Diamonds')}
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['industry_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['industry_type']) ??
                            ''
                          }
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
                      <div className="w-[50%]">
                        <CheckboxWithInput
                          label="Colour Stones"
                          defaultChecked={formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['industry_type']?.includes('Colour Stones')}
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['industry_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['industry_type']) ??
                            ''
                          }
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
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['industry_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['industry_type']) ??
                            ''
                          }
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
                          ]?.['industry_type']?.some(
                            (item: any) => !typesOfIndustryTypes.includes(item)
                          )}
                          inputError={
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['industry_type'] ?? ''
                          }
                          showError={false}
                          defaultValue={formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['industry_type']?.find(
                            (item: any) => !typesOfIndustryTypes.includes(item)
                          )}
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['industry_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['industry_type']) ??
                            ''
                          }
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
                              true,
                              typesOfIndustryTypes
                            )
                          }
                          showInput={true}
                          inputName={'Other'}
                          inputPlaceHolder={'If other please specify'}
                        />
                      </div>
                    </div>
                  </div>
                  {formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['industry_type'] && (
                    <span className="text-dangerMain">
                      {
                        formErrorState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['industry_type']
                      }
                    </span>
                  )}
                </div>
              </div>
            )}
            {country === countries.USA && (
              <>
                <div className="w-[100%] flex flex-col  h-[25vh]">
                  <div className="flex flex-col gap-[10px]">
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
                          onError={
                            (formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type'] !== 'Other' &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['organisation_type']) ??
                            ''
                          }
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
                          onError={
                            (formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type'] !== 'Other' &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['organisation_type']) ??
                            ''
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
                          onError={
                            (formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type'] !== 'Other' &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['organisation_type']) ??
                            ''
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
                          onError={
                            (formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type'] !== 'Other' &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['organisation_type']) ??
                            ''
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
                          onError={
                            (formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type'] !== 'Other' &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['organisation_type']) ??
                            ''
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
                          onError={
                            (formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type'] !== 'Other' &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['organisation_type']) ??
                            ''
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
                      <div
                        className={`w-[100%] relative ${
                          organisationTypes.includes(
                            formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']
                          ) && 'mb-[45px]'
                        }`}
                      >
                        <RadioButtonWithInput
                          name="organisationType"
                          label={'Other'}
                          value={'Other'}
                          showError={false}
                          defaultSelected={
                            formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']?.length > 0
                              ? organisationTypes.includes(
                                  formState?.online?.sections?.[
                                    kycScreenIdentifierNames.COMPANY_DETAILS
                                  ]?.['organisation_type']
                                )
                                ? false
                                : true
                              : false
                          }
                          defaultValue={
                            formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']?.length > 0 &&
                            organisationTypesNew.includes(
                              formState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['organisation_type']
                            )
                              ? ''
                              : formState?.online?.sections?.[
                                  kycScreenIdentifierNames.COMPANY_DETAILS
                                ]?.['organisation_type']
                          }
                          onError={
                            (formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type'] !== 'Other' &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['organisation_type']) ??
                            ''
                          }
                          onInputError={
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type'] ?? ''
                          }
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
                  {formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['organisation_type'] && (
                    <span
                      className={`text-dangerMain ${
                        organisationType === 'Other' && 'mt-[3.25rem]'
                      }`}
                    >
                      {
                        formErrorState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['organisation_type']
                      }
                    </span>
                  )}
                </div>
                {/* <div className="h-[10vh]"></div> */}
              </>
            )}
          </div>

          <div className="w-[50%] flex flex-col gap-[16px]">
            {country === countries.INDIA && (
              <div className={'w-[100%]'}>
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
                    )
                  }
                  type="email"
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
              <div className={'w-[100%]'}>
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
              <div className={'w-[100%]'}>
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
              <div className={'w-[100%]'}>
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
            {country === countries.USA && (
              <div className={'w-[100%]'}>
                {' '}
                <InputField
                  label={'Federal Tax ID*'}
                  onChange={e =>
                    handleInputChange(
                      `formState.online.sections[${[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]}][federal_tax_id]`,
                      e.target.value,
                      dispatch,
                      kycScreenIdentifierNames.COMPANY_DETAILS,
                      'federal_tax_id'
                    )
                  }
                  type="text"
                  name={'Federal Tax ID*'}
                  value={
                    formState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['federal_tax_id'] ?? ''
                  }
                  errorText={
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['federal_tax_id'] ?? ''
                  }
                  placeholder={'Enter number'}
                  styles={{
                    input: `${
                      formErrorState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['federal_tax_id']
                        ? 'border-dangerMain'
                        : 'border-neutral200'
                    }`
                  }}
                />{' '}
              </div>
            )}
            {country === countries.INDIA && (
              <div className={'w-[100%]'}>
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
              <div className={'w-[100%]'}>
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
              <div className={'w-[100%]'}>
                <InputField
                  label={'Business Registration Number (CIN)*'}
                  onChange={e =>
                    handleInputChange(
                      `formState.online.sections[${[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]}][business_registration_number]`,
                      e.target.value,
                      dispatch,
                      kycScreenIdentifierNames.COMPANY_DETAILS,
                      'business_registration_number'
                    )
                  }
                  type="text"
                  name={'Business Registration Number (CIN)*'}
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
            <div className={'w-[100%]'}>
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
            <div className={'w-[100%]'}>
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
              <div className={'w-[100%]'}>
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
              <div className="flex w-[380px]">
                <div className="w-full flex flex-col ">
                  <div className="flex flex-col gap-[5px]">
                    <p className="text-mRegular text-neutral900">
                      Type of Industry*
                    </p>

                    <div className="flex flex-wrap gap-[14px]">
                      {' '}
                      <div className="w-[46%]">
                        <CheckboxWithInput
                          label="Diamonds"
                          defaultChecked={formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['industry_type']?.includes('Diamonds')}
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['industry_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['industry_type']) ??
                            ''
                          }
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
                      <div className="w-[50%]">
                        <CheckboxWithInput
                          label="Colour Stones"
                          defaultChecked={formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['industry_type']?.includes('Colour Stones')}
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['industry_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['industry_type']) ??
                            ''
                          }
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
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['industry_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['industry_type']) ??
                            ''
                          }
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
                      <div className="w-[380px]">
                        <CheckboxWithInput
                          label="Other"
                          defaultChecked={formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['industry_type']?.some(
                            (item: any) => !typesOfIndustryTypes.includes(item)
                          )}
                          defaultValue={formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['industry_type']?.find(
                            (item: any) => !typesOfIndustryTypes.includes(item)
                          )}
                          onError={
                            (!formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['industry_type']?.some((item: any) =>
                              item.includes('Other')
                            ) &&
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['industry_type']) ??
                            ''
                          }
                          inputError={
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['industry_type'] ?? ''
                          }
                          showError={false}
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
                              true,
                              typesOfIndustryTypes
                            )
                          }
                          showInput={true}
                          inputName={'Other'}
                          inputPlaceHolder={'If other please specify'}
                        />
                      </div>
                    </div>
                  </div>
                  {formErrorState?.online?.sections?.[
                    kycScreenIdentifierNames.COMPANY_DETAILS
                  ]?.['industry_type'] && (
                    <span className="text-dangerMain">
                      {
                        formErrorState?.online?.sections?.[
                          kycScreenIdentifierNames.COMPANY_DETAILS
                        ]?.['industry_type']
                      }
                    </span>
                  )}
                </div>
              </div>
            )}
            {country === countries.BELGIUM && (
              <div className="w-[100%] flex flex-col">
                <div className="flex flex-col gap-[10px]">
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
                        onError={
                          (formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type'] !== 'Other' &&
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']) ??
                          ''
                        }
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
                        onError={
                          (formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type'] !== 'Other' &&
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']) ??
                          ''
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
                        onError={
                          (formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type'] !== 'Other' &&
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']) ??
                          ''
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
                        onError={
                          (formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type'] !== 'Other' &&
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']) ??
                          ''
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
                        onError={
                          (formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type'] !== 'Other' &&
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']) ??
                          ''
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
                        onError={
                          (formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type'] !== 'Other' &&
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']) ??
                          ''
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
                    <div
                      className={`w-[100%] relative ${
                        organisationTypes.includes(
                          formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type']
                        ) && 'mb-[45px]'
                      }`}
                    >
                      <RadioButtonWithInput
                        name="organisationType"
                        label={'Other'}
                        value={'Other'}
                        showError={false}
                        defaultSelected={
                          formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type']?.length > 0
                            ? organisationTypes.includes(
                                formState?.online?.sections?.[
                                  kycScreenIdentifierNames.COMPANY_DETAILS
                                ]?.['organisation_type']
                              )
                              ? false
                              : true
                            : false
                        }
                        defaultValue={
                          formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type']?.length > 0 &&
                          organisationTypesNew.includes(
                            formState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']
                          )
                            ? ''
                            : formState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['organisation_type']
                        }
                        onError={
                          (formState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type'] !== 'Other' &&
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['organisation_type']) ??
                          ''
                        }
                        onInputError={
                          formErrorState?.online?.sections?.[
                            kycScreenIdentifierNames.COMPANY_DETAILS
                          ]?.['organisation_type'] ?? ''
                        }
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
                {formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_DETAILS
                ]?.['organisation_type'] && (
                  <span
                    className={`text-dangerMain ${
                      organisationType === 'Other' && 'mt-[4px]'
                    }`}
                  >
                    {
                      formErrorState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['organisation_type']
                    }
                  </span>
                )}
              </div>
            )}
            <div
              className={`w-[100%] flex flex-col ${
                formState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_DETAILS
                ]?.['is_member_of_business'] === true && 'mb-[54px]'
              }`}
            >
              <div className="flex flex-col gap-[11px] ">
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
                        <RadioButton
                          radioMetaData={data}
                          onChange={() => {
                            handleRadioChange({
                              value: data.value,
                              formKey: 'is_member_of_business'
                            });
                          }}
                          onError={
                            formErrorState?.online?.sections?.[
                              kycScreenIdentifierNames.COMPANY_DETAILS
                            ]?.['is_member_of_business'] ?? ''
                          }
                          customStyle={{
                            radio: `!text-mRegular !text-neutral900  ${
                              formState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['is_member_of_business'] === true &&
                              'mb-[10px]'
                            }`
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              {formErrorState?.online?.sections?.[
                kycScreenIdentifierNames.COMPANY_DETAILS
              ]?.['is_member_of_business'] && (
                <span className="text-dangerMain">
                  {
                    formErrorState?.online?.sections?.[
                      kycScreenIdentifierNames.COMPANY_DETAILS
                    ]?.['is_member_of_business']
                  }
                </span>
              )}
            </div>
            {country === countries.INDIA && (
              <div className="w-[100%] flex flex-col ">
                <div className="flex flex-col gap-[11px]">
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
                            onError={
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['is_msme_registered'] ?? ''
                            }
                            customStyle={{
                              radio: `!text-mRegular !text-neutral900  ${
                                formState?.online?.sections?.[
                                  kycScreenIdentifierNames.COMPANY_DETAILS
                                ]?.['is_msme_registered'] === true &&
                                'mb-[10px]'
                              }`
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                {formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_DETAILS
                ]?.['is_msme_registered'] && (
                  <span className="text-dangerMain">
                    {
                      formErrorState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['is_msme_registered']
                    }
                  </span>
                )}
              </div>
            )}
            {country === countries.USA && (
              <div
                className={`w-[100%] flex flex-col 
            ${
              formState?.online?.sections?.[
                kycScreenIdentifierNames.COMPANY_DETAILS
              ]?.['is_anti_money_laundering'] === false && 'mb-[45px]'
            }
            
            `}
              >
                <div className="flex flex-col gap-[25px]">
                  <div>
                    <p className="text-mRegular text-neutral900">
                      Have you instituted an Anti-Money laundering policy in
                      your company?*
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
                          <RadioButton
                            radioMetaData={data}
                            onChange={() => {
                              handleRadioChange({
                                value: data.value,
                                formKey: 'is_anti_money_laundering'
                              });
                            }}
                            onError={
                              formErrorState?.online?.sections?.[
                                kycScreenIdentifierNames.COMPANY_DETAILS
                              ]?.['is_anti_money_laundering'] ?? ''
                            }
                            customStyle={{
                              radio: `!text-mRegular !text-neutral900  ${
                                formState?.online?.sections?.[
                                  kycScreenIdentifierNames.COMPANY_DETAILS
                                ]?.['is_anti_money_laundering'] === false &&
                                'mb-[10px]'
                              }`
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                {formErrorState?.online?.sections?.[
                  kycScreenIdentifierNames.COMPANY_DETAILS
                ]?.['is_anti_money_laundering'] && (
                  <span className="text-dangerMain">
                    {
                      formErrorState?.online?.sections?.[
                        kycScreenIdentifierNames.COMPANY_DETAILS
                      ]?.['is_anti_money_laundering']
                    }
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <hr className="border-neutral200" />
      </div>
    </div>
  );
};

export default CompanyDetail;
