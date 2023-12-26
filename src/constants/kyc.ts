export enum fieldType {
  FLOATING_INPUT = 'floatingInput',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  RADIOWITHINPUT = 'radioWithInput',
  ATTACHMENT = 'attachment'
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
  },
  {
    country: {
      fullName: 'Dubai',
      shortName: 'dubai'
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
  },
  {
    country: {
      fullName: 'Other',
      shortName: 'other'
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
