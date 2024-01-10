import {
  COUNTRY_CODE_MANDATORY,
  EMAIL_MANDATORY,
  FIRST_NAME_MANDATORY,
  LAST_NAME_MANDATORY,
  PHONE_NUMBER_MANDATORY
} from '@/constants/error-messages/kyc';
import { IsNotEmpty } from 'class-validator';

export class PersonalDetails {
  @IsNotEmpty({ message: FIRST_NAME_MANDATORY })
  first_name: string;

  @IsNotEmpty({ message: LAST_NAME_MANDATORY })
  last_name: string;

  @IsNotEmpty({ message: EMAIL_MANDATORY })
  email: string;

  @IsNotEmpty({ message: COUNTRY_CODE_MANDATORY })
  country_code: string;

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
