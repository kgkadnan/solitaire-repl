// import logger from 'logging/log-util';
import {
  kycAttachmentIdentifier,
  kycScreenIdentifierNames,
  supportedCountries
} from '@/constants/enums/kyc';
import { validate } from 'class-validator';
import { PersonalDetails } from './personal-details-validators';
import {
  IndiaBankDetails,
  UsaBankDetails,
  BelgiumBankDetails
} from './bank-details-validators';
import {
  IndiaKycPostCompanyDetailsValidation,
  BelgiumKycPostCompanyDetailsValidation,
  UsaKycPostCompanyDetailsValidation
} from './company-details-validators';
import { IndiaKycPostCompanyOwnerInformation } from './company-owner-details-validators';
import {
  BelgiumAttachmentValidation,
  IndianAttachmentValidation,
  DubaiAttachmentValidation,
  UsaAttachmentValidation
} from './attachment-validators';
import { ManualAttachmentValidation } from './manual-attachment-validator';

export const validateScreen = async (
  formData: any,
  screenName: string,
  country: string
) => {
  let validationErrors;
  let kycForm = {};
  if (formData) {
    switch (screenName) {
      case kycScreenIdentifierNames.PERSONAL_DETAILS:
        kycForm = new PersonalDetails(
          formData.first_name,
          formData.last_name,
          formData.email,
          formData.country_code,
          formData.phone
        );

        break;
      case kycScreenIdentifierNames.COMPANY_DETAILS:
        switch (country) {
          case supportedCountries.INDIA:
            kycForm = new IndiaKycPostCompanyDetailsValidation(
              formData.company_name,
              formData.year_of_establishment,
              formData.address,
              formData.company_phone_number,
              formData.company_email,
              formData.business_type,
              formData.industry_type,
              formData.organisation_type,
              formData.business_registration_number,
              formData.subsidiary_company,
              formData.is_member_of_business,
              formData.member_of_business_name,
              formData.ultimate_beneficiary_name,
              formData.city,
              formData.state,
              formData.pincode,
              formData.company_pan_number,
              formData.gst_number,
              formData.is_msme_registered,
              formData.msme_type,
              formData.msme_registration_number
            );

            break;
          case supportedCountries.BELGIUM:
            kycForm = new BelgiumKycPostCompanyDetailsValidation(
              formData.company_name,
              formData.year_of_establishment,
              formData.address_line_1,
              formData.address_line_2,
              formData.company_phone_number,
              formData.company_email,
              formData.business_type,
              formData.industry_type,
              formData.organisation_type,
              formData.business_registration_number,
              formData.subsidiary_company,
              formData.is_member_of_business,
              formData.member_of_business_name,
              formData.ultimate_beneficiary_name,
              formData.vat_number,
              formData.fax_number, // Optional
              formData.ownership_percentage // Optional
            );

            break;
          case supportedCountries.USA:
            kycForm = new UsaKycPostCompanyDetailsValidation(
              formData.company_name,
              formData.year_of_establishment,
              formData.address_line_1,
              formData.address_line_2,
              formData.company_phone_number,
              formData.company_email,
              formData.business_type,
              formData.industry_type,
              formData.organisation_type,
              formData.business_registration_number,
              formData.subsidiary_company,
              formData.is_member_of_business,
              formData.member_of_business_name,
              formData.ultimate_beneficiary_name,
              formData.vat_number,
              formData.fax_number,
              formData.ownership_percentage,
              formData.federal_tax_id,
              formData.is_anti_money_laundering,
              formData.no_anti_money_laundering_policy_reason
            );

            break;

          default:
            console.log('something went wrong on KYC company details screen');
            break;
        }
        break;
      case kycScreenIdentifierNames.COMPANY_OWNER_DETAILS:
        if (country === supportedCountries.INDIA) {
          kycForm = new IndiaKycPostCompanyOwnerInformation(
            formData.owner_first_name,
            formData.owner_last_name,
            formData.owner_email,
            formData.owner_country_code,
            formData.owner_phone,
            formData.owner_pan_or_aadhaar_number
          );
        }
        break;
      case kycScreenIdentifierNames.BANKING_DETAILS:
        switch (country) {
          case supportedCountries.INDIA:
            kycForm = new IndiaBankDetails(
              formData.bank_name,
              formData.account_holder_name,
              formData.account_number,
              formData.bank_address, // Make sure this field exists in formData
              formData.ifsc_code
            );
            break;
          case supportedCountries.USA:
            kycForm = new UsaBankDetails(
              formData.bank_name,
              formData.account_holder_name,
              formData.account_number,
              formData.swift_code // Make sure this field exists in formData
            );
            break;
          case supportedCountries.BELGIUM:
            kycForm = new BelgiumBankDetails(
              formData.bank_name,
              formData.account_holder_name,
              formData.account_number,
              formData.swift_code // Make sure this field exists in formData
            );
            break;
          default:
            console.log('something went wrong on KYC banking details screen');
            break;
        }
        break;
      default:
        console.log('something went wrong on KYC screen');
        break;
    }
    validationErrors = await validate(kycForm!);
  } else {
    validationErrors = validationErrors || 'please fill all fields';
  }

  return validationErrors;
};

export const validateAttachment = async (
  formData: any = {},
  country: string
) => {
  let validationErrors;
  let attachments = {};
  if (formData) {
    switch (country) {
      case kycAttachmentIdentifier.INDIA:
        attachments = new IndianAttachmentValidation(
          formData?.pan_card,
          formData?.gst_certificate,
          formData?.incorporation_certificate,
          formData?.cancel_cheque,
          formData?.government_registration_certificate,
          formData?.business_card,
          formData?.company_owner_passport,
          formData?.person_to_contact_1,
          formData?.person_to_contact_2,
          formData?.person_to_contact_3,
          formData?.company_owner_pan_card,
          formData?.section_194q
        );
        break;
      case kycAttachmentIdentifier.BELGIUM:
        attachments = new BelgiumAttachmentValidation(
          formData?.registration_number,
          formData?.passport,
          formData?.id_copy
        );
        break;
      case kycAttachmentIdentifier.USA:
        attachments = new UsaAttachmentValidation(
          formData?.registration_number,
          formData?.passport,
          formData?.id_copy
        );
        break;
      case kycAttachmentIdentifier.OTHER:
        attachments = new DubaiAttachmentValidation(
          formData?.incumbency_certificate,
          formData?.trade_license,
          formData?.gst_certificate,
          formData?.owner_id_copy,
          formData?.manager_id_copy,
          formData?.moa
        );
        break;
    }

    validationErrors = await validate(attachments!);
  }
  return validationErrors;
};

export const validateManualAttachment = async (formData: any) => {
  let validationErrors;
  let attachments = {};
  if (formData) {
    attachments = new ManualAttachmentValidation(formData?.upload_form);

    validationErrors = await validate(attachments!);
  }
  return validationErrors;
};
