import {
  ANTI_MONEY_LAUNDERING_INVALID,
  BUSINESS_REGISTRATION_NUMBER_MANDATORY,
  BUSINESS_TYPE_MANDATORY,
  CITY_MANDATORY,
  COMPANY_PAN_NUMBER_MANDATORY,
  FEDERAL_TAX_ID_MANDATORY,
  FIELD_INVALID,
  GST_NUMBER_MANDATORY,
  IFSC_CODE_MANDATORY,
  INDUSTRY_TYPE_MANDATORY,
  MAX_CHARACTER_LIMIT_EXCEEDED,
  MEMBER_BUSINESS_INVALID,
  MEMBER_CHECK_MANDATORY,
  MEMBER_NAME_INVALID,
  MEMBER_NAME_MANDATORY,
  MSME_REGISTERED_INVALID,
  MSME_REGISTRATION_NUMBER_MANDATORY,
  MSME_TYPE_INVALID,
  MSME_TYPE_MANDATORY,
  ORGANISATION_TYPE_MANDATORY,
  PINCODE_MANDATORY,
  RANGE_VALIDATION,
  STATE_MANDATORY,
  SWIFT_CODE_MANDATORY,
  ULTIMATE_BENEFICIARY_NAME_MANDATORY,
  VAT_NUMBER_MANDATORY
} from '@/constants/error-messages/kyc';
import { NAME_REGEX } from '@/constants/validation-regex/regex';
import {
  ArrayNotEmpty,
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

export async function validateKYCField(fieldType: string, fieldValue: any) {
  let instance;

  switch (fieldType) {
    case 'email':
      instance = new ValidationEmailCriteria(fieldValue);
      break;
    case 'first_name':
      instance = new ValidationFirstNameCriteria(fieldValue);
      break;
    case 'last_name':
      instance = new ValidationLastNameCriteria(fieldValue);
      break;
    case 'phone':
      instance = new ValidationPhoneCriteria(fieldValue);

      break;

    case 'country_code':
      instance = new ValidationCountryCodeCriteria(fieldValue);

      break;

    case 'company_name':
      instance = new ValidationCompanyNameCriteria(fieldValue);
      break;
    case 'year_of_establishment':
      instance = new ValidationYearOfEstablishmentCriteria(fieldValue);
      break;
    case 'address':
      instance = new ValidationAddressCriteria(fieldValue);
      break;
    case 'company_country_code':
      instance = new ValidationCountryCodeCriteria(fieldValue);
      break;
    case 'company_phone_number':
      instance = new ValidationPhoneCriteria(fieldValue);
      break;
    case 'company_email':
      instance = new ValidationEmailCriteria(fieldValue);
      break;
    case 'business_type':
      instance = new ValidationBusinessTypeCriteria(fieldValue);
      break;
    case 'industry_type':
      instance = new ValidationIndustryTypeCriteria(fieldValue);
      break;
    case 'organisation_type':
      instance = new ValidationOrganisationTypeCriteria(fieldValue);
      break;
    case 'business_registration_number':
      instance = new ValidationBusinessRegistrationNumberCriteria(fieldValue);
      break;
    case 'subsidiary_company':
      instance = new ValidationSubsidiaryCompanyCriteria(fieldValue);
      break;
    case 'is_member_of_business':
      instance = new ValidationIsMemberCriteria(fieldValue);
      break;
    case 'member_of_business_name':
      instance = new ValidationMemberNameCriteria(fieldValue);
      break;
    case 'ultimate_beneficiary_name':
      instance = new ValidationUltimateBeneficiaryNameCriteria(fieldValue);
      break;
    case 'city':
      instance = new ValidationCityCriteria(fieldValue);
      break;
    case 'state':
      instance = new ValidationStateCriteria(fieldValue);
      break;

    case 'pincode':
      instance = new ValidationPincodeCriteria(fieldValue);
      break;
    case 'company_pan_number':
      instance = new ValidationPANCriteria(fieldValue);
      break;
    case 'gst_number':
      instance = new ValidationGSTCriteria(fieldValue);
      break;
    case 'is_msme_registered':
      instance = new ValidationisMsmeRegisteredCriteria(fieldValue);
      break;
    case 'msme_type':
      instance = new ValidationMSMETypeCriteria(fieldValue);
      break;
    case 'msme_registration_number':
      instance = new ValidationMSMENumberCriteria(fieldValue);
      break;
    case 'vat_number':
      instance = new ValidationVATCriteria(fieldValue);
      break;
    case 'fax_number':
      instance = new ValidationFAXCriteria(fieldValue);
      break;
    case 'ownership_percentage':
      instance = new ValidationOwnershipPercentageCriteria(fieldValue);
      break;
    case 'federal_tax_id':
      instance = new ValidationFederalTaxCriteria(fieldValue);
      break;
    case 'is_anti_money_laundering':
      instance = new ValidationIsAntiMoneyCriteria(fieldValue);
      break;
    case 'anti_money_laundering_policy_name':
      instance = new ValidationAntiMoneyPolicyNameCriteria(fieldValue);
      break;

    case 'bank_name':
      instance = new ValidationBankNameCriteria(fieldValue);

      break;
    case 'account_holder_name':
      instance = new ValidationAccountHolderNameCriteria(fieldValue);

      break;
    case 'account_number':
      instance = new ValidationAccountNumberCriteria(fieldValue);

      break;
    case 'bank_address':
      instance = new ValidationBankAddressCriteria(fieldValue);

      break;
    case 'ifsc_code':
      instance = new ValidationIFSCCriteria(fieldValue);

      break;

    case 'swift_code':
      instance = new ValidationSwitfCriteria(fieldValue);

      break;

    case 'owner_full_name':
      instance = new ValidationOwnerNameCriteria(fieldValue);

      break;

    case 'owner_email':
      instance = new ValidationEmailCriteria(fieldValue);

      break;

    case 'owner_country_code':
      instance = new ValidationCountryCodeCriteria(fieldValue);

      break;
    case 'owner_phone':
      instance = new ValidationPhoneCriteria(fieldValue);

      break;

    case 'owner_pan_number':
      instance = new ValidationPanCriteria(fieldValue);

      break;

    default:
      throw new Error('Invalid field type');
  }

  return await validate(instance);
}

class ValidationFirstNameCriteria {
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('First Name')
  })
  @Length(1, 140, { message: MAX_CHARACTER_LIMIT_EXCEEDED('First Name', 140) })
  first_name: string;

  constructor(first_name: string) {
    this.first_name = first_name;
  }
}

class ValidationLastNameCriteria {
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Last Name')
  })
  @Length(1, 140, { message: MAX_CHARACTER_LIMIT_EXCEEDED('Last Name', 140) })
  last_name: string;

  constructor(last_name: string) {
    this.last_name = last_name;
  }
}

class ValidationEmailCriteria {
  @Length(1, 140, { message: MAX_CHARACTER_LIMIT_EXCEEDED('Email', 140) })
  @IsEmail({}, { message: FIELD_INVALID('Email') })
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

class ValidationCountryCodeCriteria {
  @IsNotEmpty({ message: FIELD_INVALID('Country Code') })
  country_code: string;

  constructor(country_code: string) {
    this.country_code = country_code;
  }
}

class ValidationPhoneCriteria {
  @MinLength(3, { message: FIELD_INVALID('Phone') })
  @IsMobilePhone()
  phone: string;

  constructor(phone: string) {
    this.phone = phone;
  }
}

//bank details
class ValidationBankNameCriteria {
  @Length(1, 140, { message: MAX_CHARACTER_LIMIT_EXCEEDED('Bank Name', 140) })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Bank Name')
  })
  @IsString({ message: FIELD_INVALID('Bank Name') })
  bank_name: string;

  constructor(bank_name: string) {
    this.bank_name = bank_name;
  }
}

class ValidationAccountHolderNameCriteria {
  @Length(1, 140, {
    message: MAX_CHARACTER_LIMIT_EXCEEDED('Account Holder Name', 140)
  })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Account Holder Name')
  })
  @IsString({ message: FIELD_INVALID('Account Holder Name') })
  account_holder_name: string;

  constructor(account_holder_name: string) {
    this.account_holder_name = account_holder_name;
  }
}

class ValidationAccountNumberCriteria {
  @Length(1, 140, {
    message: MAX_CHARACTER_LIMIT_EXCEEDED('Account Number', 140)
  })
  @IsString({ message: FIELD_INVALID('Account Number') })
  @Matches(/^[0-9a-zA-Z]+$/, {
    message: FIELD_INVALID('Account Number')
  })
  account_number: string;

  constructor(account_number: string) {
    this.account_number = account_number;
  }
}

class ValidationBankAddressCriteria {
  @Length(0, 140, {
    message: MAX_CHARACTER_LIMIT_EXCEEDED('Bank Address', 140)
  })
  @IsString({ message: FIELD_INVALID('Bank Address') })
  @IsOptional()
  bank_address: string;

  constructor(bank_address: string) {
    this.bank_address = bank_address;
  }
}
class ValidationIFSCCriteria {
  @IsString({ message: FIELD_INVALID('IFSC code') })
  @IsNotEmpty({ message: IFSC_CODE_MANDATORY })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: FIELD_INVALID('IFSC code')
  })
  @Length(8, 11, {
    message: RANGE_VALIDATION('IFSC code', 8, 11)
  })
  ifsc_code: string;

  constructor(ifsc_code: string) {
    this.ifsc_code = ifsc_code;
  }
}

class ValidationSwitfCriteria {
  @IsString({ message: FIELD_INVALID('Swift code') })
  @IsNotEmpty({ message: SWIFT_CODE_MANDATORY })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: FIELD_INVALID('Swift code')
  })
  @Length(8, 11, {
    message: RANGE_VALIDATION('Swift code', 8, 11)
  })
  swift_code: string;

  constructor(swift_code: string) {
    this.swift_code = swift_code;
  }
}

///company owner details

class ValidationOwnerNameCriteria {
  @Length(1, 140, {
    message: MAX_CHARACTER_LIMIT_EXCEEDED('Owner Full Name', 140)
  })
  @IsNotEmpty()
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Owner Full Name')
  })
  owner_full_name: string;

  constructor(owner_full_name: string) {
    this.owner_full_name = owner_full_name;
  }
}
class ValidationPanCriteria {
  @MinLength(10)
  @Matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, { message: FIELD_INVALID('OWNER PAN') })
  @IsAlphanumeric()
  owner_pan_number: string;

  constructor(owner_pan_number: string) {
    this.owner_pan_number = owner_pan_number;
  }
}

///company details

class ValidationCompanyNameCriteria {
  @IsString({ message: FIELD_INVALID('Company Name') })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Company Name')
  })
  @Length(1, 140, {
    message: MAX_CHARACTER_LIMIT_EXCEEDED('Company Name', 140)
  })
  company_name: string;

  constructor(company_name: string) {
    this.company_name = company_name;
  }
}

class ValidationYearOfEstablishmentCriteria {
  @IsNumberString({}, { message: FIELD_INVALID('Year of Establishment') })
  year_of_establishment: string;

  constructor(year_of_establishment: string) {
    this.year_of_establishment = year_of_establishment;
  }
}
class ValidationAddressCriteria {
  @IsString({ message: FIELD_INVALID('Address') })
  @Length(1, 140, { message: MAX_CHARACTER_LIMIT_EXCEEDED('Address', 140) })
  address: string;

  constructor(address: string) {
    this.address = address;
  }
}

class ValidationBusinessTypeCriteria {
  @ArrayNotEmpty({ message: BUSINESS_TYPE_MANDATORY })
  business_type: string[];

  constructor(business_type: string[]) {
    this.business_type = business_type;
  }
}
class ValidationIndustryTypeCriteria {
  @ArrayNotEmpty({ message: INDUSTRY_TYPE_MANDATORY })
  industry_type: string[];

  constructor(industry_type: string[]) {
    this.industry_type = industry_type;
  }
}
class ValidationOrganisationTypeCriteria {
  @IsString({ message: ORGANISATION_TYPE_MANDATORY })
  organisation_type: string;

  constructor(organisation_type: string) {
    this.organisation_type = organisation_type;
  }
}

class ValidationBusinessRegistrationNumberCriteria {
  @IsString({ message: FIELD_INVALID('Business Registration Number') })
  @IsNotEmpty({ message: BUSINESS_REGISTRATION_NUMBER_MANDATORY })
  @Length(1, 140, {
    message: RANGE_VALIDATION('Business Registration Number', 1, 140)
  })
  business_registration_number: string;

  constructor(business_registration_number: string) {
    this.business_registration_number = business_registration_number;
  }
}

class ValidationSubsidiaryCompanyCriteria {
  @IsString({ message: FIELD_INVALID('Subsidiary Company') })
  @Length(1, 140, { message: RANGE_VALIDATION('Subsidiary Company', 1, 140) })
  subsidiary_company: string;

  constructor(subsidiary_company: string) {
    this.subsidiary_company = subsidiary_company;
  }
}

class ValidationIsMemberCriteria {
  @IsBoolean({
    message: MEMBER_BUSINESS_INVALID
  })
  @IsNotEmpty({
    message: MEMBER_CHECK_MANDATORY
  })
  is_member_of_business: boolean;

  constructor(is_member_of_business: boolean) {
    this.is_member_of_business = is_member_of_business;
  }
}

class ValidationMemberNameCriteria {
  @ValidateIf((object, value) => object.is_member_of_business === value)
  @IsNotEmpty({ message: MEMBER_NAME_MANDATORY })
  @IsString({ message: MEMBER_NAME_INVALID })
  @Length(1, 140, {
    message: RANGE_VALIDATION('Member of Business Organisation Name', 1, 140)
  })
  @Matches(NAME_REGEX, {
    message: MEMBER_NAME_INVALID
  })
  member_of_business_name: string;

  constructor(member_of_business_name: string) {
    this.member_of_business_name = member_of_business_name;
  }
}

class ValidationUltimateBeneficiaryNameCriteria {
  @IsString({ message: FIELD_INVALID('Ultimate Beneficiary Name') })
  @IsNotEmpty({ message: ULTIMATE_BENEFICIARY_NAME_MANDATORY })
  @Length(1, 140, {
    message: RANGE_VALIDATION('Ultimate Beneficiary Name', 1, 140)
  })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Ultimate Beneficiary Name')
  })
  ultimate_beneficiary_name: string;

  constructor(ultimate_beneficiary_name: string) {
    this.ultimate_beneficiary_name = ultimate_beneficiary_name;
  }
}

class ValidationCityCriteria {
  @IsString({ message: FIELD_INVALID('City') })
  @IsNotEmpty({ message: CITY_MANDATORY })
  @Length(1, 140, { message: RANGE_VALIDATION('City', 1, 140) })
  city: string;

  constructor(city: string) {
    this.city = city;
  }
}

class ValidationStateCriteria {
  @IsString({ message: FIELD_INVALID('State') })
  @IsNotEmpty({ message: STATE_MANDATORY })
  @Length(1, 140, { message: RANGE_VALIDATION('State', 1, 140) })
  state: string;

  constructor(state: string) {
    this.state = state;
  }
}

class ValidationPincodeCriteria {
  // TODO: commenting the extra condition will take decision in future if we required them
  // @IsNumberString({}, { message: 'Pincode must be a valid number' })
  // @Length(6, 6, { message: 'Pincode must be 6 digits long' })
  @IsNotEmpty({ message: PINCODE_MANDATORY })
  pincode: string;

  constructor(pincode: string) {
    this.pincode = pincode;
  }
}

class ValidationPANCriteria {
  @Matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, {
    message: FIELD_INVALID('Company PAN')
  })
  @IsString({ message: FIELD_INVALID('Company PAN') })
  @IsNotEmpty({ message: COMPANY_PAN_NUMBER_MANDATORY })
  @IsAlphanumeric()
  @MinLength(10)
  company_pan_number: string;

  constructor(company_pan_number: string) {
    this.company_pan_number = company_pan_number;
  }
}

class ValidationGSTCriteria {
  @IsString({ message: FIELD_INVALID('GST Number') })
  @IsNotEmpty({ message: GST_NUMBER_MANDATORY })
  @Length(1, 140, { message: RANGE_VALIDATION('GST Number', 1, 140) })
  gst_number: string;

  constructor(gst_number: string) {
    this.gst_number = gst_number;
  }
}

class ValidationisMsmeRegisteredCriteria {
  @IsBoolean({ message: MSME_REGISTERED_INVALID })
  @IsOptional()
  is_msme_registered: boolean;

  constructor(is_msme_registered: boolean) {
    this.is_msme_registered = is_msme_registered;
  }
}
class ValidationMSMETypeCriteria {
  @ValidateIf((object, value) => object?.is_msme_registered === value)
  @IsString({
    message: MSME_TYPE_INVALID
  })
  @IsNotEmpty({ message: MSME_TYPE_MANDATORY })
  @Length(1, 140, { message: FIELD_INVALID('MSME Type') })
  msme_type: string;

  constructor(msme_type: string) {
    this.msme_type = msme_type;
  }
}
class ValidationMSMENumberCriteria {
  @ValidateIf((object, value) => object?.is_msme_registered === value)
  @IsString({
    message: FIELD_INVALID('MSME Registration Number')
  })
  @IsNotEmpty({
    message: MSME_REGISTRATION_NUMBER_MANDATORY
  })
  @Length(1, 140, {
    message: RANGE_VALIDATION('MSME Registration Number', 1, 140)
  })
  msme_registration_number: string;

  constructor(msme_registration_number: string) {
    this.msme_registration_number = msme_registration_number;
  }
}
class ValidationVATCriteria {
  @IsString({ message: FIELD_INVALID('VAT Number') })
  @IsNotEmpty({ message: VAT_NUMBER_MANDATORY })
  @Length(1, 140, { message: RANGE_VALIDATION('VAT Number', 1, 140) })
  vat_number: string;

  constructor(vat_number: string) {
    this.vat_number = vat_number;
  }
}
class ValidationFAXCriteria {
  @IsString({ message: FIELD_INVALID('FAX Number') })
  @IsOptional()
  @Length(0, 140, { message: MAX_CHARACTER_LIMIT_EXCEEDED('FAX Number', 140) })
  fax_number: string;

  constructor(fax_number: string) {
    this.fax_number = fax_number;
  }
}

class ValidationOwnershipPercentageCriteria {
  //TODO:validator for it
  @IsOptional()
  ownership_percentage: number;

  constructor(ownership_percentage: number) {
    this.ownership_percentage = ownership_percentage;
  }
}

class ValidationFederalTaxCriteria {
  @IsString({ message: FIELD_INVALID('Federal Tax ID') })
  @IsNotEmpty({ message: FEDERAL_TAX_ID_MANDATORY })
  @Length(1, 140, { message: RANGE_VALIDATION('Federal Tax ID', 1, 140) })
  federal_tax_id: string;

  constructor(federal_tax_id: string) {
    this.federal_tax_id = federal_tax_id;
  }
}
class ValidationIsAntiMoneyCriteria {
  @IsBoolean({ message: ANTI_MONEY_LAUNDERING_INVALID })
  @IsOptional()
  is_anti_money_laundering: boolean;

  constructor(is_anti_money_laundering: boolean) {
    this.is_anti_money_laundering = is_anti_money_laundering;
  }
}
class ValidationAntiMoneyPolicyNameCriteria {
  @ValidateIf(object => object?.is_anti_money_laundering === false)
  @IsString({
    message: ANTI_MONEY_LAUNDERING_INVALID
  })
  @IsNotEmpty({
    message: ANTI_MONEY_LAUNDERING_INVALID
  })
  @Length(1, 140, { message: FIELD_INVALID('Anti Money Laundering Reason') })
  @Matches(NAME_REGEX, {
    message: ANTI_MONEY_LAUNDERING_INVALID
  })
  anti_money_laundering_policy_name: string;

  constructor(anti_money_laundering_policy_name: string) {
    this.anti_money_laundering_policy_name = anti_money_laundering_policy_name;
  }
}
