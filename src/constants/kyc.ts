import HandIcon from '@public/assets/icons/noto_backhand-index-pointing-up.svg';
import {
  fieldType,
  fileLimit,
  kycScreenIdentifierNames,
  supportedCountries
} from './enums/kyc';

export const KYCForm = [
  {
    country: {
      display: 'Belgium',
      backend: supportedCountries.BELGIUM
    },
    online: [
      {
        screen: 'Personal Details',
        icon: HandIcon,
        screenName: kycScreenIdentifierNames.PERSONAL_DETAILS,
        fields: [
          {
            name: 'First Name*',
            type: fieldType.FLOATING_INPUT,
            handleChange: () => {},
            formKey: 'first_name'
          },
          {
            name: 'Last Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'last_name'
          },
          {
            name: 'Contact Number*',
            type: fieldType.PHONE_NUMBER,
            inputType: 'number',
            handleChange: () => {},
            formKey: ['country_code', 'phone'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          },
          {
            name: 'Contact Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'email',
            formKey: 'email'
          }
        ]
      },

      //Company Details
      {
        screen: 'Company Details',
        icon: HandIcon,
        screenName: kycScreenIdentifierNames.COMPANY_DETAILS,
        fields: [
          {
            name: 'Registered Company Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'company_name'
          },
          {
            name: 'Year of Establishment*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'year_of_establishment'
          },
          {
            name: 'Registered Address*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'address'
          },
          {
            name: 'Company Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'phone',
            handleChange: () => {},
            formKey: ['company_country_code', 'company_phone_number'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          },
          {
            name: 'Company Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'company_email'
          },
          {
            name: 'Business Type*',
            type: fieldType.CHECKBOX,
            formKey: 'business_type',
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
            formKey: 'industry_type',
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
            formKey: 'organisation_type',
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
            handleChange: () => {},
            formKey: 'business_registration_number'
          },
          {
            name: 'VAT Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'vat_number'
          },
          {
            name: 'Fax Number',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'fax_number'
          },
          {
            name: 'Subsidiary/Affiliated Company',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'subsidiary_company'
          },
          {
            name: 'Member of any Business Organisation / Council*',
            subTitle: 'If yes then provide the name',
            type: fieldType.RADIO_WITH_INPUT,
            formKey: 'is_member_of_business',
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
                handleChange: () => {},
                formKey: 'member_of_business_name'
              }
            ]
          },
          {
            label: 'Ultimate Beneficiary Details',
            name: 'Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'ultimate_beneficiary_name'
          },
          {
            name: 'Ownership%',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'ownership_percentage'
          }
        ]
      },

      //Banking Details
      {
        screen: 'Banking Details',
        screenName: kycScreenIdentifierNames.BANKING_DETAILS,
        fields: [
          {
            name: 'Bank Name*',
            type: fieldType.FLOATING_INPUT,
            handleChange: () => {},
            formKey: 'bank_name'
          },
          {
            label: 'Banking Details',
            name: 'Account Holder Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'account_holder_name'
          },
          {
            name: 'Account Number/IBN Number*',
            type: fieldType.FLOATING_INPUT,
            handleChange: () => {},
            formKey: 'account_number'
          },
          {
            name: 'Swift Code*',
            type: fieldType.FLOATING_INPUT,
            handleChange: () => {},
            formKey: 'swift_code'
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
        formKey: 'FEIN_No._/_tax_no._/_business_registration_copy',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '2',
        label: 'Driving License/Passport',
        isRequired: true,
        formKey: 'driving_license_/_passport',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '3',
        label: 'ID Copy / Residency Copy',
        isRequired: true,
        formKey: 'ID_copy_/_residency_copy',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      }
    ]
  },
  {
    country: {
      display: 'India',
      backend: supportedCountries.INDIA
    },
    online: [
      {
        screen: 'Personal Details',
        icon: HandIcon,
        screenName: kycScreenIdentifierNames.PERSONAL_DETAILS,
        fields: [
          {
            name: 'First Name*',
            type: fieldType.FLOATING_INPUT,
            formKey: 'first_name'
          },
          {
            name: 'Last Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'last_name'
          },
          {
            name: 'Contact Number*',
            type: fieldType.PHONE_NUMBER,
            inputType: 'number',
            formKey: ['country_code', 'phone'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          },
          {
            name: 'Contact Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'email',
            formKey: 'email'
          }
        ]
      },

      //Company Details
      {
        screen: 'Company Details',
        icon: HandIcon,
        screenName: kycScreenIdentifierNames.COMPANY_DETAILS,
        fields: [
          {
            name: 'Registered Company Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'company_name'
          },
          {
            name: 'Year of Establishment*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'year_of_establishment'
          },
          {
            name: 'Registered Address*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'address'
          },
          {
            name: 'City*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'city'
          },
          {
            name: 'State*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'state'
          },
          {
            name: 'Pin-Code*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'number',
            handleChange: () => {},
            formKey: 'pincode'
          },
          {
            name: 'Company Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: ['company_country_code', 'company_phone_number'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          },
          {
            name: 'Company Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'company_email'
          },
          {
            name: 'Business Type*',
            type: fieldType.CHECKBOX,
            formKey: 'business_type',
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
            formKey: 'industry_type',
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
            formKey: 'organisation_type',
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
            handleChange: () => {},
            formKey: 'business_registration_number'
          },
          {
            name: 'Pan-Card Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'company_pan_number'
          },
          {
            name: 'GST Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'gst_number'
          },
          {
            name: 'Subsidiary/Affiliated Company',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'subsidiary_company'
          },
          {
            name: 'Member of any Business Organisation / Council*',
            subTitle: 'If yes then provide the name',
            type: fieldType.RADIO_WITH_INPUT,
            formKey: 'is_member_of_business',
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
                handleChange: () => {},
                formKey: 'member_of_business_name'
              }
            ]
          },
          {
            name: 'Registered under MSME Act',
            subTitle:
              'If yes then provide the name field & Registration Number',
            type: fieldType.RADIO_WITH_INPUT,
            formKey: 'is_msme_registered',
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
                handleChange: () => {},
                formKey: 'msme_type'
              },
              {
                name: 'Registration Number If you select “Yes”',
                type: fieldType.FLOATING_INPUT,
                inputType: 'text',
                handleChange: () => {},
                formKey: 'msme_registration_number'
              }
            ]
          },
          {
            label: 'Ultimate Beneficiary Details',
            name: 'Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'ultimate_beneficiary_name'
          }
        ]
      },

      //Company Owner Details
      {
        screen: 'Company Owner Details',
        icon: HandIcon,
        screenName: kycScreenIdentifierNames.COMPANY_OWNER_DETAILS,
        fields: [
          {
            name: 'Name',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'owner_full_name'
          },
          {
            name: 'Contact Number*',
            type: fieldType.PHONE_NUMBER,
            inputType: 'number',
            isRequired: true,
            handleChange: () => {},
            formKey: ['owner_country_code', 'owner_phone'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          },
          {
            name: 'Contact Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'email',
            isRequired: true,
            handleChange: () => {},
            formKey: 'owner_email'
          },
          {
            name: 'Pan-Card Number',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            formKey: 'owner_pan_number'
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
            handleChange: () => {},
            formKey: 'bank_name'
          },
          {
            label: 'Banking Details',
            name: 'Account Holder Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'account_holder_name'
          },
          {
            name: 'Account Number*',
            type: fieldType.FLOATING_INPUT,
            handleChange: () => {},
            formKey: 'account_number'
          },
          {
            name: 'IFSC Code*',
            type: fieldType.FLOATING_INPUT,
            handleChange: () => {},
            formKey: 'ifsc_code'
          },
          {
            name: 'Bank Address',
            type: fieldType.FLOATING_INPUT,
            handleChange: () => {},
            formKey: 'bank_address'
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
          formKey: 'pan',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES
        },
        {
          id: '2',
          label: 'GST Certificate',
          isRequired: true,
          formKey: 'gst_certificate',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES
        },
        {
          id: '3',
          label: 'Incorporation Certificate or ISE copy',
          isRequired: true,
          formKey: 'incorporation_Certificate_or_ISE_copy',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES
        },
        {
          id: ' 4',
          label: 'Cancel Cheque',
          isRequired: true,
          formKey: 'cancel_cheque',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES
        },
        {
          id: '6',
          label: 'Section 194Q',
          isRequired: true,
          formKey: 'section_194Q',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES
        },
        {
          id: '7',
          label: 'Government Registration Certificate',
          isRequired: true,
          formKey: 'government_registration_crtificate',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES
        },
        {
          id: '8',
          label: 'Business Card',
          isRequired: false,
          formKey: 'Business Card',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES
        }
      ],
      companyOwnerDetail: [
        {
          id: '1',
          label: 'Pan Card/Aadhar Card',
          isRequired: true,
          formKey: 'pan_card/aadhar_card',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES
        },
        {
          id: '2',
          label: 'Passport',
          isRequired: false,
          formKey: 'Passport',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES
        }
      ],
      PhotoIDofpersonsauthorisedtocollectgoods: [
        {
          id: '1',
          label: 'Photo ID 1',
          isRequired: true,
          formKey: 'photo_ID_1',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES
        },
        {
          id: '2',
          label: 'Photo ID 2',
          isRequired: true,
          formKey: 'photo_ID_2',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES
        },
        {
          id: '3',
          label: 'Photo ID 3',
          isRequired: true,
          formKey: 'photo_ID_3',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES
        }
      ]
    }
  },
  {
    country: {
      display: 'USA',
      backend: supportedCountries.USA
    },
    online: [
      {
        screen: 'Personal Details',
        icon: HandIcon,
        screenName: kycScreenIdentifierNames.PERSONAL_DETAILS,
        fields: [
          {
            name: 'First Name*',
            type: fieldType.FLOATING_INPUT,
            handleChange: () => {},
            formKey: 'first_name'
          },
          {
            name: 'Last Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'last_name'
          },
          {
            name: 'Contact Number*',
            type: fieldType.PHONE_NUMBER,
            inputType: 'number',
            handleChange: () => {},
            formKey: ['country_code', 'phone'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          }
        ]
      },

      //Company Details
      {
        screen: 'Company Details',
        icon: HandIcon,
        screenName: kycScreenIdentifierNames.COMPANY_DETAILS,
        fields: [
          {
            name: 'Registered Company Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'company_name'
          },
          {
            name: 'Year of Establishment*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'year_of_establishment'
          },
          {
            name: 'Registered Address*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'address'
          },
          {
            name: 'Company Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: ['company_country_code', 'company_phone_number'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          },
          {
            name: 'Company Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'company_email'
          },
          {
            name: 'Business Type*',
            type: fieldType.CHECKBOX,
            formKey: 'business_type',
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
            formKey: 'industry_type',
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
            formKey: 'organisation_type',
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
            handleChange: () => {},
            formKey: 'business_registration_number'
          },
          {
            name: 'VAT Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'vat_number'
          },
          {
            name: 'Federal Tax ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'federal_tax_id'
          },
          {
            name: 'Fax Number',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'fax_number'
          },
          {
            name: 'Subsidiary/Affiliated Company',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'subsidiary_company'
          },
          {
            name: 'Member of any Business Organisation / Council*',
            subTitle: 'If yes then provide the name',
            type: fieldType.RADIO_WITH_INPUT,
            formKey: 'is_member_of_business',
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
                handleChange: () => {},
                formKey: 'member_of_business_name'
              }
            ]
          },
          {
            label: 'Ultimate Beneficiary Details',
            name: 'Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'ultimate_beneficiary_name'
          },
          {
            name: 'Ownership%',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'ownership_percentage'
          },
          {
            name: 'Have you instituted an Anti-Money laundering policy in your company?*',
            subTitle: 'If “No” please specify',
            type: fieldType.RADIO_WITH_INPUT,
            formKey: 'is_anti_money_laundering',
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
                handleChange: () => {},
                formKey: 'anti_money_laundering_policy_name'
              }
            ]
          }
        ]
      },

      //Banking Details
      {
        screen: 'Banking Details',
        screenName: kycScreenIdentifierNames.BANKING_DETAILS,
        fields: [
          {
            name: 'Bank Name*',
            type: fieldType.FLOATING_INPUT,
            handleChange: () => {},
            formKey: 'bank_name'
          },
          {
            label: 'Banking Details',
            name: 'Account Holder Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            handleChange: () => {},
            formKey: 'account_holder_name'
          },
          {
            name: 'Account Number/IBN Number*',
            type: fieldType.FLOATING_INPUT,
            handleChange: () => {},
            formKey: 'account_number'
          },
          {
            name: 'Swift Code*',
            type: fieldType.FLOATING_INPUT,
            handleChange: () => {},
            formKey: 'swift_code'
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
        formKey: 'FEIN_No._/_tax_no._/_business_registration_copy',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '2',
        label: 'Driving License/Passport',
        isRequired: true,
        formKey: 'driving_license_/_passport',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '3',
        label: 'ID Copy / Residency Copy',
        isRequired: true,
        formKey: 'ID_copy_/_residency Copy',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      }
    ]
  },
  {
    country: {
      display: 'Other',
      backend: supportedCountries.OTHER
    },

    offline: {
      download: 'link_to_kyc_form.pdf'
    },
    attachment: [
      {
        id: '1',
        label: 'Certificate of Incumbency/Extract of Registry',
        isRequired: true,
        formKey: 'certificate_of_incumbency_/_extract_of_registry',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '2',
        label: 'Business Registration/Trade license',
        isRequired: true,
        formKey: 'business_registration_/_trade_license',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '3',
        label: 'TRN/VAT/GST Certificate',
        isRequired: true,
        formKey: 'TRN_/_VAT_/_GST_certificate',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '4',
        label: 'MOA/AOA/Partnership Deed',
        isRequired: true,
        formKey: 'MOA_/AOA_/_partnership_deed',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '5',
        label: 'Business Registration/Trade License',
        isRequired: true,
        formKey: 'business_registration_/_trade_license',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '6',
        label: 'ID Copy/Passport of Ultimate Beneficial Owners',
        isRequired: true,
        formKey: 'ID_copy_/_passport_of_ultimate_beneficial_owners',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '7',
        label: 'ID Copy/Passport of Authorised Signatory/Manager',
        isRequired: true,
        formKey: 'ID_copy_/_passport_of_authorised_signatory_/_manager',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      }
    ]
  }
];
