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
    digital: [
      {
        screen: 'Personal Details',
        fields: [
          {
            name: 'First Name',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            state: 'state',
            setState: 'setState',
            error: 'error',
            setError: 'setError',
            errorMessage: 'First Name is required'
          }
        ]
      },
      {
        screen: 'Company Details',
        icon: HandIcon,
        fields: [
          {
            name: 'Registered Company Name*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            state: 'state',
            setState: 'setState',
            error: 'error',
            setError: 'setError',
            errorMessage: ''
          },
          {
            name: 'Year of Establishment*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            state: 'state',
            setState: 'setState',
            error: 'error',
            setError: 'setError',
            errorMessage: ''
          },
          {
            name: 'City*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            state: 'state',
            setState: 'setState',
            error: 'error',
            setError: 'setError',
            errorMessage: ''
          },
          {
            name: 'State*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            state: 'state',
            setState: 'setState',
            error: 'error',
            setError: 'setError',
            errorMessage: ''
          },
          {
            name: 'Pin-Code*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            state: 'state',
            setState: 'setState',
            error: 'error',
            setError: 'setError',
            errorMessage: ''
          },
          {
            name: 'Company Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            state: 'state',
            setState: 'setState',
            error: 'error',
            setError: 'setError',
            errorMessage: ''
          },
          {
            name: 'Company Email-ID*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            state: 'state',
            setState: 'setState',
            error: 'error',
            setError: 'setError',
            errorMessage: ''
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
                placeholder: 'If other please specify'
              }
            ]
          },
          {
            name: 'Business Registration Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            state: 'state',
            setState: 'setState',
            error: 'error',
            setError: 'setError',
            errorMessage: ''
          },
          {
            name: 'Pan-Card Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            state: 'state',
            setState: 'setState',
            error: 'error',
            setError: 'setError',
            errorMessage: ''
          },
          {
            name: 'GST Number*',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            state: 'state',
            setState: 'setState',
            error: 'error',
            setError: 'setError',
            errorMessage: ''
          },
          {
            name: 'Subsidiary/Affiliated Company',
            type: fieldType.FLOATING_INPUT,
            inputType: 'text',
            isRequired: true,
            handleChange: () => {},
            state: 'state',
            setState: 'setState',
            error: 'error',
            setError: 'setError',
            errorMessage: ''
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
            state: 'state',
            setState: 'setState',
            error: 'error',
            setError: 'setError',
            errorMessage: ''
          }
        ]
      },
      {
        screen: 'Personal',
        fields: [
          {
            name: 'First Name',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            state: 'state',
            setState: 'setState',
            error: 'error',
            setError: 'setError',
            errorMessage: 'First Name is required'
          }
        ]
      }
    ],
    manual: {
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
        state: 'state',
        setState: 'setState',
        error: 'error',
        setError: 'setError',
        errorMessage: 'Pan is required'
      }
    ]
  },
  {
    country: {
      fullName: 'USA',
      shortName: 'usa'
    },
    digital: [
      {
        screen: 'Personal Details',
        fields: [
          {
            name: 'First Name',
            type: fieldType.FLOATING_INPUT,
            isRequired: true,
            handleChange: () => {},
            state: 'state',
            setState: 'setState',
            error: 'error',
            setError: 'setError',
            errorMessage: 'First Name is required'
          }
        ]
      }
    ],
    manual: {
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
        state: 'state',
        setState: 'setState',
        error: 'error',
        setError: 'setError',
        errorMessage: 'Pan is required'
      }
    ]
  }
];
