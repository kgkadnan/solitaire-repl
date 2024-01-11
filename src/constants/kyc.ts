import HandIcon from '@public/assets/icons/noto_backhand-index-pointing-up.svg';
import {
  fieldType,
  fileLimit,
  kycScreenIdentifierNames,
  supportedCountries
} from './enums/kyc';

export const KYCForm = [
  //Belgium
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
            formKey: ['country_code', 'phone'], //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
            isEditable: false
          },
          {
            name: 'Contact Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'email',
            formKey: 'email',
            isEditable: false
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
            formKey: 'company_name'
          },
          {
            name: 'Year of Establishment*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'year_of_establishment'
          },
          {
            name: 'Registered Address*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'address_line_1'
          },
          {
            name: '',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'address_line_2'
          },
          {
            name: 'Company Number*',
            type: fieldType.PHONE_NUMBER,
            inputType: 'phone',
            formKey: ['company_country_code', 'company_phone_number'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          },
          {
            name: 'Company Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'company_email'
          },
          {
            name: 'Business Type*',
            type: fieldType.CHECKBOX,
            formKey: 'business_type',
            checkboxData: [
              {
                name: 'Manufacturer',
                data: 'Manufacturer',
                row: [],
                isChecked: []
              },
              {
                name: 'Retailer',
                data: 'Retailer',
                row: [],
                isChecked: []
              },
              {
                name: 'Wholesaler',
                data: 'Wholesaler',
                row: [],
                isChecked: []
              },
              {
                name: 'Corporate Retailer',
                data: 'Corporate Retailer',
                row: [],
                isChecked: []
              },
              {
                name: 'Other',
                data: 'Other',
                row: [],
                isChecked: [],
                isInput: true,
                inputName: '',
                inputValue: '',
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
                data: 'Diamonds',
                row: [],
                isChecked: []
              },
              {
                name: 'Colour Stones',
                data: 'Colour Stones',
                row: [],
                isChecked: []
              },
              {
                name: 'Jewellery',
                data: 'Jewellery',
                row: [],
                isChecked: []
              },
              {
                name: 'Other',
                data: 'Other',
                row: [],
                isChecked: [],
                isInput: true,
                inputName: '',
                inputValue: '',
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
                name: 'organisationType'
              },
              {
                id: 2,
                label: 'Partnership Firm',
                value: 'Partnership Firm',
                name: 'organisationType'
              },
              {
                id: 3,
                label: 'Private Ltd.',
                value: 'Private Ltd.',
                name: 'organisationType'
              },
              {
                id: 4,
                label: 'LLP',
                value: 'LLP',
                name: 'organisationType'
              },
              {
                id: 5,
                label: 'Public Ltd.',
                value: 'Public Ltd.',
                name: 'organisationType'
              },
              {
                id: 6,
                label: 'OPC',
                value: 'OPC',
                name: 'organisationType'
              },
              {
                id: 7,
                label: 'Other',
                name: 'organisationType',
                value: 'organisationType_Other',
                isInput: true,
                inputName: 'Other',
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
            formKey: 'business_registration_number'
          },
          {
            name: 'VAT Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'vat_number'
          },
          {
            name: 'Fax Number',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'fax_number'
          },
          {
            name: 'Subsidiary/Affiliated Company',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'subsidiary_company'
          },
          {
            name: 'Member of any Business Organisation / Council*',
            subTitle: 'If yes then provide the name',
            type: fieldType.RADIO,
            formKey: 'is_member_of_business',
            radioData: [
              {
                id: 1,
                label: 'Yes',
                value: true,
                name: 'isMemberOfBusiness'
              },
              {
                id: 1,
                label: 'No',
                value: false,
                name: 'isMemberOfBusiness'
              }
            ],
            dynamicCondition: true,
            dynamicField: [
              {
                name: 'Name If you select “Yes”',
                type: fieldType.FLOATING_INPUT,
                inputType: 'text',
                formKey: 'member_of_business_name'
              }
            ]
          },
          {
            label: 'Ultimate Beneficiary Details',
            name: 'Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'ultimate_beneficiary_name'
          },
          {
            name: 'Ownership%',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'ownership_percentage'
          }
        ]
      },

      //Banking Details
      {
        screen: 'Banking Details',
        screenName: kycScreenIdentifierNames.BANKING_DETAILS,
        icon: HandIcon,
        fields: [
          {
            name: 'Bank Name*',
            type: fieldType.FLOATING_INPUT,
            formKey: 'bank_name'
          },
          {
            label: 'Banking Details',
            name: 'Account Holder Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'account_holder_name'
          },
          {
            name: 'Account Number/IBN Number*',
            type: fieldType.FLOATING_INPUT,
            formKey: 'account_number'
          },
          {
            name: 'Swift Code*',
            type: fieldType.FLOATING_INPUT,
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
        formKey: 'registration_number',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '2',
        label: 'Driving License/Passport',
        isRequired: true,
        formKey: 'passport',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '3',
        label: 'ID Copy / Residency Copy',
        isRequired: true,
        formKey: 'id_copy',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      }
    ]
  },

  // India
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
            formKey: ['country_code', 'phone'], //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
            isEditable: false
          },
          {
            name: 'Contact Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'email',
            formKey: 'email',
            isEditable: false
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
            formKey: 'company_name'
          },
          {
            name: 'Year of Establishment*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'year_of_establishment'
          },
          {
            name: 'Registered Address*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'address'
          },
          {
            name: 'City*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'city'
          },
          {
            name: 'State*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'state'
          },
          {
            name: 'Pin-Code*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'number',
            formKey: 'pincode'
          },
          {
            name: 'Company Number*',
            type: fieldType.PHONE_NUMBER,
            inputType: 'number',
            formKey: ['company_country_code', 'company_phone_number'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          },
          {
            name: 'Company Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'company_email'
          },
          {
            name: 'Business Type*',
            type: fieldType.CHECKBOX,
            formKey: 'business_type',
            checkboxData: [
              {
                name: 'Manufacturer',
                data: 'Manufacturer',
                row: [],
                isChecked: []
              },
              {
                name: 'Retailer',
                data: 'Retailer',
                row: [],
                isChecked: []
              },
              {
                name: 'Wholesaler',
                data: 'Wholesaler',
                row: [],
                isChecked: []
              },
              {
                name: 'Corporate Retailer',
                data: 'Corporate Retailer',
                row: [],
                isChecked: []
              },
              {
                name: 'Other',
                data: 'Other',
                row: [],
                isChecked: [],
                isInput: true,
                inputName: '',
                inputValue: '',
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
                data: 'Diamonds',
                row: [],
                isChecked: []
              },
              {
                name: 'Colour Stones',
                data: 'Colour Stones',
                row: [],
                isChecked: []
              },
              {
                name: 'Jewellery',
                data: 'Jewellery',
                row: [],
                isChecked: []
              },
              {
                name: 'Other',
                data: 'Other',
                row: [],
                isChecked: [],
                isInput: true,
                inputName: '',
                inputValue: '',
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
                name: 'organisationType'
              },
              {
                id: 2,
                label: 'Partnership Firm',
                value: 'Partnership Firm',
                name: 'organisationType'
              },
              {
                id: 3,
                label: 'Private Ltd.',
                value: 'Private Ltd.',
                name: 'organisationType'
              },
              {
                id: 4,
                label: 'LLP',
                value: 'LLP',
                name: 'organisationType'
              },
              {
                id: 5,
                label: 'Public Ltd.',
                value: 'Public Ltd.',
                name: 'organisationType'
              },
              {
                id: 6,
                label: 'OPC',
                value: 'OPC',
                name: 'organisationType'
              },
              {
                id: 7,
                label: 'Other',
                name: 'organisationType',
                value: 'organisationType_Other',
                isInput: true,
                inputName: 'Other',
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
            formKey: 'business_registration_number'
          },
          {
            name: 'Pan-Card Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'company_pan_number'
          },
          {
            name: 'GST Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'gst_number'
          },
          {
            name: 'Subsidiary/Affiliated Company',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'subsidiary_company'
          },
          {
            name: 'Member of any Business Organisation / Council*',
            subTitle: 'If yes then provide the name',
            type: fieldType.RADIO,
            formKey: 'is_member_of_business',
            radioData: [
              {
                id: 1,
                label: 'Yes',
                value: true,
                name: 'isMemberOfBusiness'
              },
              {
                id: 1,
                label: 'No',
                value: false,
                name: 'isMemberOfBusiness'
              }
            ],
            dynamicCondition: true,
            dynamicField: [
              {
                name: 'Name If you select “Yes”',
                type: fieldType.FLOATING_INPUT,
                inputType: 'text',
                formKey: 'member_of_business_name'
              }
            ]
          },
          {
            name: 'Registered under MSME Act',
            subTitle:
              'If yes then provide the name field & Registration Number',
            type: fieldType.RADIO,
            formKey: 'is_msme_registered',
            radioData: [
              {
                id: 1,
                label: 'Yes',
                value: true,
                name: 'isMsmeRegistered'
              },
              {
                id: 1,
                label: 'No',
                value: false,
                name: 'isMsmeRegistered'
              }
            ],
            dynamicCondition: true,
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
            formKey: 'owner_full_name'
          },
          {
            name: 'Contact Number*',
            type: fieldType.PHONE_NUMBER,
            inputType: 'number',
            isRequired: true,
            formKey: ['owner_country_code', 'owner_phone'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          },
          {
            name: 'Contact Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'email',
            isRequired: true,
            formKey: 'owner_email'
          },
          {
            name: 'Pan-Card Number',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
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
            formKey: 'bank_name'
          },
          {
            label: 'Banking Details',
            name: 'Account Holder Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'account_holder_name'
          },
          {
            name: 'Account Number*',
            type: fieldType.FLOATING_INPUT,
            formKey: 'account_number'
          },
          {
            name: 'IFSC Code*',
            type: fieldType.FLOATING_INPUT,
            formKey: 'ifsc_code'
          },
          {
            name: 'Bank Address',
            type: fieldType.FLOATING_INPUT,
            formKey: 'bank_address'
          }
        ]
      }
    ],
    offline: {
      download: 'link_to_kyc_form.pdf'
    },
    attachment: [
      {
        key: 'Company Detail',
        value: [
          {
            id: '1',
            label: 'Pan Card',
            isRequired: true,
            formKey: 'pan_card',
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
            formKey: 'incorporation_certificate',
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
            formKey: 'section_194q',
            maxFile: fileLimit.MAX_FILES,
            minFile: fileLimit.MIN_FILES
          },
          {
            id: '7',
            label: 'Government Registration Certificate',
            isRequired: true,
            formKey: 'government_registration_certificate',
            maxFile: fileLimit.MAX_FILES,
            minFile: fileLimit.MIN_FILES
          },
          {
            id: '8',
            label: 'Business Card',
            isRequired: false,
            formKey: 'business_card',
            maxFile: fileLimit.MAX_FILES,
            minFile: fileLimit.MIN_FILES
          }
        ]
      },
      {
        key: 'Company Owner Detail',
        value: [
          {
            id: '1',
            label: 'Pan Card/Aadhar Card',
            isRequired: true,
            formKey: 'company_owner_pan_card',
            maxFile: fileLimit.MAX_FILES,
            minFile: fileLimit.MIN_FILES
          },
          {
            id: '2',
            label: 'Passport',
            isRequired: false,
            formKey: 'company_owner_passport',
            maxFile: fileLimit.MAX_FILES,
            minFile: fileLimit.MIN_FILES
          }
        ]
      },
      {
        key: 'PhotoID of persons authorised to collect goods',
        value: [
          {
            id: '1',
            label: 'Photo ID 1',
            isRequired: false,
            formKey: 'person_to_contact_1',
            maxFile: fileLimit.MAX_FILES,
            minFile: fileLimit.MIN_FILES
          },
          {
            id: '2',
            label: 'Photo ID 2',
            isRequired: false,
            formKey: 'person_to_contact_2',
            maxFile: fileLimit.MAX_FILES,
            minFile: fileLimit.MIN_FILES
          },
          {
            id: '3',
            label: 'Photo ID 3',
            isRequired: false,
            formKey: 'person_to_contact_3',
            maxFile: fileLimit.MAX_FILES,
            minFile: fileLimit.MIN_FILES
          }
        ]
      }
    ]
  },

  // USA
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
            formKey: ['country_code', 'phone'], //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
            isEditable: false
          },
          {
            name: 'Contact Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'email',
            formKey: 'email',
            isEditable: false
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
            formKey: 'company_name'
          },
          {
            name: 'Year of Establishment*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'year_of_establishment'
          },
          {
            name: 'Registered Address*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'address_line_1'
          },
          {
            name: '',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'address_line_2'
          },
          {
            name: 'Company Number*',
            type: fieldType.PHONE_NUMBER,
            inputType: 'number',
            formKey: ['company_country_code', 'company_phone_number'] //The 'key' array for the phone should follow this structure: 'country_code' at index 0 to represent the country code and 'phone' at index 1 for the phone number.
          },
          {
            name: 'Company Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'company_email'
          },
          {
            name: 'Business Type*',
            type: fieldType.CHECKBOX,
            formKey: 'business_type',
            checkboxData: [
              {
                name: 'Manufacturer',
                data: 'Manufacturer',
                row: [],
                isChecked: []
              },
              {
                name: 'Retailer',
                data: 'Retailer',
                row: [],
                isChecked: []
              },
              {
                name: 'Wholesaler',
                data: 'Wholesaler',
                row: [],
                isChecked: []
              },
              {
                name: 'Corporate Retailer',
                data: 'Corporate Retailer',
                row: [],
                isChecked: []
              },
              {
                name: 'Other',
                data: 'Other',
                row: [],
                isChecked: [],
                isInput: true,
                inputName: '',
                inputValue: '',
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
                data: 'Diamonds',
                row: [],
                isChecked: []
              },
              {
                name: 'Colour Stones',
                data: 'Colour Stones',
                row: [],
                isChecked: []
              },
              {
                name: 'Jewellery',
                data: 'Jewellery',
                row: [],
                isChecked: []
              },
              {
                name: 'Other',
                data: 'Other',
                row: [],
                isChecked: [],
                isInput: true,
                inputName: '',
                inputValue: '',
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
                name: 'organisationType'
              },
              {
                id: 2,
                label: 'Partnership Firm',
                value: 'Partnership Firm',
                name: 'organisationType'
              },
              {
                id: 3,
                label: 'Private Ltd.',
                value: 'Private Ltd.',
                name: 'organisationType'
              },
              {
                id: 4,
                label: 'LLP',
                value: 'LLP',
                name: 'organisationType'
              },
              {
                id: 5,
                label: 'Public Ltd.',
                value: 'Public Ltd.',
                name: 'organisationType'
              },
              {
                id: 6,
                label: 'OPC',
                value: 'OPC',
                name: 'organisationType'
              },
              {
                id: 7,
                label: 'Other',
                name: 'organisationType',
                value: 'organisationType_Other',
                isInput: true,
                inputName: 'Other',
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
            formKey: 'business_registration_number'
          },
          {
            name: 'VAT Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'vat_number'
          },
          {
            name: 'Federal Tax ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'federal_tax_id'
          },
          {
            name: 'Fax Number',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'fax_number'
          },
          {
            name: 'Subsidiary/Affiliated Company',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'subsidiary_company'
          },

          {
            name: 'Member of any Business Organisation / Council*',
            subTitle: 'If yes then provide the name',
            type: fieldType.RADIO,
            formKey: 'is_member_of_business',
            radioData: [
              {
                id: 1,
                label: 'Yes',
                value: true,
                name: 'isMemberOfBusiness'
              },
              {
                id: 1,
                label: 'No',
                value: false,
                name: 'isMemberOfBusiness'
              }
            ],
            dynamicCondition: true,
            dynamicField: [
              {
                name: 'Name If you select “Yes”',
                type: fieldType.FLOATING_INPUT,
                inputType: 'text',
                formKey: 'member_of_business_name'
              }
            ]
          },
          {
            label: 'Ultimate Beneficiary Details',
            name: 'Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'ultimate_beneficiary_name'
          },
          {
            name: 'Ownership%',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'ownership_percentage'
          },
          {
            name: 'Have you instituted an Anti-Money laundering policy in your company?*',
            subTitle: 'If “No”, please specify why',
            type: fieldType.RADIO,
            formKey: 'is_anti_money_laundering',
            radioData: [
              {
                id: 1,
                label: 'Yes',
                value: true,
                name: 'antiMoneyLaunderingPolicyName'
              },
              {
                id: 1,
                label: 'No',
                value: false,
                name: 'antiMoneyLaunderingPolicyName'
              }
            ],
            dynamicCondition: false,
            dynamicField: [
              {
                name: 'Specify here',
                type: fieldType.FLOATING_INPUT,
                inputType: 'text',
                formKey: 'no_anti_money_laundering_policy_reason'
              }
            ]
          }
        ]
      },

      //Banking Details
      {
        screen: 'Banking Details',
        icon: HandIcon,
        screenName: kycScreenIdentifierNames.BANKING_DETAILS,
        fields: [
          {
            name: 'Bank Name*',
            type: fieldType.FLOATING_INPUT,
            formKey: 'bank_name'
          },
          {
            label: 'Banking Details',
            name: 'Account Holder Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            formKey: 'account_holder_name'
          },
          {
            name: 'Account Number/IBN Number*',
            type: fieldType.FLOATING_INPUT,
            formKey: 'account_number'
          },
          {
            name: 'Swift Code*',
            type: fieldType.FLOATING_INPUT,
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
        formKey: 'registration_number',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '2',
        label: 'Driving License/Passport',
        isRequired: true,
        formKey: 'passport',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '3',
        label: 'ID Copy / Residency Copy',
        isRequired: true,
        formKey: 'id_copy',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      }
    ]
  },

  //Other
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
        formKey: 'incumbency_certificate',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '2',
        label: 'Business Registration/Trade license',
        isRequired: true,
        formKey: 'trade_license',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '3',
        label: 'TRN/VAT/GST Certificate',
        isRequired: true,
        formKey: 'gst_certificate',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '4',
        label: 'MOA/AOA/Partnership Deed',
        isRequired: true,
        formKey: 'moa',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '5',
        label: 'ID Copy/Passport of Ultimate Beneficial Owners',
        isRequired: true,
        formKey: 'owner_id_copy',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      },
      {
        id: '6',
        label: 'ID Copy/Passport of Authorised Signatory/Manager',
        isRequired: true,
        formKey: 'manager_id_copy',
        maxFile: fileLimit.MAX_FILES,
        minFile: fileLimit.MIN_FILES
      }
    ]
  }
];
