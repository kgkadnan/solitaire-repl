import {
  IsString,
  IsNotEmpty,
  Matches,
  IsOptional,
  Length
} from 'class-validator';

class BaseBankDetails {
  @IsString({ message: 'Bank name must be a string' })
  @IsNotEmpty({ message: 'Bank name is required' })
  bank_name: string;

  @IsString({ message: 'Account holder name must be a string' })
  @IsNotEmpty({ message: 'Account holder name is required' })
  account_holder_name: string;

  @IsString({ message: 'Account number must be a string' })
  @IsNotEmpty({ message: 'Account number is required' })
  @Matches(/^[0-9a-zA-Z]+$/, {
    message: 'Account number must contain only alphanumeric characters'
  })
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

  @IsString({ message: 'IFSC code must be a string' })
  @IsNotEmpty({ message: 'IFSC code is required' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'IFSC code must contain only alphanumeric characters'
  })
  @Length(8, 11, {
    message: 'IFSC code must be between 8 and 11 characters long'
  })
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
  @IsString({ message: 'SWIFT code must be a string' })
  @IsNotEmpty({ message: 'SWIFT code is required' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'SWIFT code must contain only alphanumeric characters'
  })
  @Length(8, 11, {
    message: 'SWIFT code must be between 8 and 11 characters long'
  })
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
