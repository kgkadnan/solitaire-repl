import {
  ACCOUNT_HOLDER_NAME_MANDATORY,
  ACCOUNT_NUMBER_MANDATORY,
  BANK_ADDRESS_INVALID,
  BANK_NAME_MANDATORY,
  FIELD_INVALID,
  IFSC_CODE_MANDATORY,
  SWIFT_CODE_MANDATORY
} from '@/constants/error-messages/kyc';
import {
  ACCOUNT_NUMBER_REGEX,
  IFSC_REGEX,
  NAME_REGEX,
  SWIFT_CODE_REGEX
} from '@/constants/validation-regex/regex';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches
} from 'class-validator';

class BaseBankDetails {
  @IsNotEmpty({ message: BANK_NAME_MANDATORY })
  @Length(1, 140, { message: FIELD_INVALID('Bank Name') })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Bank Name')
  })
  @IsString({ message: FIELD_INVALID('Bank Name') })
  bank_name: string;

  @Length(1, 140, {
    message: FIELD_INVALID('Account Holder Name')
  })
  @Matches(NAME_REGEX, {
    message: FIELD_INVALID('Account Holder Name')
  })
  @IsString({ message: FIELD_INVALID('Account Holder Name') })
  @IsNotEmpty({ message: ACCOUNT_HOLDER_NAME_MANDATORY })
  account_holder_name: string;

  @Length(1, 15, {
    message: FIELD_INVALID('Account Number')
  })
  @IsString({ message: FIELD_INVALID('Account Number') })
  @Matches(ACCOUNT_NUMBER_REGEX, {
    message: FIELD_INVALID('Account Number')
  })
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
  @Length(0, 140, {
    message: FIELD_INVALID('Bank Address')
  })
  bank_address: string;

  @IsString({ message: FIELD_INVALID('IFSC code') })
  @IsNotEmpty({ message: IFSC_CODE_MANDATORY })
  @Matches(IFSC_REGEX, {
    message: FIELD_INVALID('IFSC code')
  })
  @Length(8, 11, {
    message: FIELD_INVALID('IFSC code')
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
  @IsString({ message: FIELD_INVALID('Swift code') })
  @IsNotEmpty({ message: SWIFT_CODE_MANDATORY })
  @Matches(SWIFT_CODE_REGEX, {
    message: FIELD_INVALID('Swift code')
  })
  // @Length(8, 11, {
  //   message: FIELD_INVALID('Swift code')
  // })
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
