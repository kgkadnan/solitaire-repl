import {
  FIELD_INVALID,
  OWNER_COUNTRY_CODE_MANDATORY,
  OWNER_EMAIL_MANDATORY,
  OWNER_FIRST_NAME_MANDATORY,
  OWNER_LAST_NAME_MANDATORY,
  OWNER_PAN_NUMBER_OR_ADHAAR_MANDATORY,
  OWNER_PHONE_MANDATORY,
  RANGE_VALIDATION
} from '@/constants/error-messages/kyc';
import { NAME_REGEX, PHONE_REGEX } from '@/constants/validation-regex/regex';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  MinLength
} from 'class-validator';

export class IndiaKycPostCompanyOwnerInformation {
  @IsNotEmpty({ message: OWNER_FIRST_NAME_MANDATORY })
  @Length(1, 140, {
    message: FIELD_INVALID('Owner First Name')
  })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Owner First Name')
  })
  owner_first_name: string;

  @IsNotEmpty({ message: OWNER_LAST_NAME_MANDATORY })
  @Length(1, 140, {
    message: FIELD_INVALID('Owner Last Name')
  })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Owner Last Name')
  })
  owner_last_name: string;

  @Length(1, 140, { message: FIELD_INVALID('Email') })
  @IsEmail({}, { message: FIELD_INVALID('Email') })
  @IsNotEmpty({ message: OWNER_EMAIL_MANDATORY })
  owner_email: string;

  @IsNotEmpty({ message: OWNER_COUNTRY_CODE_MANDATORY })
  @Length(1, 4, { message: FIELD_INVALID('Owner Country Code') })
  owner_country_code: string;

  @IsNotEmpty({ message: OWNER_PHONE_MANDATORY })
  @Matches(PHONE_REGEX, {
    message: RANGE_VALIDATION('Owner Phone', 6, 15)
  })
  owner_phone: string;

  @IsNotEmpty({ message: OWNER_PAN_NUMBER_OR_ADHAAR_MANDATORY })
  @IsAlphanumeric(undefined, { message: FIELD_INVALID('PAN Or Adhaar Number') })
  @MinLength(10, { message: FIELD_INVALID('PAN Or Adhaar Number') })
  owner_pan_or_aadhaar_number: string;

  constructor(
    owner_first_name: string,
    owner_last_name: string,
    owner_email: string,
    owner_country_code: string,
    owner_phone: string,
    owner_pan_or_aadhaar_number: string
  ) {
    this.owner_first_name = owner_first_name;
    this.owner_last_name = owner_last_name;
    this.owner_email = owner_email;
    this.owner_country_code = owner_country_code;
    this.owner_phone = owner_phone;
    this.owner_pan_or_aadhaar_number = owner_pan_or_aadhaar_number;
  }
}
