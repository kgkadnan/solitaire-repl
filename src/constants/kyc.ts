import { validateEmail, validateFirstName, validateLastName, validatePhone } from '@/app/my-account/kyc/helper/handle-validation';
import HandIcon from '@public/assets/icons/noto_backhand-index-pointing-up.svg';

export enum fieldType {
  FLOATING_INPUT = 'floatingInput',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  RADIOWITHINPUT = 'radioWithInput',
  ATTACHMENT = 'attachment',
  FLOATING_INPUT_WITH_LABEL = 'floatingInputWithLabel'
}

enum supportedMediaUnit {
  MB = 'MB',
  KB = 'KB'
}

enum supportedMediaFormat {
  JPEG = 'JPEG',
  PNG = 'PNG',
  JPG = 'JPG',
  PDF = 'PDF',
  DOC = 'DOC',
  DOCX = 'DOCX'
}

const FILE_SIZE_LIMIT = 100;
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
            type: fieldType.FLOATING_INPUT,
            inputType: 'number',
            isRequired: true,
            handleChange: () => {},
            key: 'phone'
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
            key: 'company_phone_number'
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
      kycForm: 'link_to_kyc_form.pdf'
    },
    attachment: {
      other: [
        {
          name: 'Pan',
          maxAttachment: 1,
          fileSizeLimit: FILE_SIZE_LIMIT,
          fileSizeUnit: supportedMediaUnit.MB,
          isRequired: true,
          supportedFormats: [
            supportedMediaFormat.PDF,
            supportedMediaFormat.JPEG
          ],
          handleChange: () => {}
        }
      ]
    }
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
            type: fieldType.FLOATING_INPUT,
            inputType: 'number',
            isRequired: true,
            handleChange: validatePhone,
            key: 'phone'
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
            inputType: 'text',
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
            key: 'company_phone_number'
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
            name: 'Registered under MSME Act',
            subTitle:
              'If yes then provide the name field & Registration Number',
            type: fieldType.RADIOWITHINPUT,
            key: 'is_msme_registered',
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
            name: 'First Name',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            key: 'first_name'
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
      kycForm: 'link_to_kyc_form.pdf',
      setUploadFilePreview: 'setUploadFilePreview',
      uploadFilePreview: 'uploadFilePreview',
      isFileUploaded: 'isFileUploaded',
      setIsFileUploaded: 'setIsFileUploaded',
      uploadProgress: 'uploadProgress',
      setUploadProgress: 'setUploadProgress'
    },
    attachment: {
      companyDetail: [
        {
          id: '1',
          label: 'Pan Card',
          isRequired: true,
          uploadProgress: 'uploadProgress',
          isFileUploaded: 'isPanFileUploaded',
          setUploadProgress: 'setUploadPanCardProgress',
          setIsFileUploaded: 'setIsPanFileUploaded',
          setSelectedFile: 'setPanSelectedFile',
          selectedFile: 'panSelectedFile',
          error: 'panError',
          setError: 'setPanError',
          maxFile: 1,
          minFile: 1
        },
        {
          id: '2',
          label: 'Pan Card 2',
          isRequired: true,
          uploadProgress: 'uploadProgress',
          isFileUploaded: 'isPanFileUploaded',
          setUploadProgress: 'setUploadPanCardProgress',
          setIsFileUploaded: 'setIsPanFileUploaded',
          setSelectedFile: 'setPanSelectedFile',
          selectedFile: 'panSelectedFile',
          error: 'panError',
          setError: 'setPanError',
          maxFile: 1,
          minFile: 1
        },
        {
          id: '3',
          label: 'Pan Card 3',
          isRequired: true,
          uploadProgress: 'uploadProgress',
          isFileUploaded: 'isPanFileUploaded',
          setUploadProgress: 'setUploadPanCardProgress',
          setIsFileUploaded: 'setIsPanFileUploaded',
          setSelectedFile: 'setPanSelectedFile',
          selectedFile: 'panSelectedFile',
          error: 'panError',
          setError: 'setPanError',
          maxFile: 1,
          minFile: 1
        },
        {
          id: '4',
          label: 'Pan Card 4',
          isRequired: true,
          uploadProgress: 'uploadProgress',
          isFileUploaded: 'isPanFileUploaded',
          setUploadProgress: 'setUploadPanCardProgress',
          setIsFileUploaded: 'setIsPanFileUploaded',
          setSelectedFile: 'setPanSelectedFile',
          selectedFile: 'panSelectedFile',
          error: 'panError',
          setError: 'setPanError',
          maxFile: 1,
          minFile: 1
        },
        {
          id: '5',
          label: 'Pan Card 5',
          isRequired: true,
          uploadProgress: 'uploadProgress',
          isFileUploaded: 'isPanFileUploaded',
          setUploadProgress: 'setUploadPanCardProgress',
          setIsFileUploaded: 'setIsPanFileUploaded',
          setSelectedFile: 'setPanSelectedFile',
          selectedFile: 'panSelectedFile',
          error: 'panError',
          setError: 'setPanError',
          maxFile: 1,
          minFile: 1
        },
        {
          id: '6',
          label: 'Pan Card 6',
          isRequired: true,
          uploadProgress: 'uploadProgress',
          isFileUploaded: 'isPanFileUploaded',
          setUploadProgress: 'setUploadPanCardProgress',
          setIsFileUploaded: 'setIsPanFileUploaded',
          setSelectedFile: 'setPanSelectedFile',
          selectedFile: 'panSelectedFile',
          error: 'panError',
          setError: 'setPanError',
          maxFile: 1,
          minFile: 1
        },
        {
          id: '7',
          label: 'Pan Card 7',
          isRequired: true,
          uploadProgress: 'uploadProgress',
          isFileUploaded: 'isPanFileUploaded',
          setUploadProgress: 'setUploadPanCardProgress',
          setIsFileUploaded: 'setIsPanFileUploaded',
          setSelectedFile: 'setPanSelectedFile',
          selectedFile: 'panSelectedFile',
          error: 'panError',
          setError: 'setPanError',
          maxFile: 1,
          minFile: 1
        }
      ],
      companyOwnerDetail: [
        {
          id: '1',
          label: 'Pan Card',
          isRequired: true,
          uploadProgress: 'uploadProgress',
          isFileUploaded: 'isPanFileUploaded',
          setUploadProgress: 'setUploadPanCardProgress',
          setIsFileUploaded: 'setIsPanFileUploaded',
          setSelectedFile: 'setPanSelectedFile',
          selectedFile: 'panSelectedFile',
          error: 'panError',
          setError: 'setPanError',
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
            type: fieldType.FLOATING_INPUT,
            inputType: 'number',
            isRequired: true,
            handleChange: () => {},
            key: 'phone'
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
            key: 'company_phone_number'
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
      kycForm: 'link_to_kyc_form.pdf'
    },
    attachment: {
      other: [
        {
          name: 'Pan',
          maxAttachment: 1,
          fileSizeLimit: FILE_SIZE_LIMIT,
          fileSizeUnit: supportedMediaUnit.MB,
          isRequired: true,
          supportedFormats: [
            supportedMediaFormat.PDF,
            supportedMediaFormat.JPEG
          ],
          handleChange: () => {},
          key: 'first_name'
        }
      ]
    }
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
      kycForm: 'link_to_kyc_form.pdf'
    },
    attachment: [
      {
        name: 'Pan',
        maxAttachment: 1,
        fileSizeLimit: FILE_SIZE_LIMIT,
        fileSizeUnit: supportedMediaUnit.MB,
        isRequired: true,
        supportedFormats: [supportedMediaFormat.PDF, supportedMediaFormat.JPEG],
        handleChange: () => {}
      }
    ]
  }
];
