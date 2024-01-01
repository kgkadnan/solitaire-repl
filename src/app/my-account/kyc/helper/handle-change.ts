import { updateFormState } from '@/features/kyc/kyc';
import { kycIsCompleted } from '@/features/kyc/kyc-iscompleted-slice';

export const handleInputChange = async (
  name: any,
  value: any,
  dispatch: any,
  handleChange: any,
  screenName: string
) => {
  let errors = await handleChange(value);

  dispatch(
    updateFormState({
      name: `formErrorState.online.sections.${[screenName]}.${[
        errors?.[0]?.property
      ]}`,
      value: Object.values(errors?.[0]?.constraints ?? {})[0] || ''
    })
  );
  dispatch(updateFormState({ name: name, value: value }));

  dispatch(kycIsCompleted(true));
};
