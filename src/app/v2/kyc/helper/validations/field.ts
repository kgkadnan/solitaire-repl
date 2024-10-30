import {
  ACCOUNT_HOLDER_NAME_MANDATORY,
  ACCOUNT_NUMBER_MANDATORY,
  ADDRESS_MANDATORY,
  ANTI_MONEY_LAUNDERING_INVALID,
  BANK_ADDRESS_INVALID,
  BANK_NAME_MANDATORY,
  BUSINESS_REGISTRATION_NUMBER_MANDATORY,
  BUSINESS_TYPE_MANDATORY,
  CITY_MANDATORY,
  COMPANY_NAME_MANDATORY,
  COMPANY_PAN_NUMBER_MANDATORY,
  COUNTRY_CODE_MANDATORY,
  EMAIL_MANDATORY,
  FEDERAL_TAX_ID_MANDATORY,
  FIELD_INVALID,
  FIRST_NAME_MANDATORY,
  GST_NUMBER_MANDATORY,
  IFSC_CODE_MANDATORY,
  INDUSTRY_TYPE_MANDATORY,
  IS_ANTI_MONEY_LAUNDERING,
  LAST_NAME_MANDATORY,
  MEMBER_BUSINESS_INVALID,
  MEMBER_CHECK_MANDATORY,
  MEMBER_NAME_INVALID,
  MEMBER_NAME_MANDATORY,
  MSME_REGISTERED_INVALID,
  MSME_REGISTRATION_NUMBER_MANDATORY,
  MSME_TYPE_INVALID,
  MSME_TYPE_MANDATORY,
  ORGANISATION_TYPE_MANDATORY,
  OWNER_PAN_NUMBER_OR_ADHAAR_MANDATORY,
  PHONE_NUMBER_MANDATORY,
  PINCODE_MANDATORY,
  RANGE_VALIDATION,
  STATE_MANDATORY,
  SWIFT_CODE_MANDATORY,
  ULTIMATE_BENEFICIARY_NAME_MANDATORY,
  VAT_NUMBER_MANDATORY,
  YEAR_OF_ESTABLISHMENT_MANDATORY
} from '@/constants/error-messages/kyc';
import {
  ACCOUNT_NUMBER_REGEX,
  GST_NUMBER_REGEX,
  IFSC_REGEX,
  NAME_REGEX,
  PAN_MATCH,
  PHONE_REG,
  PHONE_REGEX,
  SWIFT_CODE_REGEX
} from '@/constants/validation-regex/regex';
import {
  ArrayNotEmpty,
  IsAlphanumeric,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
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
    case 'address_line_1':
      instance = new ValidationAddressCriteria(fieldValue);
      break;
    case 'address_line_2':
      instance = new ValidationAddressLineCriteria(fieldValue);
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
    case 'no_anti_money_laundering_policy_reason':
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

    case 'owner_first_name':
      instance = new ValidationOwnerFirstNameCriteria(fieldValue);

      break;

    case 'owner_last_name':
      instance = new ValidationOwnerLastNameCriteria(fieldValue);

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

    case 'owner_pan_or_aadhaar_number':
      instance = new ValidationPanCriteria(fieldValue);

      break;

    default:
      throw new Error('Invalid field type');
  }

  return await validate(instance);
}

class ValidationFirstNameCriteria {
  @IsNotEmpty({ message: FIRST_NAME_MANDATORY })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('First Name')
  })
  @Length(1, 140, { message: FIELD_INVALID('First Name') })
  first_name: string;

  constructor(first_name: string) {
    this.first_name = first_name;
  }
}

class ValidationLastNameCriteria {
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Last Name')
  })
  @IsNotEmpty({ message: LAST_NAME_MANDATORY })
  @Length(1, 140, { message: FIELD_INVALID('Last Name') })
  last_name: string;

  constructor(last_name: string) {
    this.last_name = last_name;
  }
}

class ValidationEmailCriteria {
  @IsNotEmpty({ message: EMAIL_MANDATORY })
  @Length(1, 140, { message: FIELD_INVALID('Email') })
  @IsEmail({}, { message: FIELD_INVALID('Email') })
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

class ValidationCountryCodeCriteria {
  @IsNotEmpty({ message: COUNTRY_CODE_MANDATORY })
  @Length(1, 4, { message: FIELD_INVALID('Country Code') })
  country_code: string;

  constructor(country_code: string) {
    this.country_code = country_code;
  }
}

class ValidationPhoneCriteria {
  @MinLength(3, { message: FIELD_INVALID('Phone') })
  @Matches(PHONE_REG, {
    message: RANGE_VALIDATION('Phone', 6, 15)
  })
  @IsNotEmpty({ message: PHONE_NUMBER_MANDATORY })
  phone: string;

  constructor(phone: string) {
    this.phone = phone;
  }
}

//bank details
class ValidationBankNameCriteria {
  @IsNotEmpty({ message: BANK_NAME_MANDATORY })
  @Length(1, 140, { message: FIELD_INVALID('Bank Name') })
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
    message: FIELD_INVALID('Account Holder Name')
  })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Account Holder Name')
  })
  @IsString({ message: FIELD_INVALID('Account Holder Name') })
  @IsNotEmpty({ message: ACCOUNT_HOLDER_NAME_MANDATORY })
  account_holder_name: string;

  constructor(account_holder_name: string) {
    this.account_holder_name = account_holder_name;
  }
}

class ValidationAccountNumberCriteria {
  @Length(1, 15, {
    message: FIELD_INVALID('Account Number')
  })
  @IsString({ message: FIELD_INVALID('Account Number') })
  @Matches(ACCOUNT_NUMBER_REGEX, {
    message: FIELD_INVALID('Account Number')
  })
  @IsNotEmpty({ message: ACCOUNT_NUMBER_MANDATORY })
  account_number: string;

  constructor(account_number: string) {
    this.account_number = account_number;
  }
}

class ValidationBankAddressCriteria {
  @IsString({ message: BANK_ADDRESS_INVALID })
  @IsOptional()
  @Length(0, 140, {
    message: FIELD_INVALID('Bank Address')
  })
  bank_address: string;

  constructor(bank_address: string) {
    this.bank_address = bank_address;
  }
}
class ValidationIFSCCriteria {
  @IsString({ message: FIELD_INVALID('IFSC code') })
  @IsNotEmpty({ message: IFSC_CODE_MANDATORY })
  @Matches(IFSC_REGEX, {
    message: FIELD_INVALID('IFSC code')
  })
  @Length(8, 11, {
    message: FIELD_INVALID('IFSC code')
  })
  ifsc_code: string;

  constructor(ifsc_code: string) {
    this.ifsc_code = ifsc_code;
  }
}

class ValidationSwitfCriteria {
  @IsString({ message: FIELD_INVALID('Swift code') })
  @IsNotEmpty({ message: SWIFT_CODE_MANDATORY })
  @Matches(SWIFT_CODE_REGEX, {
    message: FIELD_INVALID('Swift code')
  })
  swift_code: string;

  constructor(swift_code: string) {
    this.swift_code = swift_code;
  }
}

///company owner details

class ValidationOwnerFirstNameCriteria {
  @Length(1, 140, {
    message: FIELD_INVALID('Owner First Name')
  })
  @IsNotEmpty({ message: FIELD_INVALID('Owner First Name') })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Owner First Name')
  })
  owner_first_name: string;

  constructor(owner_first_name: string) {
    this.owner_first_name = owner_first_name;
  }
}

class ValidationOwnerLastNameCriteria {
  @Length(1, 140, {
    message: FIELD_INVALID('Owner Last Name')
  })
  @IsNotEmpty({ message: FIELD_INVALID('Owner Last Name') })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Owner Last Name')
  })
  owner_last_name: string;

  constructor(owner_last_name: string) {
    this.owner_last_name = owner_last_name;
  }
}
class ValidationPanCriteria {
  @IsNotEmpty({ message: OWNER_PAN_NUMBER_OR_ADHAAR_MANDATORY })
  @IsAlphanumeric(undefined, { message: FIELD_INVALID('PAN Or Adhaar Number') })
  @MinLength(10, { message: FIELD_INVALID('PAN Or Adhaar Number') })
  owner_pan_or_aadhaar_number: string;

  constructor(owner_pan_or_aadhaar_number: string) {
    this.owner_pan_or_aadhaar_number = owner_pan_or_aadhaar_number;
  }
}

///company details

class ValidationCompanyNameCriteria {
  @IsNotEmpty({ message: COMPANY_NAME_MANDATORY })
  @IsString({ message: FIELD_INVALID('Company Name') })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Company Name')
  })
  @Length(1, 140, {
    message: FIELD_INVALID('Company Name')
  })
  company_name: string;

  constructor(company_name: string) {
    this.company_name = company_name;
  }
}

class ValidationYearOfEstablishmentCriteria {
  @IsNotEmpty({ message: YEAR_OF_ESTABLISHMENT_MANDATORY })
  @IsNumberString({}, { message: FIELD_INVALID('Year of Establishment') })
  @Length(4, 4, { message: FIELD_INVALID('Year of Establishment') })
  year_of_establishment: string;

  constructor(year_of_establishment: string) {
    this.year_of_establishment = year_of_establishment;
  }
}
class ValidationAddressCriteria {
  @IsString({ message: FIELD_INVALID('Address') })
  @Length(1, 140, { message: FIELD_INVALID('Address') })
  @IsNotEmpty({ message: ADDRESS_MANDATORY })
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
  @IsNotEmpty({ message: ORGANISATION_TYPE_MANDATORY })
  @IsString({ message: ORGANISATION_TYPE_MANDATORY })
  organisation_type: string;

  constructor(organisation_type: string) {
    this.organisation_type = organisation_type;
  }
}

class ValidationBusinessRegistrationNumberCriteria {
  @IsNotEmpty({ message: BUSINESS_REGISTRATION_NUMBER_MANDATORY })
  @IsString({ message: FIELD_INVALID('Business Registration Number') })
  @Length(1, 140, {
    message: FIELD_INVALID('Business Registration Number')
  })
  business_registration_number: string;

  constructor(business_registration_number: string) {
    this.business_registration_number = business_registration_number;
  }
}

class ValidationSubsidiaryCompanyCriteria {
  @IsString({ message: FIELD_INVALID('Subsidiary Company') })
  @IsOptional()
  @Length(1, 140, { message: FIELD_INVALID('Subsidiary Company') })
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
  @Length(1, 140, { message: FIELD_INVALID('Member of Business Name') })
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
    message: FIELD_INVALID('Ultimate Beneficiary Name')
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
  @IsNotEmpty({ message: CITY_MANDATORY })
  city: string;

  constructor(city: string) {
    this.city = city;
  }
}

class ValidationStateCriteria {
  @IsString({ message: FIELD_INVALID('State') })
  @Length(1, 140, { message: FIELD_INVALID('State') })
  @IsNotEmpty({ message: STATE_MANDATORY })
  state: string;

  constructor(state: string) {
    this.state = state;
  }
}

class ValidationPincodeCriteria {
  // TODO: commenting the extra condition will take decision in future if we required them
  @IsNotEmpty({ message: PINCODE_MANDATORY })
  pincode: string;

  constructor(pincode: string) {
    this.pincode = pincode;
  }
}

class ValidationPANCriteria {
  @IsString({ message: FIELD_INVALID('Company PAN') })
  @IsNotEmpty({ message: COMPANY_PAN_NUMBER_MANDATORY })
  @IsAlphanumeric(undefined, { message: FIELD_INVALID('Company PAN') })
  @MinLength(10, { message: FIELD_INVALID('Company PAN') })
  @Matches(PAN_MATCH, {
    message: FIELD_INVALID('Company PAN')
  })
  company_pan_number: string;

  constructor(company_pan_number: string) {
    this.company_pan_number = company_pan_number;
  }
}

class ValidationGSTCriteria {
  @Matches(GST_NUMBER_REGEX, {
    message: FIELD_INVALID('GST Number')
  })
  @IsString({ message: FIELD_INVALID('GST Number') })
  @IsNotEmpty({ message: GST_NUMBER_MANDATORY })
  @Length(1, 140, { message: FIELD_INVALID('GST Number') })
  gst_number: string;

  constructor(gst_number: string) {
    this.gst_number = gst_number;
  }
}

class ValidationisMsmeRegisteredCriteria {
  @IsBoolean({ message: MSME_REGISTERED_INVALID })
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
  @Length(12, 12, { message: FIELD_INVALID('MSME Registration Number') })
  msme_registration_number: string;

  constructor(msme_registration_number: string) {
    this.msme_registration_number = msme_registration_number;
  }
}
class ValidationVATCriteria {
  @IsString({ message: FIELD_INVALID('VAT Number') })
  @IsNotEmpty({ message: VAT_NUMBER_MANDATORY })
  @Length(5, 15, { message: FIELD_INVALID('VAT Number') })
  vat_number: string;

  constructor(vat_number: string) {
    this.vat_number = vat_number;
  }
}
class ValidationFAXCriteria {
  @IsString({ message: FIELD_INVALID('FAX Number') })
  @IsOptional()
  @Length(5, 25, { message: FIELD_INVALID('Fax Number') })
  fax_number: string;

  constructor(fax_number: string) {
    this.fax_number = fax_number;
  }
}

class ValidationAddressLineCriteria {
  @IsString({ message: FIELD_INVALID('Address') })
  @IsOptional()
  @Length(1, 140, { message: FIELD_INVALID('Address Line 2') })
  address_line_2: string;

  constructor(address_line_2: string) {
    this.address_line_2 = address_line_2;
  }
}

class ValidationOwnershipPercentageCriteria {
  //TODO:validator for it
  @IsOptional()
  @IsNumber({}, { message: FIELD_INVALID('Ownership Percentage') })
  @Min(0, { message: FIELD_INVALID('Ownership Percentage') })
  @Max(100, { message: FIELD_INVALID('Ownership Percentage') })
  ownership_percentage: number;

  constructor(ownership_percentage: number) {
    this.ownership_percentage = ownership_percentage;
  }
}

class ValidationFederalTaxCriteria {
  @IsString({ message: FIELD_INVALID('Federal Tax ID') })
  @IsNotEmpty({ message: FEDERAL_TAX_ID_MANDATORY })
  @Length(1, 140, { message: FIELD_INVALID('Federal Tax ID') })
  federal_tax_id: string;

  constructor(federal_tax_id: string) {
    this.federal_tax_id = federal_tax_id;
  }
}
class ValidationIsAntiMoneyCriteria {
  @IsBoolean({ message: ANTI_MONEY_LAUNDERING_INVALID })
  @IsNotEmpty({ message: IS_ANTI_MONEY_LAUNDERING })
  is_anti_money_laundering: boolean;

  constructor(is_anti_money_laundering: boolean) {
    this.is_anti_money_laundering = is_anti_money_laundering;
  }
}
class ValidationAntiMoneyPolicyNameCriteria {
  @ValidateIf(object => object?.is_anti_money_laundering === false)
  @IsString({
    message: 'Reason for No Anti-Money Laundering Policy is Required.'
  })
  @IsNotEmpty({
    message: 'Reason for No Anti-Money Laundering Policy is Required.'
  })
  @Length(1, 140, {
    message: FIELD_INVALID(
      'Reason for No Anti-Money Laundering Policy is Required.'
    )
  })
  @Matches(NAME_REGEX, {
    message: 'Reason for No Anti-Money Laundering Policy is Required.'
  })
  no_anti_money_laundering_policy_reason: string;

  constructor(no_anti_money_laundering_policy_reason: string) {
    this.no_anti_money_laundering_policy_reason =
      no_anti_money_laundering_policy_reason;
  }
}
