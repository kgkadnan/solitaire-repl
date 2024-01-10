import {
  OWNER_COUNTRY_CODE_MANDATORY,
  OWNER_EMAIL_MANDATORY,
  OWNER_FULL_NAME_MANDATORY,
  OWNER_PAN_NUMBER_MANDATORY,
  OWNER_PHONE_MANDATORY
} from '@/constants/error-messages/kyc';
import { IsNotEmpty } from 'class-validator';

export class IndiaKycPostCompanyOwnerInformation {
  @IsNotEmpty({ message: OWNER_FULL_NAME_MANDATORY })
  owner_full_name: string;

  @IsNotEmpty({ message: OWNER_EMAIL_MANDATORY })
  owner_email: string;

  @IsNotEmpty({ message: OWNER_COUNTRY_CODE_MANDATORY })
  owner_country_code: string;

  @IsNotEmpty({ message: OWNER_PHONE_MANDATORY })
  owner_phone: string;

  @IsNotEmpty({ message: OWNER_PAN_NUMBER_MANDATORY })
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
