export const SELECT_VALID_INPUT = 'Please select valid input to proceed';

export const ANTI_MONEY_LAUNDERING_POLICY_NAME_INVALID =
  'Anti-money laundering policy name must be a non-empty string when registered under MSME Act';
export const ANTI_MONEY_LAUNDERING_INVALID =
  'Registered under MSME Act must be a boolean';
export const MSME_REGISTRATION_NUMBER_INVALID =
  'MSME registration number must be a non-empty when MSME is registered';
export const MSME_TYPE_INVALID =
  'MSME type must be a non-empty when MSME is registered';
export const MSME_REGISTERED_INVALID = 'MSME Register must be boolean';

export const MEMBER_NAME_INVALID =
  'Member of Business Organisation Name is invalid';
export const MEMBER_BUSINESS_INVALID =
  'Member of Business Organisation must be boolean';

export const MANDATORY_ERROR = (field: string) => `${field} is Mandatory`;

// For bank details
export const BANK_NAME_MANDATORY = MANDATORY_ERROR('Bank Name');
export const ACCOUNT_HOLDER_NAME_MANDATORY = MANDATORY_ERROR(
  'Account Holder Name'
);
export const ACCOUNT_NUMBER_MANDATORY = MANDATORY_ERROR('Account Number');
export const BANK_ADDRESS_INVALID = 'Please enter a valid Bank Address';
export const IFSC_CODE_MANDATORY = MANDATORY_ERROR('IFSC Code');
export const SWIFT_CODE_MANDATORY = MANDATORY_ERROR('SWIFT Code');

// For KycPostCompanyDetailsValidation
export const COMPANY_NAME_MANDATORY = MANDATORY_ERROR('Company name');
export const YEAR_OF_ESTABLISHMENT_MANDATORY = MANDATORY_ERROR(
  'Year of Establishment'
);
export const ADDRESS_MANDATORY = MANDATORY_ERROR('Address');
export const COMPANY_PHONE_NUMBER_MANDATORY = MANDATORY_ERROR(
  'Company Phone Number'
);
export const COMPANY_EMAIL_MANDATORY = MANDATORY_ERROR('Company Email');
export const BUSINESS_TYPE_MANDATORY = MANDATORY_ERROR('Business Type');
export const INDUSTRY_TYPE_MANDATORY = MANDATORY_ERROR('Industry Type');
export const ORGANISATION_TYPE_MANDATORY = MANDATORY_ERROR('Organisation Type');
export const BUSINESS_REGISTRATION_NUMBER_MANDATORY = MANDATORY_ERROR(
  'Business Registration Number'
);
export const MEMBER_CHECK_MANDATORY = MANDATORY_ERROR(
  'Member of any Business Organisation / Council check'
);
export const MEMBER_NAME_MANDATORY = MANDATORY_ERROR(
  'Member of Business Organisation Name'
);
export const ULTIMATE_BENEFICIARY_NAME_MANDATORY = MANDATORY_ERROR(
  'Ultimate Beneficiary Name'
);
// ... (repeat for other fields)

// For IndiaKycPostCompanyDetailsValidation
export const CITY_MANDATORY = MANDATORY_ERROR('City');
export const STATE_MANDATORY = MANDATORY_ERROR('State');
export const PINCODE_MANDATORY = MANDATORY_ERROR('Pincode');
export const COMPANY_PAN_NUMBER_MANDATORY =
  MANDATORY_ERROR('Company PAN number');
export const GST_NUMBER_MANDATORY = MANDATORY_ERROR('GST number');
export const MSME_TYPE_MANDATORY = MANDATORY_ERROR('MSME type');
export const MSME_REGISTRATION_NUMBER_MANDATORY = MANDATORY_ERROR(
  'MSME registration number'
);
// ... (repeat for other fields)

// For BelgiumKycPostCompanyDetailsValidation
export const VAT_NUMBER_MANDATORY = MANDATORY_ERROR('VAT number');
// ... (repeat for other fields)

// For UsaKycPostCompanyDetailsValidation
export const FEDERAL_TAX_ID_MANDATORY = MANDATORY_ERROR('Federal tax ID');
export const ANTI_MONEY_LAUNDERING_POLICY_NAME_MANDATORY = MANDATORY_ERROR(
  'Anti-money laundering policy name'
);
// ... (repeat for other fields)

// For company owner details
export const OWNER_FULL_NAME_MANDATORY = MANDATORY_ERROR('Owner Full Name');
export const OWNER_EMAIL_MANDATORY = MANDATORY_ERROR('Owner Email');
export const OWNER_COUNTRY_CODE_MANDATORY =
  MANDATORY_ERROR('Owner Country Code');
export const OWNER_PHONE_MANDATORY = MANDATORY_ERROR('Owner Phone');
export const OWNER_PAN_NUMBER_MANDATORY = MANDATORY_ERROR('Owner PAN Number');
// ... (repeat for other fields)

// For PersonalDetails
export const FIRST_NAME_MANDATORY = MANDATORY_ERROR('First Name');
export const LAST_NAME_MANDATORY = MANDATORY_ERROR('Last Name');
export const EMAIL_MANDATORY = MANDATORY_ERROR('Email');
export const COUNTRY_CODE_MANDATORY = MANDATORY_ERROR('Country Code');
export const PHONE_NUMBER_MANDATORY = MANDATORY_ERROR('Phone Number');
// ... (repeat for other fields)

export const MAX_CHARACTER_LIMIT_EXCEEDED = (field: string, max: number) =>
  `${field} should not exceed ${max} characters`;

export const RANGE_VALIDATION = (field: string, min: number, max: number) =>
  `${field} should between ${min} to ${max} characters`;
export const FIELD_INVALID = (field: string) => `${field} is Invalid`;

// for Attachments
export const PAN_CARD = MANDATORY_ERROR('Pan Card');
export const GST_CERTIFICATE = MANDATORY_ERROR('Gst Certificate');
export const INCORPORATION_CERTIFICATE = MANDATORY_ERROR(
  'Incorporation Certificate'
);
export const CANCEL_CHAQUE = MANDATORY_ERROR('Cancel Cheque');
export const SECTION_194Q = MANDATORY_ERROR('Section 194q');
export const GOVERMENT_REGISTRATION_CERTIFICATE = MANDATORY_ERROR(
  'Government Registration Certificate'
);
export const COMPANY_OWNER_PASSPORT = MANDATORY_ERROR('Company Owner Passport');
export const COMPANY_OWNER_PAN_CARD = MANDATORY_ERROR('Company Owner Pan Card');

//
export const REGISTRATION_NUMBER = MANDATORY_ERROR('Registration Number');
export const ID_COPY = MANDATORY_ERROR('Id Copy');
export const PASSPORT = MANDATORY_ERROR('Passport');

//
export const INCUMBENCY_CERTIFICATE = MANDATORY_ERROR('Incumbency Certificate');
export const TRADE_LICENSE = MANDATORY_ERROR('Trade License');
export const MOA = MANDATORY_ERROR('MOA');
export const OWNER_ID_COPY = MANDATORY_ERROR('Owner Id Copy');
export const MANAGER_ID_COPY = MANDATORY_ERROR('Manager Id Copy');
