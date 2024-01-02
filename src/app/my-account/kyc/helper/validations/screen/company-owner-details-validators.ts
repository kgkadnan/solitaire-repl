import {
  MinLength,
  IsNotEmpty,
  IsEmail,
  IsMobilePhone,
  IsAlphanumeric
} from 'class-validator';

export class KycPostCompanyOwnerInformation {
  @MinLength(3)
  @IsNotEmpty()
  owner_full_name: string;

  @MinLength(3)
  @IsEmail()
  @IsNotEmpty()
  owner_email: string;

  @IsNotEmpty()
  owner_country_code: string;

  @MinLength(3, { message: 'Invalid phone!' })
  @IsMobilePhone()
  owner_phone: string;

  @MinLength(10)
  @IsAlphanumeric()
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

export class IndiaKycPostCompanyOwnerInformation extends KycPostCompanyOwnerInformation {
  constructor(
    owner_full_name: string,
    owner_email: string,
    owner_country_code: string,
    owner_phone: string,
    owner_pan_number: string
  ) {
    super(
      owner_full_name,
      owner_email,
      owner_country_code,
      owner_phone,
      owner_pan_number
    );
  }
}
