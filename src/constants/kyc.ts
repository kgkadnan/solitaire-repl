import {
  validateFirstName,
  validateLastName,
  validatePhone,
  validateEmail
} from '@/app/my-account/kyc/helper/handle-validation';
import HandIcon from '@public/assets/icons/noto_backhand-index-pointing-up.svg';
import {
  fieldType
  // supportedMediaFormat,
  // supportedMediaUnit
} from './enums/kyc';

// const FILE_SIZE_LIMIT = 100;
export const KYCForm = [
  {
    country: {
      fullName: 'Belgium',
      shortName: 'Belgium'
    },
    online: [
      {
        screen: 'Personal Details',
        icon: HandIcon,
        screenName: 'personal_details',
        fields: [
          {
            name: 'First Name*',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            key: 'first_name'
          },
          {
            name: 'Last Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'last_name'
          },
          {
            name: 'Contact Number*',
            type: fieldType.PHONE_NUMBER,
            inputType: 'number',
            isRequired: true,
            handleChange: () => {},
            key: ['country_code', 'phone'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          }
        ]
      },

      //Company Details
      {
        screen: 'Company Details',
        icon: HandIcon,
        screenName: 'company_details',
        fields: [
          {
            name: 'Registered Company Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'company_name'
          },
          {
            name: 'Year of Establishment*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'year_of_establishment'
          },
          {
            name: 'Registered Address*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'address'
          },
          {
            name: 'Company Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'phone',
            isRequired: true,
            handleChange: () => {},
            key: ['company_country_code', 'company_phone_number'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          },
          {
            name: 'Company Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'company_email'
          },
          {
            name: 'Business Type*',
            type: fieldType.CHECKBOX,
            key: 'business_type',
            checkboxData: [
              {
                name: 'Manufacturer',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: []
              },
              {
                name: 'Retailer',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: []
              },
              {
                name: 'Wholesaler',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: []
              },
              {
                name: 'Corporate Retailer',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: []
              },
              {
                name: 'Other',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: [],
                isInput: true,
                inputName: '',
                inputValue: '',
                handleInputChange: () => {},
                placeholder: 'If other please specify'
              }
            ]
          },
          {
            name: 'Type of Industry*',
            type: fieldType.CHECKBOX,
            key: 'industry_type',
            checkboxData: [
              {
                name: 'Diamonds',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: []
              },
              {
                name: 'Colour Stones',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: []
              },
              {
                name: 'Jewellery',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: []
              },
              {
                name: 'Other',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: [],
                isInput: true,
                inputName: '',
                inputValue: '',
                handleInputChange: () => {},
                placeholder: 'If other please specify'
              }
            ]
          },
          {
            name: 'Organisation Type*',
            type: fieldType.RADIO,
            key: 'organisation_type',
            radioData: [
              {
                id: 1,
                label: 'Individual',
                value: '',
                onChange: () => {},
                name: ''
              },
              {
                id: 2,
                label: 'Partnership Firm',
                value: '',
                onChange: () => {},
                name: ''
              },
              {
                id: 3,
                label: 'Private Ltd.',
                value: '',
                onChange: () => {},
                name: ''
              },
              {
                id: 4,
                label: 'LLP',
                value: '',
                onChange: () => {},
                name: ''
              },
              {
                id: 5,
                label: 'Public Ltd.',
                value: '',
                onChange: () => {},
                name: ''
              },
              {
                id: 6,
                label: 'OPC',
                value: '',
                onChange: () => {},
                name: ''
              },
              {
                id: 7,
                label: 'Other',
                value: '',
                onChange: () => {},
                name: '',
                isInput: true,
                inputName: '',
                inputValue: '',
                handleInputChange: '',
                placeholder: 'If other please specify',
                inputStyle: 'w-[150px]'
              }
            ]
          },
          {
            name: 'Business Registration Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'business_registration_number'
          },
          {
            name: 'VAT Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'vat_number'
          },
          {
            name: 'Fax Number',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'fax_number'
          },
          {
            name: 'Subsidiary/Affiliated Company',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'subsidiary_company'
          },
          {
            name: 'Member of any Business Organisation / Council*',
            subTitle: 'If yes then provide the name',
            type: fieldType.RADIOWITHINPUT,
            key: 'is_member_of_business',
            radioData: [
              {
                id: 1,
                label: 'Yes',
                value: '',
                onChange: () => {},
                name: ''
              },
              {
                id: 1,
                label: 'No',
                value: '',
                onChange: () => {},
                name: ''
              }
            ],
            dynamicCondition: 'Yes',
            dynamicField: [
              {
                name: 'Name If you select “Yes”',
                type: fieldType.FLOATING_INPUT,
                inputType: 'text',
                isRequired: true,
                handleChange: () => {},
                key: 'member_of_business_name'
              }
            ]
          },
          {
            label: 'Ultimate Beneficiary Details',
            name: 'Name*',
            type: fieldType.FLOATING_INPUT_WITH_LABEL,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'ultimate_beneficiary_name'
          },
          {
            name: 'Ownership%',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'ownership_percentage'
          }
        ]
      },

      //Banking Details
      {
        screen: 'Banking Details',
        fields: [
          {
            name: 'Bank Name*',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            key: 'bank_name'
          },
          {
            label: 'Banking Details',
            name: 'Account Holder Name*',
            type: fieldType.FLOATING_INPUT_WITH_LABEL,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'account_holder_name'
          },
          {
            name: 'Account Number/IBN Number*',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            key: 'account_number'
          },
          {
            name: 'Swift Code*',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            key: 'swift_code'
          }
        ]
      }
    ],
    offline: {
      download: 'link_to_kyc_form.pdf'
    },
    attachment: [
      {
        id: '1',
        label: 'FEIN No. / Tax No. / Business Registration Copy',
        isRequired: true,
        key: 'FEIN_No._/_tax_no._/_business_registration_copy',
        maxFile: 1,
        minFile: 1
      },
      {
        id: '2',
        label: 'Driving License/Passport',
        isRequired: true,
        key: 'driving_license_/_passport',
        maxFile: 1,
        minFile: 1
      },
      {
        id: '3',
        label: 'ID Copy / Residency Copy',
        isRequired: true,
        key: 'ID_copy_/_residency_copy',
        maxFile: 1,
        minFile: 1
      }
    ]
  },
  {
    country: {
      fullName: 'India',
      shortName: 'india'
    },
    online: [
      {
        screen: 'Personal Details',
        icon: HandIcon,
        screenName: 'personal_details',
        fields: [
          {
            name: 'First Name*',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: validateFirstName,
            key: 'first_name'
          },
          {
            name: 'Last Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: validateLastName,
            key: 'last_name'
          },
          {
            name: 'Contact Number*',
            type: fieldType.PHONE_NUMBER,
            inputType: 'number',
            isRequired: true,
            handleChange: validatePhone,
            key: ['country_code', 'phone'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          },
          {
            name: 'Contact Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'email',
            isRequired: true,
            handleChange: validateEmail,
            key: 'email'
          }
        ]
      },

      //Company Details
      {
        screen: 'Company Details',
        icon: HandIcon,
        screenName: 'company_details',
        fields: [
          {
            name: 'Registered Company Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'company_name'
          },
          {
            name: 'Year of Establishment*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'year_of_establishment'
          },
          {
            name: 'Registered Address*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'address'
          },
          {
            name: 'City*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'city'
          },
          {
            name: 'State*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'state'
          },
          {
            name: 'Pin-Code*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'number',
            isRequired: true,
            handleChange: () => {},
            key: 'pincode'
          },
          {
            name: 'Company Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: ['company_country_code', 'company_phone_number'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          },
          {
            name: 'Company Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'company_email'
          },
          {
            name: 'Business Type*',
            type: fieldType.CHECKBOX,
            key: 'business_type',
            checkboxData: [
              {
                name: 'Manufacturer',
                handleChange: () => {},
                data: 'Manufacturer',
                row: [],
                isChecked: []
              },
              {
                name: 'Retailer',
                handleChange: () => {},
                data: 'Retailer',
                row: [],
                isChecked: []
              },
              {
                name: 'Wholesaler',
                handleChange: () => {},
                data: 'Wholesaler',
                row: [],
                isChecked: []
              },
              {
                name: 'Corporate Retailer',
                handleChange: () => {},
                data: 'Corporate Retailer',
                row: [],
                isChecked: []
              },
              {
                name: 'Other',
                handleChange: () => {},
                data: 'Other',
                row: [],
                isChecked: [],
                isInput: true,
                inputName: '',
                inputValue: '',
                handleInputChange: () => {},
                placeholder: 'If other please specify'
              }
            ]
          },
          {
            name: 'Type of Industry*',
            type: fieldType.CHECKBOX,
            key: 'industry_type',
            checkboxData: [
              {
                name: 'Diamonds',
                handleChange: () => {},
                data: 'Diamonds',
                row: [],
                isChecked: []
              },
              {
                name: 'Colour Stones',
                handleChange: () => {},
                data: 'Colour Stones',
                row: [],
                isChecked: []
              },
              {
                name: 'Jewellery',
                handleChange: () => {},
                data: 'Jewellery',
                row: [],
                isChecked: []
              },
              {
                name: 'Other',
                handleChange: () => {},
                data: 'Other',
                row: [],
                isChecked: [],
                isInput: true,
                inputName: '',
                inputValue: '',
                handleInputChange: () => {},
                placeholder: 'If other please specify'
              }
            ]
          },
          {
            name: 'Organisation Type*',
            type: fieldType.RADIO,
            key: 'organisation_type',
            radioData: [
              {
                id: 1,
                label: 'Individual',
                value: 'Individual',
                handleChange: () => {},
                name: 'organisationType'
              },
              {
                id: 2,
                label: 'Partnership Firm',
                value: 'Partnership Firm',
                handleChange: () => {},
                name: 'organisationType'
              },
              {
                id: 3,
                label: 'Private Ltd.',
                value: 'Private Ltd',
                handleChange: () => {},
                name: 'organisationType'
              },
              {
                id: 4,
                label: 'LLP',
                value: 'LLP',
                handleChange: () => {},
                name: 'organisationType'
              },
              {
                id: 5,
                label: 'Public Ltd.',
                value: 'Public Ltd',
                handleChange: () => {},
                name: 'organisationType'
              },
              {
                id: 6,
                label: 'OPC',
                value: 'OPC',
                handleChange: () => {},
                name: 'organisationType'
              },
              {
                id: 7,
                label: 'Other',
                value: 'Other',
                handleChange: () => {},
                name: 'organisationType',
                isInput: true,
                inputName: 'Other',
                // inputValue: '',
                // handleInputChange: '',
                placeholder: 'If other please specify',
                inputStyle: 'w-[150px]'
              }
            ]
          },
          {
            name: 'Business Registration Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'business_registration_number'
          },
          {
            name: 'Pan-Card Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'company_pan_number'
          },
          {
            name: 'GST Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'gst_number'
          },
          {
            name: 'Subsidiary/Affiliated Company',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'subsidiary_company'
          },
          {
            name: 'Member of any Business Organisation / Council*',
            subTitle: 'If yes then provide the name',
            type: fieldType.RADIOWITHINPUT,
            key: 'is_member_of_business',
            radioData: [
              {
                id: 1,
                label: 'Yes',
                value: 'Yes',
                handleChange: () => {},
                name: 'isMemberOfBusiness'
              },
              {
                id: 1,
                label: 'No',
                value: 'No',
                handleChange: () => {},
                name: 'isMemberOfBusiness'
              }
            ],
            dynamicCondition: 'Yes',
            dynamicField: [
              {
                name: 'Name If you select “Yes”',
                type: fieldType.FLOATING_INPUT,
                inputType: 'text',
                isRequired: true,
                handleChange: () => {},
                key: 'member_of_business_name'
              }
            ]
          },
          {
            name: 'Registered under MSME Act',
            subTitle:
              'If yes then provide the name field & Registration Number',
            type: fieldType.RADIOWITHINPUT,
            key: 'is_msme_registered',
            radioData: [
              {
                id: 1,
                label: 'Yes',
                value: 'Yes',
                handleChange: () => {},
                name: 'isMsmeRegistered'
              },
              {
                id: 1,
                label: 'No',
                value: 'No',
                handleChange: () => {},
                name: 'isMsmeRegistered'
              }
            ],
            dynamicCondition: 'Yes',
            dynamicField: [
              {
                name: 'MSME type If you select “Yes”',
                type: fieldType.FLOATING_INPUT,
                inputType: 'text',
                isRequired: true,
                handleChange: () => {},
                key: 'msme_type'
              },
              {
                name: 'Registration Number If you select “Yes”',
                type: fieldType.FLOATING_INPUT,
                inputType: 'text',
                isRequired: true,
                handleChange: () => {},
                key: 'msme_registration_number'
              }
            ]
          },
          {
            label: 'Ultimate Beneficiary Details',
            name: 'Name*',
            type: fieldType.FLOATING_INPUT_WITH_LABEL,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'ultimate_beneficiary_name'
          }
        ]
      },

      //Company Owner Details
      {
        screen: 'Company Owner Details',
        icon: HandIcon,
        screenName: 'company_owner_details',
        fields: [
          {
            name: 'Name',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'owner_full_name'
          },
          {
            name: 'Contact Number*',
            type: fieldType.PHONE_NUMBER,
            inputType: 'number',
            isRequired: true,
            handleChange: validatePhone,
            key: ['owner_country_code', 'owner_phone'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          },
          {
            name: 'Contact Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'email',
            isRequired: true,
            handleChange: validateEmail,
            key: 'owner_email'
          },
          {
            name: 'Pan-Card Number',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'owner_pan_number'
          }
        ]
      },

      //Banking Details
      {
        screen: 'Banking Details',
        screenName: 'banking_details',
        icon: HandIcon,
        fields: [
          {
            name: 'Bank Name*',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            key: 'bank_name'
          },
          {
            label: 'Banking Details',
            name: 'Account Holder Name*',
            type: fieldType.FLOATING_INPUT_WITH_LABEL,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'account_holder_name'
          },
          {
            name: 'Account Number*',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            key: 'account_number'
          },
          {
            name: 'IFSC Code*',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            key: 'ifsc_code'
          },
          {
            name: 'Bank Address',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            key: 'bank_address'
          }
        ]
      }
    ],
    offline: {
      download: 'link_to_kyc_form.pdf'
    },
    attachment: {
      companyDetail: [
        {
          id: '1',
          label: 'Pan Card',
          isRequired: true,
          key: 'pan',
          maxFile: 1,
          minFile: 1
        },
        {
          id: '2',
          label: 'GST Certificate',
          isRequired: true,
          key: 'gst_certificate',
          maxFile: 1,
          minFile: 1
        },
        {
          id: '3',
          label: 'Incorporation Certificate or ISE copy',
          isRequired: true,
          key: 'incorporation_Certificate_or_ISE_copy',
          maxFile: 1,
          minFile: 1
        },
        {
          id: ' 4',
          label: 'Cancel Cheque',
          isRequired: true,
          key: 'cancel_cheque',
          maxFile: 1,
          minFile: 1
        },
        {
          id: '6',
          label: 'Section 194Q',
          isRequired: true,
          key: 'section_194Q',
          maxFile: 1,
          minFile: 1
        },
        {
          id: '7',
          label: 'Government Registration Certificate',
          isRequired: true,
          key: 'government_registration_crtificate',
          maxFile: 1,
          minFile: 1
        },
        {
          id: '8',
          label: 'Business Card',
          isRequired: false,
          key: 'Business Card',
          maxFile: 1,
          minFile: 1
        }
      ],
      companyOwnerDetail: [
        {
          id: '1',
          label: 'Pan Card/Aadhar Card',
          isRequired: true,
          key: 'pan_card/aadhar_card',
          maxFile: 1,
          minFile: 1
        },
        {
          id: '2',
          label: 'Passport',
          isRequired: false,
          key: 'Passport',
          maxFile: 1,
          minFile: 1
        }
      ],
      PhotoIDofpersonsauthorisedtocollectgoods: [
        {
          id: '1',
          label: 'Photo ID 1',
          isRequired: true,
          key: 'photo_ID_1',
          maxFile: 1,
          minFile: 1
        },
        {
          id: '2',
          label: 'Photo ID 2',
          isRequired: true,
          key: 'photo_ID_2',
          maxFile: 1,
          minFile: 1
        },
        {
          id: '3',
          label: 'Photo ID 3',
          isRequired: true,
          key: 'photo_ID_3',
          maxFile: 1,
          minFile: 1
        }
      ]
    }
  },
  {
    country: {
      fullName: 'USA',
      shortName: 'usa'
    },
    online: [
      {
        screen: 'Personal Details',
        icon: HandIcon,
        screenName: 'personal_details',
        fields: [
          {
            name: 'First Name*',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            key: 'first_name'
          },
          {
            name: 'Last Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'last_name'
          },
          {
            name: 'Contact Number*',
            type: fieldType.PHONE_NUMBER,
            inputType: 'number',
            isRequired: true,
            handleChange: () => {},
            key: ['country_code', 'phone'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          }
        ]
      },

      //Company Details
      {
        screen: 'Company Details',
        icon: HandIcon,
        screenName: 'company_details',
        fields: [
          {
            name: 'Registered Company Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'company_name'
          },
          {
            name: 'Year of Establishment*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'year_of_establishment'
          },
          {
            name: 'Registered Address*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'address'
          },
          {
            name: 'Company Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: ['company_country_code', 'company_phone_number'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          },
          {
            name: 'Company Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'company_email'
          },
          {
            name: 'Business Type*',
            type: fieldType.CHECKBOX,
            key: 'business_type',
            checkboxData: [
              {
                name: 'Manufacturer',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: []
              },
              {
                name: 'Retailer',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: []
              },
              {
                name: 'Wholesaler',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: []
              },
              {
                name: 'Corporate Retailer',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: []
              },
              {
                name: 'Other',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: [],
                isInput: true,
                inputName: '',
                inputValue: '',
                handleInputChange: () => {},
                placeholder: 'If other please specify'
              }
            ]
          },
          {
            name: 'Type of Industry*',
            type: fieldType.CHECKBOX,
            key: 'industry_type',
            checkboxData: [
              {
                name: 'Diamonds',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: []
              },
              {
                name: 'Colour Stones',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: []
              },
              {
                name: 'Jewellery',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: []
              },
              {
                name: 'Other',
                handleChange: () => {},
                data: '',
                row: [],
                isChecked: [],
                isInput: true,
                inputName: '',
                inputValue: '',
                handleInputChange: () => {},
                placeholder: 'If other please specify'
              }
            ]
          },
          {
            name: 'Organisation Type*',
            type: fieldType.RADIO,
            key: 'organisation_type',
            radioData: [
              {
                id: 1,
                label: 'Individual',
                value: '',
                onChange: () => {},
                name: ''
              },
              {
                id: 2,
                label: 'Partnership Firm',
                value: '',
                onChange: () => {},
                name: ''
              },
              {
                id: 3,
                label: 'Private Ltd.',
                value: '',
                onChange: () => {},
                name: ''
              },
              {
                id: 4,
                label: 'LLP',
                value: '',
                onChange: () => {},
                name: ''
              },
              {
                id: 5,
                label: 'Public Ltd.',
                value: '',
                onChange: () => {},
                name: ''
              },
              {
                id: 6,
                label: 'OPC',
                value: '',
                onChange: () => {},
                name: ''
              },
              {
                id: 7,
                label: 'Other',
                value: '',
                onChange: () => {},
                name: '',
                isInput: true,
                inputName: '',
                inputValue: '',
                handleInputChange: '',
                placeholder: 'If other please specify',
                inputStyle: 'w-[150px]'
              }
            ]
          },
          {
            name: 'Business Registration Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'business_registration_number'
          },
          {
            name: 'VAT Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'vat_number'
          },
          {
            name: 'Federal Tax ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'federal_tax_id'
          },
          {
            name: 'Fax Number',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'fax_number'
          },
          {
            name: 'Subsidiary/Affiliated Company',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'subsidiary_company'
          },
          {
            name: 'Member of any Business Organisation / Council*',
            subTitle: 'If yes then provide the name',
            type: fieldType.RADIOWITHINPUT,
            key: 'is_member_of_business',
            radioData: [
              {
                id: 1,
                label: 'Yes',
                value: '',
                onChange: () => {},
                name: ''
              },
              {
                id: 1,
                label: 'No',
                value: '',
                onChange: () => {},
                name: ''
              }
            ],
            dynamicCondition: 'Yes',
            dynamicField: [
              {
                name: 'Name If you select “Yes”',
                type: fieldType.FLOATING_INPUT,
                inputType: 'text',
                isRequired: true,
                handleChange: () => {},
                key: 'member_of_business_name'
              }
            ]
          },
          {
            label: 'Ultimate Beneficiary Details',
            name: 'Name*',
            type: fieldType.FLOATING_INPUT_WITH_LABEL,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'ultimate_beneficiary_name'
          },
          {
            name: 'Ownership%',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'ownership_percentage'
          },
          {
            name: 'Have you instituted an Anti-Money laundering policy in your company?*',
            subTitle: 'If “No” please specify',
            type: fieldType.RADIOWITHINPUT,
            key: 'is_anti_money_laundering',
            radioData: [
              {
                id: 1,
                label: 'Yes',
                value: '',
                onChange: () => {},
                name: ''
              },
              {
                id: 1,
                label: 'No',
                value: '',
                onChange: () => {},
                name: ''
              }
            ],
            dynamicCondition: 'Yes',
            dynamicField: [
              {
                name: 'Specify here',
                type: fieldType.FLOATING_INPUT,
                inputType: 'text',
                isRequired: true,
                handleChange: () => {},
                key: 'anti_money_laundering_policy_name'
              }
            ]
          }
        ]
      },

      //Banking Details
      {
        screen: 'Banking Details',
        screenName: 'banking_details',
        fields: [
          {
            name: 'Bank Name*',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            key: 'bank_name'
          },
          {
            label: 'Banking Details',
            name: 'Account Holder Name*',
            type: fieldType.FLOATING_INPUT_WITH_LABEL,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'account_holder_name'
          },
          {
            name: 'Account Number/IBN Number*',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            key: 'account_number'
          },
          {
            name: 'Swift Code*',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            key: 'swift_code'
          }
        ]
      }
    ],
    offline: {
      download: 'link_to_kyc_form.pdf'
    },
    attachment: [
      {
        id: '1',
        label: 'FEIN No. / Tax No. / Business Registration Copy',
        isRequired: true,
        key: 'FEIN_No._/_tax_no._/_business_registration_copy',
        maxFile: 1,
        minFile: 1
      },
      {
        id: '2',
        label: 'Driving License/Passport',
        isRequired: true,
        key: 'driving_license_/_passport',
        maxFile: 1,
        minFile: 1
      },
      {
        id: '3',
        label: 'ID Copy / Residency Copy',
        isRequired: true,
        key: 'ID_copy_/_residency Copy',
        maxFile: 1,
        minFile: 1
      }
    ]
  },
  {
    country: {
      fullName: 'Other',
      shortName: 'other'
    },
    online: [
      {
        screen: 'Personal Details',
        fields: [
          {
            name: 'First Name',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            key: 'first_name'
          }
        ]
      }
    ],
    offline: {
      download: 'link_to_kyc_form.pdf'
    },
    attachment: [
      {
        id: '1',
        label: 'Certificate of Incumbency/Extract of Registry',
        isRequired: true,
        key: 'certificate_of_incumbency_/_extract_of_registry',
        maxFile: 1,
        minFile: 1
      },
      {
        id: '2',
        label: 'Business Registration/Trade license',
        isRequired: true,
        key: 'business_registration_/_trade_license',
        maxFile: 1,
        minFile: 1
      },
      {
        id: '3',
        label: 'TRN/VAT/GST Certificate',
        isRequired: true,
        key: 'TRN_/_VAT_/_GST_certificate',
        maxFile: 1,
        minFile: 1
      },
      {
        id: '4',
        label: 'MOA/AOA/Partnership Deed',
        isRequired: true,
        key: 'MOA_/AOA_/_partnership_deed',
        maxFile: 1,
        minFile: 1
      },
      {
        id: '5',
        label: 'Business Registration/Trade License',
        isRequired: true,
        key: 'business_registration_/_trade_license',
        maxFile: 1,
        minFile: 1
      },
      {
        id: '6',
        label: 'ID Copy/Passport of Ultimate Beneficial Owners',
        isRequired: true,
        key: 'ID_copy_/_passport_of_ultimate_beneficial_owners',
        maxFile: 1,
        minFile: 1
      },
      {
        id: '7',
        label: 'ID Copy/Passport of Authorised Signatory/Manager',
        isRequired: true,
        key: 'ID_copy_/_passport_of_authorised_signatory_/_manager',
        maxFile: 1,
        minFile: 1
      }
    ]
  }
];
