import {
  COMPANY_NAME_MANDATORY,
  YEAR_OF_ESTABLISHMENT_MANDATORY,
  ADDRESS_MANDATORY,
  BUSINESS_TYPE_MANDATORY,
  COMPANY_EMAIL_MANDATORY,
  COMPANY_PHONE_NUMBER_MANDATORY,
  INDUSTRY_TYPE_MANDATORY,
  BUSINESS_REGISTRATION_NUMBER_MANDATORY,
  MEMBER_CHECK_MANDATORY,
  ORGANISATION_TYPE_MANDATORY,
  ULTIMATE_BENEFICIARY_NAME_MANDATORY,
  MEMBER_NAME_MANDATORY,
  CITY_MANDATORY,
  COMPANY_PAN_NUMBER_MANDATORY,
  GST_NUMBER_MANDATORY,
  MSME_REGISTRATION_NUMBER_MANDATORY,
  MSME_TYPE_MANDATORY,
  PINCODE_MANDATORY,
  STATE_MANDATORY,
  VAT_NUMBER_MANDATORY,
  ANTI_MONEY_LAUNDERING_POLICY_NAME_MANDATORY,
  FEDERAL_TAX_ID_MANDATORY,
  ANTI_MONEY_LAUNDERING_POLICY_NAME_INVALID,
  ANTI_MONEY_LAUNDERING_INVALID,
  MSME_REGISTERED_INVALID,
  MSME_REGISTRATION_NUMBER_INVALID,
  MSME_TYPE_INVALID,
  MEMBER_BUSINESS_INVALID,
  MEMBER_NAME_INVALID,
  FIELD_INVALID
} from '@/constants/error-messages/kyc';
import {
  IsString,
  IsNotEmpty,
  ArrayNotEmpty,
  IsBoolean,
  ValidateIf,
  IsOptional,
  Matches,
  IsAlphanumeric,
  MinLength
} from 'class-validator';

export class KycPostCompanyDetailsValidation {
  @IsNotEmpty({ message: COMPANY_NAME_MANDATORY })
  company_name: string;

  @IsNotEmpty({ message: YEAR_OF_ESTABLISHMENT_MANDATORY })
  year_of_establishment: string;

  @IsNotEmpty({ message: COMPANY_PHONE_NUMBER_MANDATORY })
  company_phone_number: string;

  @IsNotEmpty({ message: COMPANY_EMAIL_MANDATORY })
  company_email: string;

  @ArrayNotEmpty({ message: BUSINESS_TYPE_MANDATORY })
  business_type: string[];

  @ArrayNotEmpty({ message: INDUSTRY_TYPE_MANDATORY })
  industry_type: string[];

  @IsNotEmpty({ message: ORGANISATION_TYPE_MANDATORY })
  organisation_type: string;

  @IsNotEmpty({ message: BUSINESS_REGISTRATION_NUMBER_MANDATORY })
  business_registration_number: string;

  @IsBoolean({
    message: MEMBER_BUSINESS_INVALID
  })
  @IsNotEmpty({
    message: MEMBER_CHECK_MANDATORY
  })
  is_member_of_business: boolean = false;

  @ValidateIf((object, value) => object.is_member_of_business === value)
  @IsNotEmpty({ message: MEMBER_NAME_MANDATORY })
  @IsString({ message: MEMBER_NAME_INVALID })
  member_of_business_name: string;

  @IsNotEmpty({ message: ULTIMATE_BENEFICIARY_NAME_MANDATORY })
  ultimate_beneficiary_name: string;

  constructor(
    company_name: string,
    year_of_establishment: string,
    company_phone_number: string,
    company_email: string,
    business_type: string[],
    industry_type: string[],
    organisation_type: string,
    business_registration_number: string,
    is_member_of_business: boolean,
    member_of_business_name: string,
    ultimate_beneficiary_name: string
  ) {
    this.company_name = company_name;
    this.year_of_establishment = year_of_establishment;
    this.company_phone_number = company_phone_number;
    this.company_email = company_email;
    this.business_type = business_type;
    this.industry_type = industry_type;
    this.organisation_type = organisation_type;
    this.business_registration_number = business_registration_number;
    this.is_member_of_business = is_member_of_business;
    this.member_of_business_name = member_of_business_name;
    this.ultimate_beneficiary_name = ultimate_beneficiary_name;
  }
}

export class IndiaKycPostCompanyDetailsValidation extends KycPostCompanyDetailsValidation {
  @IsNotEmpty({ message: CITY_MANDATORY })
  city: string;

  @IsNotEmpty({ message: ADDRESS_MANDATORY })
  address: string;

  @IsNotEmpty({ message: STATE_MANDATORY })
  state: string;

  @IsNotEmpty({ message: PINCODE_MANDATORY })
  pincode: string;

  @Matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, { message: FIELD_INVALID('PAN Number') })
  @IsNotEmpty({ message: COMPANY_PAN_NUMBER_MANDATORY })
  @IsAlphanumeric()
  @MinLength(10)
  company_pan_number: string;

  @IsNotEmpty({ message: GST_NUMBER_MANDATORY })
  gst_number: string;

  @IsBoolean({ message: MSME_REGISTERED_INVALID })
  @IsOptional()
  is_msme_registered: boolean = false;

  @ValidateIf(object => object?.is_msme_registered === true)
  @IsString({
    message: MSME_TYPE_INVALID
  })
  @IsNotEmpty({ message: MSME_TYPE_MANDATORY })
  msme_type: string;

  @ValidateIf(object => object?.is_msme_registered === true)
  @IsString({
    message: MSME_REGISTRATION_NUMBER_INVALID
  })
  @IsNotEmpty({
    message: MSME_REGISTRATION_NUMBER_MANDATORY
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
    organisation_type: string,
    business_registration_number: string,
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
      company_phone_number,
      company_email,
      business_type,
      industry_type,
      organisation_type,
      business_registration_number,
      is_member_of_business,
      member_of_business_name,
      ultimate_beneficiary_name
    );
    this.city = city;
    this.state = state;
    this.address = address;
    this.pincode = pincode;
    this.company_pan_number = company_pan_number;
    this.gst_number = gst_number;
    this.is_msme_registered = is_msme_registered;
    this.msme_type = msme_type;
    this.msme_registration_number = msme_registration_number;
  }
}

export class BelgiumKycPostCompanyDetailsValidation extends KycPostCompanyDetailsValidation {
  @IsNotEmpty({ message: VAT_NUMBER_MANDATORY })
  vat_number: string;

  @IsOptional()
  fax_number: string;

  @IsNotEmpty({ message: ADDRESS_MANDATORY })
  address_line_1: string;

  @IsOptional()
  address_line_2: string;

  //TODO:validator for it
  @IsOptional()
  ownership_percentage: number;

  constructor(
    company_name: string,
    year_of_establishment: string,
    address_line_1: string,
    address_line_2: string,
    company_phone_number: string,
    company_email: string,
    business_type: string[],
    industry_type: string[],
    organisation_type: string,
    business_registration_number: string,
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
      company_phone_number,
      company_email,
      business_type,
      industry_type,
      organisation_type,
      business_registration_number,
      is_member_of_business,
      member_of_business_name,
      ultimate_beneficiary_name
    );
    this.vat_number = vat_number;
    this.address_line_1 = address_line_1;
    this.address_line_2 = address_line_2;
    this.fax_number = fax_number;
    this.ownership_percentage = ownership_percentage;
  }
}

export class UsaKycPostCompanyDetailsValidation extends BelgiumKycPostCompanyDetailsValidation {
  @IsNotEmpty({ message: FEDERAL_TAX_ID_MANDATORY })
  federal_tax_id: string;

  @IsBoolean({ message: ANTI_MONEY_LAUNDERING_INVALID })
  @IsOptional()
  is_anti_money_laundering: boolean = false;

  @ValidateIf(object => object?.is_anti_money_laundering === true)
  @IsString({
    message: ANTI_MONEY_LAUNDERING_POLICY_NAME_INVALID
  })
  @IsNotEmpty({
    message: ANTI_MONEY_LAUNDERING_POLICY_NAME_MANDATORY
  })
  no_anti_money_laundering_policy_reason: string;

  constructor(
    company_name: string,
    year_of_establishment: string,
    address_line_1: string,
    address_line_2: string,
    company_phone_number: string,
    company_email: string,
    business_type: string[],
    industry_type: string[],
    organisation_type: string,
    business_registration_number: string,
    is_member_of_business: boolean,
    member_of_business_name: string,
    ultimate_beneficiary_name: string,
    vat_number: string,
    fax_number: string,
    ownership_percentage: number,
    federal_tax_id: string,
    is_anti_money_laundering: boolean,
    no_anti_money_laundering_policy_reason: string
  ) {
    super(
      company_name,
      address_line_1,
      address_line_2,
      year_of_establishment,
      company_phone_number,
      company_email,
      business_type,
      industry_type,
      organisation_type,
      business_registration_number,
      is_member_of_business,
      member_of_business_name,
      ultimate_beneficiary_name,
      vat_number,
      fax_number,
      ownership_percentage
    );
    this.federal_tax_id = federal_tax_id;
    this.is_anti_money_laundering = is_anti_money_laundering;
    this.no_anti_money_laundering_policy_reason =
      no_anti_money_laundering_policy_reason;
  }
}
