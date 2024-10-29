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
  FIELD_INVALID,
  IS_ANTI_MONEY_LAUNDERING,
  RANGE_VALIDATION
} from '@/constants/error-messages/kyc';
import {
  GST_NUMBER_REGEX,
  NAME_REGEX,
  PAN_MATCH,
  PHONE_REGEX
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
  MinLength,
  IsNumber,
  Min,
  Max,
  IsEmail,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';

// Custom validation constraint class
@ValidatorConstraint({ name: 'custom', async: false })
export class OrganisationTypeValidator implements ValidatorConstraintInterface {
  validate(value: any, _args: ValidationArguments) {
    // Check if the value is exactly 'Other'
    return value !== 'Other';
  }

  defaultMessage(_args: ValidationArguments) {
    return ORGANISATION_TYPE_MANDATORY;
  }
}

// Decorator function to use the custom validation constraint
export function IsNotOther(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: OrganisationTypeValidator // Use the custom validator constraint
    });
  };
}

// Custom validation constraint class
@ValidatorConstraint({ name: 'custom', async: false })
export class ArrayOfArraysValidator implements ValidatorConstraintInterface {
  defaultMessage(args: ValidationArguments) {
    // Get the error message passed as an argument
    return args.constraints[0];
  }

  // Validate method remains the same
  validate(value: any[], _args: ValidationArguments) {
    // if (!Array.isArray(value) || value.some(item => !Array.isArray(item))) return false; // Not an array of arrays

    // if (value.some(innerArray => innerArray.length < 2)) return false; // If any inner array doesn't have at least two elements, return false/

    if (
      value &&
      value.some(
        innerArray => innerArray[0] === 'Other' && innerArray[1] === ''
      )
    )
      return false; // If any inner array has first element as 'Other' and second element as empty string, return false

    return true; // Otherwise, return true indicating validation success
  }
}

// Decorator function to use the custom validation constraint
export function IsArrayOfArraysValid(
  errorMessage: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [errorMessage], // Pass the error message as a constraint
      validator: ArrayOfArraysValidator // Use the custom validator constraint
    });
  };
}

function IsNotFutureYear(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotFutureYear',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          const currentYear = new Date().getFullYear();
          const enteredYear = parseInt(value, 10);
          return enteredYear <= currentYear;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must not be a future year`;
        }
      }
    });
  };
}

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
  @IsNotFutureYear({
    message: FIELD_INVALID('Year of Establishment')
  })
  year_of_establishment: string;

  @IsNotEmpty({ message: COMPANY_PHONE_NUMBER_MANDATORY })
  @Matches(PHONE_REGEX, {
    message: RANGE_VALIDATION('Company Phone', 6, 15)
  })
  company_phone_number: string;

  @IsNotEmpty({ message: COMPANY_EMAIL_MANDATORY })
  @Length(1, 140, { message: FIELD_INVALID('Company email') })
  @IsEmail({}, { message: FIELD_INVALID('Company Email') })
  company_email: string;

  @ArrayNotEmpty({ message: BUSINESS_TYPE_MANDATORY })
  @IsArrayOfArraysValid(BUSINESS_TYPE_MANDATORY)
  business_type: string[];

  @ArrayNotEmpty({ message: INDUSTRY_TYPE_MANDATORY })
  @IsArrayOfArraysValid(INDUSTRY_TYPE_MANDATORY)
  industry_type: string[];

  @IsNotEmpty({ message: ORGANISATION_TYPE_MANDATORY })
  @IsString({ message: ORGANISATION_TYPE_MANDATORY })
  @IsNotOther()
  organisation_type: string;

  @IsNotEmpty({ message: BUSINESS_REGISTRATION_NUMBER_MANDATORY })
  @IsString({ message: FIELD_INVALID('Business Registration Number') })
  @Length(1, 140, {
    message: FIELD_INVALID('Business Registration Number')
  })
  business_registration_number: string;

  @IsString({ message: FIELD_INVALID('Subsidiary Company') })
  @IsOptional()
  subsidiary_company: string;

  @IsBoolean({
    message: MEMBER_BUSINESS_INVALID
  })
  @IsNotEmpty({
    message: MEMBER_CHECK_MANDATORY
  })
  is_member_of_business: boolean = false;

  @ValidateIf(object => object.is_member_of_business === true)
  @IsNotEmpty({ message: MEMBER_NAME_MANDATORY })
  @IsString({ message: MEMBER_NAME_INVALID })
  @Length(1, 140, { message: FIELD_INVALID('Member of Business Name') })
  @Matches(NAME_REGEX, {
    message: MEMBER_NAME_INVALID
  })
  member_of_business_name: string;

  @Length(1, 140, {
    message: FIELD_INVALID('Ultimate Beneficiary Name')
  })
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
    subsidiary_company: string,
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
    this.subsidiary_company = subsidiary_company;
    this.is_member_of_business = is_member_of_business;
    this.member_of_business_name = member_of_business_name;
    this.ultimate_beneficiary_name = ultimate_beneficiary_name;
  }
}

export class IndiaKycPostCompanyDetailsValidation extends KycPostCompanyDetailsValidation {
  @IsString({ message: FIELD_INVALID('City') })
  @IsNotEmpty({ message: CITY_MANDATORY })
  @Length(1, 140, { message: FIELD_INVALID('City Name') })
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

  @IsString({ message: FIELD_INVALID('Company PAN') })
  @IsNotEmpty({ message: COMPANY_PAN_NUMBER_MANDATORY })
  @IsAlphanumeric(undefined, { message: FIELD_INVALID('Company PAN') })
  @MinLength(10, { message: FIELD_INVALID('Company PAN') })
  @Matches(PAN_MATCH, {
    message: FIELD_INVALID('Company PAN')
  })
  company_pan_number: string;

  @Matches(GST_NUMBER_REGEX, {
    message: FIELD_INVALID('GST Number')
  })
  @IsString({ message: FIELD_INVALID('GST Number') })
  @IsNotEmpty({ message: GST_NUMBER_MANDATORY })
  @Length(1, 140, { message: FIELD_INVALID('GST Number') })
  gst_number: string;

  @IsBoolean({ message: MSME_REGISTERED_INVALID })
  is_msme_registered: boolean = false;

  @ValidateIf(object => object?.is_msme_registered === true)
  @IsString({
    message: MSME_TYPE_INVALID
  })
  @Length(1, 140, { message: FIELD_INVALID('MSME Type') })
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

  @IsNotEmpty({ message: ADDRESS_MANDATORY })
  address_line_1: string;

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
  @IsNotEmpty({ message: IS_ANTI_MONEY_LAUNDERING })
  is_anti_money_laundering: boolean;

  @ValidateIf(object => object?.is_anti_money_laundering === false)
  @IsString({
    message: 'Reason for No Anti-Money Laundering Policy is Required.'
  })
  @IsNotEmpty({
    message: 'Reason for No Anti-Money Laundering Policy is Required.'
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
    subsidiary_company: string,
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
      year_of_establishment,
      address_line_1,
      address_line_2,
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
    this.no_anti_money_laundering_policy_reason =
      no_anti_money_laundering_policy_reason;
  }
}
