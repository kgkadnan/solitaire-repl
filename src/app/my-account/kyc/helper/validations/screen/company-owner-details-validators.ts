import {
  FIELD_INVALID,
  OWNER_COUNTRY_CODE_MANDATORY,
  OWNER_EMAIL_MANDATORY,
  OWNER_FIRST_NAME_MANDATORY,
  OWNER_PAN_NUMBER_MANDATORY,
  OWNER_PHONE_MANDATORY
} from '@/constants/error-messages/kyc';
import { NAME_REGEX, PAN_MATCH } from '@/constants/validation-regex/regex';
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
    message: FIELD_INVALID('Owner Full Name')
  })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Owner Full Name')
  })
  owner_full_name: string;

  @Length(1, 140, { message: FIELD_INVALID('Email') })
  @IsEmail({}, { message: FIELD_INVALID('Email') })
  @IsNotEmpty({ message: OWNER_EMAIL_MANDATORY })
  owner_email: string;

  @IsNotEmpty({ message: OWNER_COUNTRY_CODE_MANDATORY })
  @Length(1, 4, { message: FIELD_INVALID('Owner Country Code') })
  owner_country_code: string;

  @IsNotEmpty({ message: OWNER_PHONE_MANDATORY })
  owner_phone: string;

  @Matches(PAN_MATCH, { message: FIELD_INVALID('PAN Number') })
  @IsNotEmpty({ message: OWNER_PAN_NUMBER_MANDATORY })
  @IsAlphanumeric(undefined, { message: FIELD_INVALID('PAN Number') })
  @MinLength(10, { message: FIELD_INVALID('PAN Number') })
  owner_pan_number: string;

  constructor(
    owner_full_name: string,
    owner_email: string,
    owner_country_code: string,
    owner_phone: string,
    owner_pan_number: string
  ) {
    this.owner_full_name = owner_full_name;
    this.owner_email = owner_email;
    this.owner_country_code = owner_country_code;
    this.owner_phone = owner_phone;
    this.owner_pan_number = owner_pan_number;
  }
}
