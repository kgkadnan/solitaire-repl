import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

class BaseBankDetails {
  @IsNotEmpty({ message: 'Bank name is required' })
  bank_name: string;

  @IsNotEmpty({ message: 'Account holder name is required' })
  account_holder_name: string;

  @IsNotEmpty({ message: 'Account number is required' })
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
  @IsString({ message: 'Bank address must be a string' })
  @IsOptional()
  bank_address: string;

  @IsNotEmpty({ message: 'IFSC code is required' })
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
  @IsNotEmpty({ message: 'SWIFT code is required' })
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
