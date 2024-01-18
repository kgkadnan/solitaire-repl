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
  GST_NUMBER_REGEX,
  NAME_REGEX,
  PAN_MATCH
} from '@/constants/validation-regex/regex';
import {
  IsString,
  IsNotEmpty,
  ArrayNotEmpty,
  IsBoolean,
  ValidateIf,
  IsOptional,
  Matches,
  IsAlphanumeric,
  Length,
  IsNumberString,
  IsEmail,
  IsNumber,
  Min,
  Max
} from 'class-validator';

export class KycPostCompanyDetailsValidation {
  @IsNotEmpty({ message: COMPANY_NAME_MANDATORY })
  @IsString({ message: FIELD_INVALID('Company Name') })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Company Name')
  })
  @Length(1, 140, {
    message: FIELD_INVALID('Company Name')
  })
  company_name: string;

  @IsNotEmpty({ message: YEAR_OF_ESTABLISHMENT_MANDATORY })
  @IsNumberString({}, { message: FIELD_INVALID('Year of Establishment') })
  @Length(4, 4, { message: FIELD_INVALID('Year of Establishment') })
  year_of_establishment: string;

  @IsNotEmpty({ message: COMPANY_PHONE_NUMBER_MANDATORY })
  @IsNumberString({}, { message: FIELD_INVALID('Company Phone Number') })
  company_phone_number: string;

  @IsNotEmpty({ message: COMPANY_EMAIL_MANDATORY })
  @IsEmail({}, { message: FIELD_INVALID('Company Email') })
  company_email: string;

  @ArrayNotEmpty({ message: BUSINESS_TYPE_MANDATORY })
  business_type: string[];

  @ArrayNotEmpty({ message: INDUSTRY_TYPE_MANDATORY })
  industry_type: string[];

  @IsNotEmpty({ message: ORGANISATION_TYPE_MANDATORY })
  @IsString({ message: ORGANISATION_TYPE_MANDATORY })
  @Length(1, 140, { message: FIELD_INVALID('Organisation Type') })
  organisation_type: string;

  @IsNotEmpty({ message: BUSINESS_REGISTRATION_NUMBER_MANDATORY })
  @IsString({ message: FIELD_INVALID('Business Registration Number') })
  @Length(1, 140, {
    message: FIELD_INVALID('Business Registration Number')
  })
  business_registration_number: string;

  @IsOptional()
  @Length(1, 140, { message: 'Subsidiary Company Name is Invalid.' })
  subsidiary_company: string;

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
  @Length(1, 140, { message: FIELD_INVALID('Member of Business Name') })
  member_of_business_name: string;

  @IsNotEmpty({ message: ULTIMATE_BENEFICIARY_NAME_MANDATORY })
  @Length(1, 140, {
    message: FIELD_INVALID('Ultimate Beneficiary Name')
  })
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
    ultimate_beneficiary_name: string,
    subsidiary_company: string
  ) {
    this.company_name = company_name;
    this.year_of_establishment = year_of_establishment;
    this.company_phone_number = company_phone_number;
    this.company_email = company_email;
    this.business_type = business_type;
    this.industry_type = industry_type;
    this.subsidiary_company = subsidiary_company;
    this.organisation_type = organisation_type;
    this.business_registration_number = business_registration_number;
    this.is_member_of_business = is_member_of_business;
    this.member_of_business_name = member_of_business_name;
    this.ultimate_beneficiary_name = ultimate_beneficiary_name;
  }
}

export class IndiaKycPostCompanyDetailsValidation extends KycPostCompanyDetailsValidation {
  @Length(1, 140, { message: FIELD_INVALID('City Name') })
  @IsString({ message: FIELD_INVALID('City') })
  @IsNotEmpty({ message: CITY_MANDATORY })
  city: string;

  @IsString({ message: FIELD_INVALID('Address') })
  @Length(1, 140, { message: FIELD_INVALID('Address') })
  @IsNotEmpty({ message: ADDRESS_MANDATORY })
  address: string;

  @IsString({ message: FIELD_INVALID('State') })
  @Length(1, 140, { message: FIELD_INVALID('State') })
  @IsNotEmpty({ message: STATE_MANDATORY })
  state: string;

  @IsNotEmpty({ message: PINCODE_MANDATORY })
  pincode: string;

  @Matches(PAN_MATCH, { message: FIELD_INVALID('PAN Number') })
  @IsNotEmpty({ message: COMPANY_PAN_NUMBER_MANDATORY })
  @IsAlphanumeric(undefined, { message: FIELD_INVALID('PAN Number') })
  company_pan_number: string;

  @Matches(GST_NUMBER_REGEX, { message: FIELD_INVALID('GST Number') })
  @IsNotEmpty({ message: GST_NUMBER_MANDATORY })
  gst_number: string;

  @IsBoolean({ message: MSME_REGISTERED_INVALID })
  is_msme_registered: boolean = false;

  @ValidateIf(object => object?.is_msme_registered === true)
  @IsString({
    message: MSME_TYPE_INVALID
  })
  @IsNotEmpty({ message: MSME_TYPE_MANDATORY })
  @Length(1, 140, { message: FIELD_INVALID('MSME Type') })
  msme_type: string;

  @ValidateIf(object => object?.is_msme_registered === true)
  @IsString({
    message: MSME_REGISTRATION_NUMBER_INVALID
  })
  @Length(12, 12, { message: FIELD_INVALID('MSME Registration Number') })
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
    subsidiary_company: string,
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
      subsidiary_company,
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
  @IsString({ message: FIELD_INVALID('VAT Number') })
  @IsNotEmpty({ message: VAT_NUMBER_MANDATORY })
  @Length(5, 15, { message: FIELD_INVALID('VAT Number') })
  vat_number: string;

  @IsString({ message: FIELD_INVALID('FAX Number') })
  @IsOptional()
  @Length(5, 25, { message: FIELD_INVALID('Fax Number') })
  fax_number: string;

  @Length(1, 140, { message: FIELD_INVALID('Address Line 1') })
  @IsNotEmpty({ message: ADDRESS_MANDATORY })
  address_line_1: string;

  @Length(1, 140, { message: FIELD_INVALID('Address Line 2') })
  @IsOptional()
  address_line_2: string;

  //TODO:validator for it
  @IsOptional()
  @IsNumber({}, { message: FIELD_INVALID('Ownership Percentage') })
  @Min(0, { message: FIELD_INVALID('Ownership Percentage') })
  @Max(100, { message: FIELD_INVALID('Ownership Percentage') })
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
    subsidiary_company: string,
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
      subsidiary_company,
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
  @IsString({ message: FIELD_INVALID('Federal Tax ID') })
  @IsNotEmpty({ message: FEDERAL_TAX_ID_MANDATORY })
  @Length(1, 140, { message: FIELD_INVALID('Federal Tax ID') })
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
    subsidiary_company: string,
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
      subsidiary_company,
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
