import {
  ACCOUNT_HOLDER_NAME_MANDATORY,
  ACCOUNT_NUMBER_MANDATORY,
  BANK_ADDRESS_INVALID,
  BANK_NAME_MANDATORY,
  IFSC_CODE_MANDATORY,
  SWIFT_CODE_MANDATORY
} from '@/constants/error-messages/kyc';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

class BaseBankDetails {
  @IsNotEmpty({ message: BANK_NAME_MANDATORY })
  bank_name: string;

  @IsNotEmpty({ message: ACCOUNT_HOLDER_NAME_MANDATORY })
  account_holder_name: string;

  @IsNotEmpty({ message: ACCOUNT_NUMBER_MANDATORY })
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
  @IsString({ message: BANK_ADDRESS_INVALID })
  @IsOptional()
  bank_address: string;

  @IsNotEmpty({ message: IFSC_CODE_MANDATORY })
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
  @IsNotEmpty({ message: SWIFT_CODE_MANDATORY })
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
