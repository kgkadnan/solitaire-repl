import {
  IsString,
  IsNotEmpty,
  ArrayNotEmpty,
  IsBoolean,
  ValidateIf,
  IsOptional
} from 'class-validator';

export class KycPostCompanyDetailsValidation {
  @IsNotEmpty({ message: 'Company name is required' })
  company_name: string;

  @IsNotEmpty({ message: 'Year of establishment is required' })
  year_of_establishment: string;

  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsNotEmpty({ message: 'Company phone number is required' })
  company_phone_number: string;

  @IsNotEmpty({ message: 'Company email is required' })
  company_email: string;

  @ArrayNotEmpty({ message: 'Business type array must not be empty' })
  business_type: string[];

  @ArrayNotEmpty({ message: 'Industry type array must not be empty' })
  industry_type: string[];

  @IsNotEmpty({ message: 'Organisation type is required' })
  organisation_type: string;

  @IsNotEmpty({ message: 'Business registration number is required' })
  business_registration_number: string;

  @IsBoolean({
    message:
      'Member of any Business Organisation / Council check must be a boolean'
  })
  @IsNotEmpty({
    message: 'Member of any Business Organisation / Council check is required'
  })
  is_member_of_business: boolean = false;

  @ValidateIf((object, value) => object.is_member_of_business === value)
  @IsNotEmpty({ message: 'Member of business name must be provided' })
  @IsString({ message: 'Member of business name must be a string' })
  member_of_business_name: string;

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
    organisation_type: string,
    business_registration_number: string,
    is_member_of_business: boolean,
    member_of_business_name: string,
    ultimate_beneficiary_name: string
  ) {
    this.company_name = company_name;
    this.year_of_establishment = year_of_establishment;
    this.address = address;
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
  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @IsNotEmpty({ message: 'State is required' })
  state: string;

  @IsNotEmpty({ message: 'Pincode is required' })
  pincode: string;

  @IsNotEmpty({ message: 'Company PAN number is required' })
  company_pan_number: string;

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
    organisation_type: string,
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
  @IsNotEmpty({ message: 'VAT number is required' })
  vat_number: string;

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
    organisation_type: string,
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
    organisation_type: string,
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
