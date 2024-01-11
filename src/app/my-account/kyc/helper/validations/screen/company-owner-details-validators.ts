import {
  FIELD_INVALID,
  MAX_CHARACTER_LIMIT_EXCEEDED,
  OWNER_COUNTRY_CODE_MANDATORY,
  OWNER_EMAIL_MANDATORY,
  OWNER_FULL_NAME_MANDATORY,
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
  @IsNotEmpty({ message: OWNER_FULL_NAME_MANDATORY })
  @Length(1, 140, {
    message: MAX_CHARACTER_LIMIT_EXCEEDED('Owner Full Name', 140)
  })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Owner Full Name')
  })
  owner_full_name: string;
  @Length(1, 140, { message: MAX_CHARACTER_LIMIT_EXCEEDED('Email', 140) })
  @IsEmail({}, { message: FIELD_INVALID('Email') })
  @IsNotEmpty({ message: OWNER_EMAIL_MANDATORY })
  owner_email: string;

  @IsNotEmpty({ message: OWNER_COUNTRY_CODE_MANDATORY })
  owner_country_code: string;

  @IsNotEmpty({ message: OWNER_PHONE_MANDATORY })
  owner_phone: string;

  @Matches(PAN_MATCH, { message: FIELD_INVALID('PAN Number') })
  @IsNotEmpty({ message: OWNER_PAN_NUMBER_MANDATORY })
  @IsAlphanumeric(undefined, { message: OWNER_PAN_NUMBER_MANDATORY })
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
