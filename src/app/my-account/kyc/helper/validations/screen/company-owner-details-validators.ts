import { IsNotEmpty } from 'class-validator';

export class IndiaKycPostCompanyOwnerInformation {
  @IsNotEmpty()
  owner_full_name: string;

  @IsNotEmpty()
  owner_email: string;

  @IsNotEmpty()
  owner_country_code: string;

  @IsNotEmpty()
  owner_phone: string;

  @IsNotEmpty()
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
