import { updateFormState } from '@/features/kyc/kyc';
import { validateKYCField } from './validations/field';
import { isEditingKYC } from '@/features/kyc/is-editing-kyc';

export const handleInputChange = async (
  path: string,
  value: string | string[],
  dispatch: any,
  screenName: string,
  key: string
) => {
  let errors = await validateKYCField(key, value);

  dispatch(
    updateFormState({
      name: `formErrorState.online.sections.${[screenName]}.${[key]}`,
      value: Object.values(errors?.[0]?.constraints ?? {})[0] || ''
    })
  );
  dispatch(updateFormState({ name: path, value: value }));
  dispatch(isEditingKYC(true));
};
