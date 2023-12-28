import HandIcon from '@public/assets/icons/noto_backhand-index-pointing-up.svg';

export enum fieldType {
  FLOATING_INPUT = 'floatingInput',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  RADIOWITHINPUT = 'radioWithInput',
  ATTACHMENT = 'attachment',
  FLOATING_INPUT_WITH_LABEL = 'attachment'
}

enum supportedMediaUnit {
  MB = 'MB',
  KB = 'KB'
}

enum supportedMediaFormat {
  JPEG = 'JPEG',
  PNG = 'PNG',
  JPG = 'JPG',
  'PDF' = 'PDF',
  'DOC' = 'DOC',
  DOCX = 'DOCX'
}

const FILE_SIZE_LIMIT = 100;
export const KYCForm = [
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
            key: 'phone_number'
          }
        ]
      },

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
            key: 'first_name1'
          },
          {
            name: 'Year of Establishment*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'first_name'
          },
          {
            name: 'City*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'first_name'
          },
          {
            name: 'State*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'first_name'
          },
          {
            name: 'Pin-Code*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'first_name'
          },
          {
            name: 'Company Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'first_name'
          },
          {
            name: 'Company Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'first_name'
          },
          {
            name: 'Business Type*',
            type: fieldType.CHECKBOX,
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
            key: 'first_name'
          },
          {
            name: 'Pan-Card Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'first_name'
          },
          {
            name: 'GST Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'first_name'
          },
          {
            name: 'Subsidiary/Affiliated Company',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'first_name'
          },
          {
            name: 'Member of any Business Organisation / Council*',
            subTitle: 'If yes then provide the name',
            type: fieldType.RADIOWITHINPUT,
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
                name: 'Last Name*',
                type: fieldType.FLOATING_INPUT,
                inputType: 'text',
                isRequired: true,
                handleChange: () => {},
                key: 'first_name'
              }
            ]
          },
          {
            name: 'Registered under MSME Act',
            subTitle:
              'If yes then provide the name field & Registration Number',
            type: fieldType.RADIOWITHINPUT,
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
            ]
          },
          {
            label: 'Ultimate Beneficiary Details',
            name: 'Name*',
            type: fieldType.FLOATING_INPUT_WITH_LABEL,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            key: 'first_name'
          }
        ]
      },

      {
        screen: 'Company Owner Details',
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
      {
        screen: 'banking Details',
        screenName: 'banking_details',
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
        handleChange: () => {},
        key: 'first_name'
      }
    ]
  },
  {
    country: {
      fullName: 'Dubai',
      shortName: 'dubai'
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
