import {
  ArrayNotEmpty,
  IsAlpha,
  IsAlphanumeric,
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinLength,
  ValidateIf,
  validate
} from 'class-validator';
import logger from 'logging/log-util';

// Add more validation functions as needed
export const validateScreen = async (
  formData: any,
  screenName: string,
  country: string
) => {
  let validationErrors;
  let kycForm;
  if (formData) {
    switch (screenName) {
      case 'personal_details':
        kycForm = new PersonalDetails(
          formData.first_name,
          formData.last_name,
          formData.email,
          formData.country_code,
          formData.phone
        );

        break;
      case 'company_details':
        switch (country) {
          case 'india':
            kycForm = new IndiaKycPostCompanyDetailsValidation(
              formData.company_name,
              formData.year_of_establishment,
              formData.address,
              formData.company_phone_number,
              formData.company_email,
              formData.business_type,
              formData.industry_type,
              formData.organisation_type,
              formData.business_registration_number,
              formData.subsidiary_company,
              formData.is_member_of_business,
              formData.member_of_business_name,
              formData.ultimate_beneficiary_name,
              formData.city,
              formData.state,
              formData.pincode,
              formData.company_pan_number,
              formData.gst_number,
              formData.is_msme_registered,
              formData.msme_type,
              formData.msme_registration_number
            );

            break;
          case 'belgium':
            kycForm = new BelgiumKycPostCompanyDetailsValidation(
              formData.company_name,
              formData.year_of_establishment,
              formData.address,
              formData.company_phone_number,
              formData.company_email,
              formData.business_type,
              formData.industry_type,
              formData.organisation_type,
              formData.business_registration_number,
              formData.subsidiary_company,
              formData.is_member_of_business,
              formData.member_of_business_name,
              formData.ultimate_beneficiary_name,
              formData.vat_number,
              formData.fax_number, // Optional
              formData.ownership_percentage // Optional
            );

            break;
          case 'usa':
            kycForm = new UsaKycPostCompanyDetailsValidation(
              formData.company_name,
              formData.year_of_establishment,
              formData.address,
              formData.company_phone_number,
              formData.company_email,
              formData.business_type,
              formData.industry_type,
              formData.organisation_type,
              formData.business_registration_number,
              formData.subsidiary_company,
              formData.is_member_of_business,
              formData.member_of_business_name,
              formData.ultimate_beneficiary_name,
              formData.vat_number,
              formData.swift_code,
              formData.federal_tax_id,
              formData.is_anti_money_laundering,
              formData.anti_money_laundering_policy_name,
              formData.ownership_percentage // Added this missing argument
            );

            break;

          default:
            validationErrors = 'something went wrong';
        }
        break;
      case 'company_owner_details':
        if (country === 'india') {
          kycForm = new IndiaKycPostCompanyOwnerInformation(
            formData.owner_full_name,
            formData.owner_email,
            formData.owner_country_code,
            formData.owner_phone,
            formData.owner_pan_number
          );
        }
        break;
      case 'banking_details':
        switch (country) {
          case 'india':
            kycForm = new IndiaBankDetails(
              formData.bank_name,
              formData.account_holder_name,
              formData.account_number,
              formData.bank_address, // Make sure this field exists in formData
              formData.ifsc_code
            );
            break;
          case 'usa':
            kycForm = new UsaBankDetails(
              formData.bank_name,
              formData.account_holder_name,
              formData.account_number,
              formData.swift_code // Make sure this field exists in formData
            );
            break;
          case 'belgium':
            kycForm = new BelgiumBankDetails(
              formData.bank_name,
              formData.account_holder_name,
              formData.account_number,
              formData.swift_code // Make sure this field exists in formData
            );
            break;
          default:
            validationErrors = 'something went wrong';
            break;
        }
        break;
      default:
        logger.info('default');
        break;
    }
    validationErrors = await validate(kycForm!);
  } else {
    validationErrors = validationErrors || 'please all fields';
  }

  return validationErrors;
};

// Base File
export class KycBase {}

// same info is required for all the section
// Section1

class ValidationFirstNameCriteria {
  @MinLength(3, { message: 'First name must be at least 3 characters long' })
  @IsAlpha()
  @IsNotEmpty({ message: 'First name is required' })
  first_name: string;

  constructor(first_name: string) {
    this.first_name = first_name;
  }
}

export async function validateFirstName(first_name: string) {
  const instance = new ValidationFirstNameCriteria(first_name);
  return await validate(instance);
}

class ValidationLastNameCriteria {
  @MinLength(3, { message: 'Last name must be at least 3 characters long' })
  @IsAlpha()
  @IsNotEmpty({ message: 'Last name is required' })
  last_name: string;

  constructor(last_name: string) {
    this.last_name = last_name;
  }
}

export async function validateLastName(last_name: string) {
  const instance = new ValidationLastNameCriteria(last_name);
  return await validate(instance);
}

class ValidationEmailCriteria {
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

export async function validateEmail(email: string) {
  const instance = new ValidationEmailCriteria(email);
  return await validate(instance);
}

class ValidationCountryCodeCriteria {
  @IsNotEmpty({ message: 'Invalid phone country code!' })
  country_code: string;

  constructor(country_code: string) {
    this.country_code = country_code;
  }
}

export async function validateCountryCode(country_code: string) {
  const instance = new ValidationCountryCodeCriteria(country_code);
  return await validate(instance);
}

class ValidationPhoneCriteria {
  @MinLength(3, { message: 'Invalid phone!' })
  @IsMobilePhone()
  phone: string;

  constructor(phone: string) {
    this.phone = phone;
  }
}

export async function validatePhone(phone: string) {
  const instance = new ValidationPhoneCriteria(phone);
  return await validate(instance);
}

export class PersonalDetails extends KycBase {
  @MinLength(3)
  @IsAlpha()
  first_name: string;

  @MinLength(3)
  @IsAlpha()
  last_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Invalid phone country code!' })
  country_code: string;

  @MinLength(3, { message: 'Invalid phone!' })
  @IsMobilePhone()
  phone: string;

  constructor(
    first_name: string,
    last_name: string,
    email: string,
    country_code: string,
    phone: string
  ) {
    super();
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.country_code = country_code;
    this.phone = phone;
  }
}

// Company Information
// Section2

export class KycPostCompanyDetailsValidation extends KycBase {
  @IsString({ message: 'Company name must be a string' })
  @IsNotEmpty({ message: 'Company name is required' })
  company_name: string;

  @IsNumberString(
    {},
    { message: 'Year of establishment must be a valid number' }
  )
  @IsNotEmpty({ message: 'Year of establishment is required' })
  year_of_establishment: string;

  @IsString({ message: 'Address must be a string' })
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsNumberString(
    {},
    { message: 'Company phone number must be a valid number' }
  )
  @IsNotEmpty({ message: 'Company phone number is required' })
  company_phone_number: string;

  @IsEmail({}, { message: 'Invalid company email address' })
  @IsNotEmpty({ message: 'Company email is required' })
  company_email: string;

  @ArrayNotEmpty({ message: 'Business type array must not be empty' })
  business_type: string[];

  @ArrayNotEmpty({ message: 'Industry type array must not be empty' })
  industry_type: string[];

  @ArrayNotEmpty({ message: 'Organisation type array must not be empty' })
  organisation_type: string[];

  @IsString({ message: 'Business registration number must be a string' })
  @IsNotEmpty({ message: 'Business registration number is required' })
  business_registration_number: string;

  @IsString({ message: 'Subsidiary company must be a string' })
  subsidiary_company: string;

  @IsBoolean({
    message:
      'Member of any Business Organisation / Council check must be a boolean'
  })
  @IsNotEmpty({
    message: 'Member of any Business Organisation / Council check is required'
  })
  is_member_of_business: boolean = false;

  @ValidateIf(object => object.is_member_of_business === true)
  @IsNotEmpty({ message: 'Member of business name must be provided' })
  @IsString({ message: 'Member of business name must be a string' })
  member_of_business_name: string;

  @IsString({ message: 'Ultimate beneficiary name must be a string' })
  @IsNotEmpty({ message: 'Ultimate beneficiary name is required' })
  ultimate_beneficiary_name: string;

  constructor(
    company_name: string,
    year_of_establishment: string,
    address: string,
    company_phone_number: string,
    company_email: string,
    business_type: string[],
    industry_type: string[],
    organisation_type: string[],
    business_registration_number: string,
    subsidiary_company: string,
    is_member_of_business: boolean,
    member_of_business_name: string,
    ultimate_beneficiary_name: string
  ) {
    super();
    this.company_name = company_name;
    this.year_of_establishment = year_of_establishment;
    this.address = address;
    this.company_phone_number = company_phone_number;
    this.company_email = company_email;
    this.business_type = business_type;
    this.industry_type = industry_type;
    this.organisation_type = organisation_type;
    this.business_registration_number = business_registration_number;
    this.subsidiary_company = subsidiary_company;
    this.is_member_of_business = is_member_of_business;
    this.member_of_business_name = member_of_business_name;
    this.ultimate_beneficiary_name = ultimate_beneficiary_name;
  }
}

export class IndiaKycPostCompanyDetailsValidation extends KycPostCompanyDetailsValidation {
  @IsString({ message: 'City must be a string' })
  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @IsString({ message: 'State must be a string' })
  @IsNotEmpty({ message: 'State is required' })
  state: string;

  @IsNotEmpty({ message: 'Pincode is required' })
  pincode: string;

  @IsString({ message: 'Company PAN number must be a string' })
  @IsNotEmpty({ message: 'Company PAN number is required' })
  company_pan_number: string;

  @IsString({ message: 'GST number must be a string' })
  @IsNotEmpty({ message: 'GST number is required' })
  gst_number: string;

  @IsBoolean({ message: 'Registered under MSME Act must be a boolean' })
  @IsOptional()
  is_msme_registered: boolean = false;

  @ValidateIf(object => object?.is_msme_registered === true)
  @IsString({
    message: 'MSME type must be a non-empty when MSME is registered'
  })
  @IsNotEmpty({ message: 'MSME type is required when MSME is registered' })
  msme_type: string;

  @ValidateIf(object => object?.is_msme_registered === true)
  @IsString({
    message:
      'MSME registration number must be a non-empty when MSME is registered'
  })
  @IsNotEmpty({
    message: 'MSME registration number is required when MSME is registered'
  })
  msme_registration_number: string;
  constructor(
    company_name: string,
    year_of_establishment: string,
    address: string,
    company_phone_number: string,
    company_email: string,
    business_type: string[],
    industry_type: string[],
    organisation_type: string[],
    business_registration_number: string,
    subsidiary_company: string,
    is_member_of_business: boolean,
    member_of_business_name: string,
    ultimate_beneficiary_name: string,
    city: string,
    state: string,
    pincode: string,
    company_pan_number: string,
    gst_number: string,
    is_msme_registered: boolean,
    msme_type: string,
    msme_registration_number: string
  ) {
    super(
      company_name,
      year_of_establishment,
      address,
      company_phone_number,
      company_email,
      business_type,
      industry_type,
      organisation_type,
      business_registration_number,
      subsidiary_company,
      is_member_of_business,
      member_of_business_name,
      ultimate_beneficiary_name
    );
    this.city = city;
    this.state = state;
    this.pincode = pincode;
    this.company_pan_number = company_pan_number;
    this.gst_number = gst_number;
    this.is_msme_registered = is_msme_registered;
    this.msme_type = msme_type;
    this.msme_registration_number = msme_registration_number;
  }
}

export class BelgiumKycPostCompanyDetailsValidation extends KycPostCompanyDetailsValidation {
  @IsString({ message: 'VAT number must be a string' })
  @IsNotEmpty({ message: 'VAT number is required' })
  vat_number: string;

  @IsString({ message: 'Fax number must be a string' })
  @IsOptional()
  fax_number: string;

  //TODO:validator for it
  @IsOptional()
  ownership_percentage: number;

  constructor(
    company_name: string,
    year_of_establishment: string,
    address: string,
    company_phone_number: string,
    company_email: string,
    business_type: string[],
    industry_type: string[],
    organisation_type: string[],
    business_registration_number: string,
    subsidiary_company: string,
    is_member_of_business: boolean,
    member_of_business_name: string,
    ultimate_beneficiary_name: string,
    vat_number: string,
    fax_number: string,
    ownership_percentage: number
  ) {
    super(
      company_name,
      year_of_establishment,
      address,
      company_phone_number,
      company_email,
      business_type,
      industry_type,
      organisation_type,
      business_registration_number,
      subsidiary_company,
      is_member_of_business,
      member_of_business_name,
      ultimate_beneficiary_name
    );
    this.vat_number = vat_number;
    this.fax_number = fax_number;
    this.ownership_percentage = ownership_percentage;
  }
}

export class UsaKycPostCompanyDetailsValidation extends BelgiumKycPostCompanyDetailsValidation {
  @IsString({ message: 'Federal tax ID must be a string' })
  @IsNotEmpty({ message: 'Federal tax ID is required' })
  federal_tax_id: string;

  @IsBoolean({ message: 'Registered under MSME Act must be a boolean' })
  @IsOptional()
  is_anti_money_laundering: boolean = false;

  @ValidateIf(object => object?.is_anti_money_laundering === true)
  @IsString({
    message:
      'Anti-money laundering policy name must be a non-empty string when registered under MSME Act'
  })
  @IsNotEmpty({
    message:
      'Anti-money laundering policy name is required when registered under MSME Act'
  })
  anti_money_laundering_policy_name: string;

  constructor(
    company_name: string,
    year_of_establishment: string,
    address: string,
    company_phone_number: string,
    company_email: string,
    business_type: string[],
    industry_type: string[],
    organisation_type: string[],
    business_registration_number: string,
    subsidiary_company: string,
    is_member_of_business: boolean,
    member_of_business_name: string,
    ultimate_beneficiary_name: string,
    vat_number: string,
    fax_number: string,
    ownership_percentage: number,
    federal_tax_id: string,
    is_anti_money_laundering: boolean,
    anti_money_laundering_policy_name: string
  ) {
    super(
      company_name,
      year_of_establishment,
      address,
      company_phone_number,
      company_email,
      business_type,
      industry_type,
      organisation_type,
      business_registration_number,
      subsidiary_company,
      is_member_of_business,
      member_of_business_name,
      ultimate_beneficiary_name,
      vat_number,
      fax_number,
      ownership_percentage
    );
    this.federal_tax_id = federal_tax_id;
    this.is_anti_money_laundering = is_anti_money_laundering;
    this.anti_money_laundering_policy_name = anti_money_laundering_policy_name;
  }
}

// required the information only for the India company owner information
// Seciton 3

export class KycPostCompanyOwnerInformation extends KycBase {
  @MinLength(3)
  @IsNotEmpty()
  owner_full_name: string;

  @MinLength(3)
  @IsEmail()
  @IsNotEmpty()
  owner_email: string;

  @IsNotEmpty()
  owner_country_code: string;

  @MinLength(3, { message: 'Invalid phone!' })
  @IsMobilePhone()
  owner_phone: string;

  @MinLength(10)
  @IsAlphanumeric()
  owner_pan_number: string;

  constructor(
    owner_full_name: string,
    owner_email: string,
    owner_country_code: string,
    owner_phone: string,
    owner_pan_number: string
  ) {
    super();
    this.owner_full_name = owner_full_name;
    this.owner_email = owner_email;
    this.owner_country_code = owner_country_code;
    this.owner_phone = owner_phone;
    this.owner_pan_number = owner_pan_number;
  }
}

export class IndiaKycPostCompanyOwnerInformation extends KycPostCompanyOwnerInformation {
  constructor(
    owner_full_name: string,
    owner_email: string,
    owner_country_code: string,
    owner_phone: string,
    owner_pan_number: string
  ) {
    super(
      owner_full_name,
      owner_email,
      owner_country_code,
      owner_phone,
      owner_pan_number
    );
  }
}

class BaseBankDetails extends KycBase {
  @IsString({ message: 'Bank name must be a string' })
  @IsNotEmpty({ message: 'Bank name is required' })
  bank_name: string;

  @IsString({ message: 'Account holder name must be a string' })
  @IsNotEmpty({ message: 'Account holder name is required' })
  account_holder_name: string;

  @IsString({ message: 'Account number must be a string' })
  @IsNotEmpty({ message: 'Account number is required' })
  @Matches(/^[0-9a-zA-Z]+$/, {
    message: 'Account number must contain only alphanumeric characters'
  })
  account_number: string;

  constructor(
    bank_name: string,
    account_holder_name: string,
    account_number: string
  ) {
    super();
    this.bank_name = bank_name;
    this.account_holder_name = account_holder_name;
    this.account_number = account_number;
  }
}

export class IndiaBankDetails extends BaseBankDetails {
  @IsString({ message: 'Bank address must be a string' })
  @IsOptional()
  bank_address: string;

  @IsString({ message: 'IFSC code must be a string' })
  @IsNotEmpty({ message: 'IFSC code is required' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'IFSC code must contain only alphanumeric characters'
  })
  @Length(8, 11, {
    message: 'IFSC code must be between 8 and 11 characters long'
  })
  ifsc_code: string;

  constructor(
    bank_name: string,
    account_holder_name: string,
    account_number: string,
    bank_address: string,
    ifsc_code: string
  ) {
    super(bank_name, account_holder_name, account_number);
    this.bank_address = bank_address;
    this.ifsc_code = ifsc_code;
  }
}
export class UsaBankDetails extends BaseBankDetails {
  @IsString({ message: 'SWIFT code must be a string' })
  @IsNotEmpty({ message: 'SWIFT code is required' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'SWIFT code must contain only alphanumeric characters'
  })
  @Length(8, 11, {
    message: 'SWIFT code must be between 8 and 11 characters long'
  })
  swift_code: string;

  constructor(
    bank_name: string,
    account_holder_name: string,
    account_number: string,
    swift_code: string
  ) {
    super(bank_name, account_holder_name, account_number);
    this.swift_code = swift_code;
  }
}
export class BelgiumBankDetails extends UsaBankDetails {
  constructor(
    bank_name: string,
    account_holder_name: string,
    account_number: string,
    swift_code: string
  ) {
    super(bank_name, account_holder_name, account_number, swift_code);
  }
}
