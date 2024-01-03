import logger from 'logging/log-util';
import {
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

export const validateScreen = async (
  formData: any,
  screenName: string,
  country: string
) => {
  console.log(screenName,country,"ppppppp")
  console.log("formData",formData)

  let validationErrors;
  let kycForm;
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
              formData.vat_number,
              formData.fax_number, // Optional
              formData.ownership_percentage // Optional
            );

            break;
          case supportedCountries.USA:
            kycForm = new UsaKycPostCompanyDetailsValidation(
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
              formData.vat_number,
              formData.swift_code,
              formData.federal_tax_id,
              formData.is_anti_money_laundering,
              formData.anti_money_laundering_policy_name,
              formData.ownership_percentage // Added this missing argument
            );

            break;

          default:
            logger.error('something went wrong on KYC company details screen');
            break;
        }
        break;
      case kycScreenIdentifierNames.COMPANY_OWNER_DETAILS:
        if (country === supportedCountries.INDIA) {
          kycForm = new IndiaKycPostCompanyOwnerInformation(
            formData.owner_full_name,
            formData.owner_email,
            formData.owner_country_code,
            formData.owner_phone,
            formData.owner_pan_number
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
            logger.error('something went wrong on KYC banking details screen');
            break;
        }
        break;
      default:
        logger.error('something went wrong on KYC screen');
        break;
    }
    validationErrors = await validate(kycForm!);
    console.log(kycForm,"kycForm",validationErrors)
  } else {
    validationErrors = validationErrors || 'please all fields';
  }

  return validationErrors;
};
