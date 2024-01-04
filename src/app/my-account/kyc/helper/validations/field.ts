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
  @MinLength(3, { message: 'First name must be at least 3 characters long' })
  @IsAlpha()
  first_name: string;

  constructor(first_name: string) {
    this.first_name = first_name;
  }
}

class ValidationLastNameCriteria {
  @MinLength(3, { message: 'Last name must be at least 3 characters long' })
  @IsAlpha()
  last_name: string;

  constructor(last_name: string) {
    this.last_name = last_name;
  }
}

class ValidationEmailCriteria {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

class ValidationCountryCodeCriteria {
  @IsNotEmpty({ message: 'Invalid phone country code!' })
  country_code: string;

  constructor(country_code: string) {
    this.country_code = country_code;
  }
}

class ValidationPhoneCriteria {
  @MinLength(3, { message: 'Invalid phone!' })
  @IsMobilePhone()
  phone: string;

  constructor(phone: string) {
    this.phone = phone;
  }
}

//bank details
class ValidationBankNameCriteria {
  @IsString({ message: 'Bank name must be a string' })
  bank_name: string;

  constructor(bank_name: string) {
    this.bank_name = bank_name;
  }
}

class ValidationAccountHolderNameCriteria {
  @IsString({ message: 'Account holder name must be a string' })
  account_holder_name: string;

  constructor(account_holder_name: string) {
    this.account_holder_name = account_holder_name;
  }
}

class ValidationAccountNumberCriteria {
  @IsString({ message: 'Account number must be a string' })
  @Matches(/^[0-9a-zA-Z]+$/, {
    message: 'Account number must contain only alphanumeric characters'
  })
  account_number: string;

  constructor(account_number: string) {
    this.account_number = account_number;
  }
}

class ValidationBankAddressCriteria {
  @IsString({ message: 'Bank address must be a string' })
  @IsOptional()
  bank_address: string;

  constructor(bank_address: string) {
    this.bank_address = bank_address;
  }
}
class ValidationIFSCCriteria {
  @IsString({ message: 'IFSC code must be a string' })
  @IsNotEmpty({ message: 'IFSC code is required' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'IFSC code must contain only alphanumeric characters'
  })
  @Length(8, 11, {
    message: 'IFSC code must be between 8 and 11 characters long'
  })
  ifsc_code: string;

  constructor(ifsc_code: string) {
    this.ifsc_code = ifsc_code;
  }
}

class ValidationSwitfCriteria {
  @IsString({ message: 'SWIFT code must be a string' })
  @IsNotEmpty({ message: 'SWIFT code is required' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'SWIFT code must contain only alphanumeric characters'
  })
  @Length(8, 11, {
    message: 'SWIFT code must be between 8 and 11 characters long'
  })
  swift_code: string;

  constructor(swift_code: string) {
    this.swift_code = swift_code;
  }
}

///company owner details

class ValidationOwnerNameCriteria {
  @MinLength(3)
  @IsNotEmpty()
  owner_full_name: string;

  constructor(owner_full_name: string) {
    this.owner_full_name = owner_full_name;
  }
}
class ValidationPanCriteria {
  @MinLength(10)
  @IsAlphanumeric()
  owner_pan_number: string;

  constructor(owner_pan_number: string) {
    this.owner_pan_number = owner_pan_number;
  }
}

///company details

class ValidationCompanyNameCriteria {
  @IsString({ message: 'Company name must be a string' })
  company_name: string;

  constructor(company_name: string) {
    this.company_name = company_name;
  }
}

class ValidationYearOfEstablishmentCriteria {
  @IsNumberString(
    {},
    { message: 'Year of establishment must be a valid number' }
  )
  year_of_establishment: string;

  constructor(year_of_establishment: string) {
    this.year_of_establishment = year_of_establishment;
  }
}
class ValidationAddressCriteria {
  @IsString({ message: 'Address must be a string' })
  address: string;

  constructor(address: string) {
    this.address = address;
  }
}

class ValidationBusinessTypeCriteria {
  @ArrayNotEmpty({ message: 'Business type array must not be empty' })
  business_type: string[];

  constructor(business_type: string[]) {
    this.business_type = business_type;
  }
}
class ValidationIndustryTypeCriteria {
  @ArrayNotEmpty({ message: 'Industry type array must not be empty' })
  industry_type: string[];

  constructor(industry_type: string[]) {
    this.industry_type = industry_type;
  }
}
class ValidationOrganisationTypeCriteria {
  @IsString({ message: 'Organisation name is required' })
  organisation_type: string;

  constructor(organisation_type: string) {
    this.organisation_type = organisation_type;
  }
}

class ValidationBusinessRegistrationNumberCriteria {
  @IsString({ message: 'Business registration number must be a string' })
  @IsNotEmpty({ message: 'Business registration number is required' })
  business_registration_number: string;

  constructor(business_registration_number: string) {
    this.business_registration_number = business_registration_number;
  }
}

class ValidationSubsidiaryCompanyCriteria {
  @IsString({ message: 'Subsidiary company must be a string' })
  subsidiary_company: string;

  constructor(subsidiary_company: string) {
    this.subsidiary_company = subsidiary_company;
  }
}

class ValidationIsMemberCriteria {
  @IsBoolean({
    message:
      'Member of any Business Organisation / Council check must be a boolean'
  })
  @IsNotEmpty({
    message: 'Member of any Business Organisation / Council check is required'
  })
  is_member_of_business: boolean;

  constructor(is_member_of_business: boolean) {
    this.is_member_of_business = is_member_of_business;
  }
}

class ValidationMemberNameCriteria {
  @ValidateIf((object, value) => object.is_member_of_business === value)
  @IsNotEmpty({ message: 'Member of business name must be provided' })
  @IsString({ message: 'Member of business name must be a string' })
  member_of_business_name: string;

  constructor(member_of_business_name: string) {
    this.member_of_business_name = member_of_business_name;
  }
}

class ValidationUltimateBeneficiaryNameCriteria {
  @IsString({ message: 'Ultimate beneficiary name must be a string' })
  @IsNotEmpty({ message: 'Ultimate beneficiary name is required' })
  ultimate_beneficiary_name: string;

  constructor(ultimate_beneficiary_name: string) {
    this.ultimate_beneficiary_name = ultimate_beneficiary_name;
  }
}

class ValidationCityCriteria {
  @IsString({ message: 'City must be a string' })
  @IsNotEmpty({ message: 'City is required' })
  city: string;

  constructor(city: string) {
    this.city = city;
  }
}

class ValidationStateCriteria {
  @IsString({ message: 'State must be a string' })
  @IsNotEmpty({ message: 'State is required' })
  state: string;

  constructor(state: string) {
    this.state = state;
  }
}

class ValidationPincodeCriteria {
  // TODO: commenting the extra condition will take decision in future if we required them
  // @IsNumberString({}, { message: 'Pincode must be a valid number' })
  // @Length(6, 6, { message: 'Pincode must be 6 digits long' })
  @IsNotEmpty({ message: 'Pincode is required' })
  pincode: string;

  constructor(pincode: string) {
    this.pincode = pincode;
  }
}

class ValidationPANCriteria {
  @IsString({ message: 'Company PAN number must be a string' })
  @IsNotEmpty({ message: 'Company PAN number is required' })
  company_pan_number: string;

  constructor(company_pan_number: string) {
    this.company_pan_number = company_pan_number;
  }
}

class ValidationGSTCriteria {
  @IsString({ message: 'GST number must be a string' })
  @IsNotEmpty({ message: 'GST number is required' })
  gst_number: string;

  constructor(gst_number: string) {
    this.gst_number = gst_number;
  }
}

class ValidationisMsmeRegisteredCriteria {
  @IsBoolean({ message: 'Registered under MSME Act must be a boolean' })
  @IsOptional()
  is_msme_registered: boolean;

  constructor(is_msme_registered: boolean) {
    this.is_msme_registered = is_msme_registered;
  }
}
class ValidationMSMETypeCriteria {
  @ValidateIf((object, value) => object?.is_msme_registered === value)
  @IsString({
    message: 'MSME type must be a non-empty when MSME is registered'
  })
  @IsNotEmpty({ message: 'MSME type is required when MSME is registered' })
  msme_type: string;

  constructor(msme_type: string) {
    this.msme_type = msme_type;
  }
}
class ValidationMSMENumberCriteria {
  @ValidateIf((object, value) => object?.is_msme_registered === value)
  @IsString({
    message:
      'MSME registration number must be a non-empty when MSME is registered'
  })
  @IsNotEmpty({
    message: 'MSME registration number is required when MSME is registered'
  })
  msme_registration_number: string;

  constructor(msme_registration_number: string) {
    this.msme_registration_number = msme_registration_number;
  }
}
class ValidationVATCriteria {
  @IsString({ message: 'VAT number must be a string' })
  @IsNotEmpty({ message: 'VAT number is required' })
  vat_number: string;

  constructor(vat_number: string) {
    this.vat_number = vat_number;
  }
}
class ValidationFAXCriteria {
  @IsString({ message: 'Fax number must be a string' })
  @IsOptional()
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
  @IsString({ message: 'Federal tax ID must be a string' })
  @IsNotEmpty({ message: 'Federal tax ID is required' })
  federal_tax_id: string;

  constructor(federal_tax_id: string) {
    this.federal_tax_id = federal_tax_id;
  }
}
class ValidationIsAntiMoneyCriteria {
  @IsBoolean({ message: 'Registered under MSME Act must be a boolean' })
  @IsOptional()
  is_anti_money_laundering: boolean;

  constructor(is_anti_money_laundering: boolean) {
    this.is_anti_money_laundering = is_anti_money_laundering;
  }
}
class ValidationAntiMoneyPolicyNameCriteria {
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

  constructor(anti_money_laundering_policy_name: string) {
    this.anti_money_laundering_policy_name = anti_money_laundering_policy_name;
  }
}
