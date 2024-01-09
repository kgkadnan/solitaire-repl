import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

class BaseBankDetails {
  @IsNotEmpty({ message: 'Bank Name is Mandatory' })
  bank_name: string;

  @IsNotEmpty({ message: 'Account Holder Name is Mandatory' })
  account_holder_name: string;

  @IsNotEmpty({ message: 'Account Number is Mandatory' })
  account_number: string;

  constructor(
    bank_name: string,
    account_holder_name: string,
    account_number: string
  ) {
    this.bank_name = bank_name;
    this.account_holder_name = account_holder_name;
    this.account_number = account_number;
  }
}

export class IndiaBankDetails extends BaseBankDetails {
  @IsString({ message: 'Please enter a valid Bank Address' })
  @IsOptional()
  bank_address: string;

  @IsNotEmpty({ message: 'IFSC Code is Mandatory' })
  ifsc_code: string;

  constructor(
    bank_name: string,
    account_holder_name: string,
    account_number: string,
    bank_address: string,
    ifsc_code: string
  ) {
    super(bank_name, account_holder_name, account_number);
    this.bank_address = bank_address;
    this.ifsc_code = ifsc_code;
  }
}
export class UsaBankDetails extends BaseBankDetails {
  @IsNotEmpty({ message: 'SWIFT Code is Mandatory' })
  swift_code: string;

  constructor(
    bank_name: string,
    account_holder_name: string,
    account_number: string,
    swift_code: string
  ) {
    super(bank_name, account_holder_name, account_number);
    this.swift_code = swift_code;
  }
}
export class BelgiumBankDetails extends UsaBankDetails {
  constructor(
    bank_name: string,
    account_holder_name: string,
    account_number: string,
    swift_code: string
  ) {
    super(bank_name, account_holder_name, account_number, swift_code);
  }
}
