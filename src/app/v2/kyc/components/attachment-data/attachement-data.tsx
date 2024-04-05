import { fileLimit } from '@/constants/enums/kyc';

export let AttachmentData: any = {
  India: [
    {
      key: 'Company Detail',
      value: [
        {
          id: '1',
          label: 'Pan Card*',
          isRequired: true,
          formKey: 'pan_card',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES,
          fileSize: 20 * 1024 * 1024
        },
        {
          id: '2',
          label: 'GST Certificate*',
          isRequired: true,
          formKey: 'gst_certificate',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES,
          fileSize: 15 * 1024 * 1024
        },
        {
          id: '3',
          label: 'Incorporation Certificate or ISE copy*',
          isRequired: true,
          formKey: 'incorporation_certificate',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES,
          fileSize: 15 * 1024 * 1024
        },
        {
          id: ' 4',
          label: 'Cancel Cheque',
          isRequired: false,
          formKey: 'cancel_cheque',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES,
          fileSize: 10 * 1024 * 1024
        },
        {
          id: '6',
          label: 'Section 194Q*',
          isRequired: true,
          formKey: 'section_194q',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES,
          fileSize: 5 * 1024 * 1024
        },
        {
          id: '7',
          label: 'Government Registration Certificate',
          isRequired: false,
          formKey: 'government_registration_certificate',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES,
          fileSize: 5 * 1024 * 1024
        },
        {
          id: '8',
          label: 'Business Card',
          isRequired: false,
          formKey: 'business_card',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES,
          fileSize: 5 * 1024 * 1024
        }
      ]
    },
    {
      key: 'Company Owner Detail',
      value: [
        {
          id: '1',
          label: 'Pan Card/Aadhar Card*',
          isRequired: true,
          formKey: 'company_owner_pan_card',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES,
          fileSize: 15 * 1024 * 1024
        },
        {
          id: '2',
          label: 'Passport',
          isRequired: false,
          formKey: 'company_owner_passport',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES,
          fileSize: 10 * 1024 * 1024
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
          minFile: fileLimit.MIN_FILES,
          fileSize: 10 * 1024 * 1024
        },
        {
          id: '2',
          label: 'Photo ID 2',
          isRequired: false,
          formKey: 'person_to_contact_2',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES,
          fileSize: 10 * 1024 * 1024
        },
        {
          id: '3',
          label: 'Photo ID 3',
          isRequired: false,
          formKey: 'person_to_contact_3',
          maxFile: fileLimit.MAX_FILES,
          minFile: fileLimit.MIN_FILES,
          fileSize: 10 * 1024 * 1024
        }
      ]
    }
  ],
  Belgium: [
    {
      id: '1',
      label: 'FEIN No. / Tax No. / Business Registration Copy*',
      isRequired: true,
      formKey: 'registration_number',
      maxFile: fileLimit.MAX_FILES,
      minFile: fileLimit.MIN_FILES,
      fileSize: 20 * 1024 * 1024
    },
    {
      id: '2',
      label: 'Driving License/Passport*',
      isRequired: true,
      formKey: 'passport',
      maxFile: fileLimit.MAX_FILES,
      minFile: fileLimit.MIN_FILES,
      fileSize: 20 * 1024 * 1024
    },
    {
      id: '3',
      label: 'ID Copy / Residency Copy*',
      isRequired: true,
      formKey: 'id_copy',
      maxFile: fileLimit.MAX_FILES,
      minFile: fileLimit.MIN_FILES,
      fileSize: 20 * 1024 * 1024
    }
  ],
  USA: [
    {
      id: '1',
      label: 'FEIN No. / Tax No. / Business Registration Copy*',
      isRequired: true,
      formKey: 'registration_number',
      maxFile: fileLimit.MAX_FILES,
      minFile: fileLimit.MIN_FILES,
      fileSize: 20 * 1024 * 1024
    },
    {
      id: '2',
      label: 'Driving License/Passport*',
      isRequired: true,
      formKey: 'passport',
      maxFile: fileLimit.MAX_FILES,
      minFile: fileLimit.MIN_FILES,
      fileSize: 20 * 1024 * 1024
    },
    {
      id: '3',
      label: 'ID Copy / Residency Copy*',
      isRequired: true,
      formKey: 'id_copy',
      maxFile: fileLimit.MAX_FILES,
      minFile: fileLimit.MIN_FILES,
      fileSize: 20 * 1024 * 1024
    }
  ],
  Other: [
    {
      id: '1',
      label: 'Certificate of Incumbency/Extract of Registry*',
      isRequired: true,
      formKey: 'incumbency_certificate',
      maxFile: fileLimit.MAX_FILES,
      minFile: fileLimit.MIN_FILES,
      fileSize: 20 * 1024 * 1024
    },
    {
      id: '2',
      label: 'Business Registration/Trade license*',
      isRequired: true,
      formKey: 'trade_license',
      maxFile: fileLimit.MAX_FILES,
      minFile: fileLimit.MIN_FILES,
      fileSize: 20 * 1024 * 1024
    },
    {
      id: '3',
      label: 'TRN/VAT/GST Certificate*',
      isRequired: true,
      formKey: 'gst_certificate',
      maxFile: fileLimit.MAX_FILES,
      minFile: fileLimit.MIN_FILES,
      fileSize: 20 * 1024 * 1024
    },
    {
      id: '4',
      label: 'MOA/AOA/Partnership Deed',
      isRequired: false,
      formKey: 'moa',
      maxFile: fileLimit.MAX_FILES,
      minFile: fileLimit.MIN_FILES,
      fileSize: 10 * 1024 * 1024
    },
    {
      id: '5',
      label: 'ID Copy/Passport of Ultimate Beneficial Owners*',
      isRequired: true,
      formKey: 'owner_id_copy',
      maxFile: fileLimit.MAX_FILES,
      minFile: fileLimit.MIN_FILES,
      fileSize: 15 * 1024 * 1024
    },
    {
      id: '6',
      label: 'ID Copy/Passport of Authorised Signatory/Manager*',
      isRequired: true,
      formKey: 'manager_id_copy',
      maxFile: fileLimit.MAX_FILES,
      minFile: fileLimit.MIN_FILES,
      fileSize: 15 * 1024 * 1024
    }
  ]
};
