import {
  COUNTRY_CODE_MANDATORY,
  EMAIL_MANDATORY,
  FIELD_INVALID,
  FIRST_NAME_MANDATORY,
  LAST_NAME_MANDATORY,
  PHONE_NUMBER_MANDATORY,
  RANGE_VALIDATION
} from '@/constants/error-messages/kyc';
import { NAME_REGEX, PHONE_REG } from '@/constants/validation-regex/regex';
import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  MinLength
} from 'class-validator';

export class PersonalDetails {
  @IsNotEmpty({ message: FIRST_NAME_MANDATORY })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('First Name')
  })
  @Length(1, 140, { message: FIELD_INVALID('First Name') })
  first_name: string;

  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Last Name')
  })
  @Length(1, 140, { message: FIELD_INVALID('Last Name') })
  @IsNotEmpty({ message: LAST_NAME_MANDATORY })
  last_name: string;

  @IsNotEmpty({ message: EMAIL_MANDATORY })
  @Length(1, 140, { message: FIELD_INVALID('Email') })
  @IsEmail({}, { message: FIELD_INVALID('Email') })
  email: string;

  @IsNotEmpty({ message: COUNTRY_CODE_MANDATORY })
  @Length(1, 4, { message: FIELD_INVALID('Country Code') })
  country_code: string;
  @MinLength(3, { message: FIELD_INVALID('Phone') })
  @Matches(PHONE_REG, {
    message: RANGE_VALIDATION('Phone', 6, 15)
  })
  @IsNotEmpty({ message: PHONE_NUMBER_MANDATORY })
  phone: string;

  constructor(
    first_name: string,
    last_name: string,
    email: string,
    country_code: string,
    phone: string
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.country_code = country_code;
    this.phone = phone;
  }
}
