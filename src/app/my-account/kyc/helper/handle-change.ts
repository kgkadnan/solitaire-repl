import { updateFormState } from '@/features/kyc/kyc';

export const handleInputChange = (name: any, value: any, dispatch: any) => {
  console.log('name', name);
  dispatch(updateFormState({ name: name, value: value }));
};
