import {
  IsAlpha,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  MinLength,
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
      instance = new ValidationCountryCodeCriteria(fieldValue);

      break;

    //   case 'company_name':
    //     instance = new ValidationCompanyNameCriteria(fieldValue);
    //     break;
    // case 'year_of_establishment':
    //     instance = new ValidationYearOfEstablishmentCriteria(fieldValue);
    //     break;
    // case 'address':
    //     instance = new ValidationAddressCriteria(fieldValue);
    //     break;
    // case 'company_phone_number':
    //     instance = new ValidationCompanyPhoneNumberCriteria(fieldValue);
    //     break;
    // case 'company_email':
    //     instance = new ValidationCompanyEmailCriteria(fieldValue);
    //     break;
    // case 'business_type':
    //     instance = new ValidationBusinessTypeCriteria(fieldValue);
    //     break;
    // case 'industry_type':
    //     instance = new ValidationIndustryTypeCriteria(fieldValue);
    //     break;
    // case 'organisation_type':
    //     instance = new ValidationOrganisationTypeCriteria(fieldValue);
    //     break;
    // case 'business_registration_number':
    //     instance = new ValidationBusinessRegistrationNumberCriteria(fieldValue);
    //     break;
    // case 'subsidiary_company':
    //     instance = new ValidationSubsidiaryCompanyCriteria(fieldValue);
    //     break;
    // case 'is_member_of_business':
    //     instance = new ValidationIsMemberOfBusinessCriteria(fieldValue);
    //     break;
    // case 'member_of_business_name':
    //     instance = new ValidationMemberOfBusinessNameCriteria(fieldValue);
    //     break;
    // case 'ultimate_beneficiary_name':
    //     instance = new ValidationUltimateBeneficiaryNameCriteria(fieldValue);
    //     break;
    // case 'city':
    //     instance = new ValidationCityCriteria(fieldValue);
    //     break;
    // case 'state':
    //     instance = new ValidationStateCriteria(fieldValue);
    //     break;

    //     case 'pincode':
    //         instance = new ValidationPincodeCriteria(fieldValue);
    //         break;
    //     case 'company_pan_number':
    //         instance = new ValidationCompanyPANNumberCriteria(fieldValue);
    //         break;
    //     case 'gst_number':
    //         instance = new ValidationGSTNumberCriteria(fieldValue);
    //         break;
    //     case 'is_msme_registered':
    //         instance = new ValidationIsMSMERegisteredCriteria(fieldValue);
    //         break;
    //     case 'msme_type':
    //         instance = new ValidationMSMETypeCriteria(fieldValue);
    //         break;
    //     case 'msme_registration_number':
    //         instance = new ValidationMSMERegistrationNumberCriteria(fieldValue);
    //         break;
    //     case 'vat_number':
    //         instance = new ValidationVATNumberCriteria(fieldValue);
    //         break;
    //     case 'fax_number':
    //         instance = new ValidationFaxNumberCriteria(fieldValue);
    //         break;
    //     case 'ownership_percentage':
    //         instance = new ValidationOwnershipPercentageCriteria(fieldValue);
    //         break;
    //     case 'federal_tax_id':
    //         instance = new ValidationFederalTaxIDCriteria(fieldValue);
    //         break;
    //     case 'is_anti_money_laundering':
    //         instance = new ValidationIsAntiMoneyLaunderingCriteria(fieldValue);
    //         break;
    //     case 'anti_money_laundering_policy_name':
    //         instance = new ValidationAntiMoneyLaunderingPolicyNameCriteria(fieldValue);
    //         break;

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
