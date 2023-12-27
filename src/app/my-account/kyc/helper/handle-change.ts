import { updateFormState } from '@/features/kyc/kyc';

export const handleInputChange = (name: any, value: any, dispatch: any) => {
  dispatch(updateFormState({ name, value }));
};
