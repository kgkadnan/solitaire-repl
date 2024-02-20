import {
  CANCEL_CHAQUE,
  COMPANY_OWNER_PAN_CARD,
  GST_CERTIFICATE,
  ID_COPY,
  INCORPORATION_CERTIFICATE,
  INCUMBENCY_CERTIFICATE,
  MANAGER_ID_COPY,
  MOA,
  OWNER_ID_COPY,
  PAN_CARD,
  PASSPORT,
  REGISTRATION_NUMBER,
  SECTION_194Q,
  TRADE_LICENSE
} from '@/constants/error-messages/kyc';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class IndianAttachmentValidation {
  @IsNotEmpty({ message: PAN_CARD })
  pan_card: string;

  @IsNotEmpty({ message: GST_CERTIFICATE })
  gst_certificate: string;

  @IsNotEmpty({ message: INCORPORATION_CERTIFICATE })
  incorporation_certificate: string;

  @IsNotEmpty({ message: CANCEL_CHAQUE })
  cancel_cheque: string;

  @IsNotEmpty({ message: SECTION_194Q })
  section_194q: string;
  @IsOptional()
  government_registration_certificate: string;

  @IsOptional()
  business_card: string;

  @IsNotEmpty({ message: COMPANY_OWNER_PAN_CARD })
  company_owner_pan_card: string;

  @IsOptional()
  company_owner_passport: string;

  // @IsNotEmpty({ message: OWNER_COUNTRY_CODE_MANDATORY })
  @IsOptional()
  person_to_contact_1: string;
  // @IsNotEmpty({ message: OWNER_COUNTRY_CODE_MANDATORY })
  @IsOptional()
  person_to_contact_2: string;
  // @IsNotEmpty({ message: OWNER_COUNTRY_CODE_MANDATORY })
  @IsOptional()
  person_to_contact_3: string;

  constructor(
    pan_card: string,
    gst_certificate: string,
    incorporation_certificate: string,
    cancel_cheque: string,
    government_registration_certificate: string,
    business_card: string,
    company_owner_passport: string,
    person_to_contact_1: string,
    person_to_contact_2: string,
    person_to_contact_3: string,
    company_owner_pan_card: string,
    section_194q: string
  ) {
    this.pan_card = pan_card;
    this.gst_certificate = gst_certificate;
    this.incorporation_certificate = incorporation_certificate;
    this.cancel_cheque = cancel_cheque;
    this.section_194q = section_194q;
    this.government_registration_certificate =
      government_registration_certificate;
    this.business_card = business_card;
    this.company_owner_passport = company_owner_passport;
    this.person_to_contact_1 = person_to_contact_1;
    this.person_to_contact_2 = person_to_contact_2;
    this.person_to_contact_3 = person_to_contact_3;
    this.company_owner_pan_card = company_owner_pan_card;
  }
}

export class BelgiumAttachmentValidation {
  @IsNotEmpty({ message: REGISTRATION_NUMBER })
  registration_number: string;

  @IsNotEmpty({ message: PASSPORT })
  passport: string;

  @IsNotEmpty({ message: ID_COPY })
  id_copy: string;

  constructor(registration_number: string, passport: string, id_copy: string) {
    this.registration_number = registration_number;
    this.passport = passport;
    this.id_copy = id_copy;
  }
}

export class UsaAttachmentValidation {
  @IsNotEmpty({ message: REGISTRATION_NUMBER })
  registration_number: string;

  @IsNotEmpty({ message: PASSPORT })
  passport: string;

  @IsNotEmpty({ message: ID_COPY })
  id_copy: string;

  constructor(registration_number: string, passport: string, id_copy: string) {
    this.registration_number = registration_number;
    this.passport = passport;
    this.id_copy = id_copy;
  }
}
export class OtherAttachmentValidation {
  @IsNotEmpty({ message: INCUMBENCY_CERTIFICATE })
  incumbency_certificate: string;

  @IsNotEmpty({ message: TRADE_LICENSE })
  trade_license: string;

  @IsNotEmpty({ message: GST_CERTIFICATE })
  gst_certificate: string;

  @IsNotEmpty({ message: MOA })
  moa: string;

  @IsNotEmpty({ message: OWNER_ID_COPY })
  owner_id_copy: string;

  @IsNotEmpty({ message: MANAGER_ID_COPY })
  manager_id_copy: string;

  constructor(
    incumbency_certificate: string,
    trade_license: string,
    gst_certificate: string,
    owner_id_copy: string,
    manager_id_copy: string,
    moa: string
  ) {
    this.incumbency_certificate = incumbency_certificate;
    this.trade_license = trade_license;
    this.gst_certificate = gst_certificate;
    this.owner_id_copy = owner_id_copy;
    this.manager_id_copy = manager_id_copy;
    this.moa = moa;
  }
}
