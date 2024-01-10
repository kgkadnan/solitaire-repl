import { updateFormState } from '@/features/kyc/kyc';
import { validateKYCField } from './validations/field';
import { isEditingKYC } from '@/features/kyc/is-editing-kyc';
import {
  kycScreenIdentifierNames,
  supportedCountries
} from '@/constants/enums/kyc';

export const handleInputChange = async (
  path: string,
  value: string | string[],
  dispatch: any,
  screenName: string,
  key: string,
  formState?: any
) => {
  let errors = await validateKYCField(
    key,
    typeof value === 'string' ? value.trim() : value
  );

  dispatch(
    updateFormState({
      name: `formErrorState.online.sections.${[screenName]}.${[key]}`,
      value: Object.values(errors?.[0]?.constraints ?? {})[0] || ''
    })
  );
  dispatch(updateFormState({ name: path, value: value }));
  dispatch(isEditingKYC(true));
  if (
    formState.country === supportedCountries.INDIA &&
    screenName === kycScreenIdentifierNames.COMPANY_DETAILS &&
    ((key === 'organisation_type' && value === 'Individual') ||
      formState.online.sections.company_details.organisation_type ===
        'Individual')
  ) {
    dispatch(
      updateFormState({
        name: `formState.online.sections.company_owner_details.owner_pan_number`,
        value: formState?.online?.sections?.company_details?.company_pan_number
      })
    );
  }
};
