'use client';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { fieldType } from '@/constants/kyc';
const handleInput = (e: any) => {
  console.log(e.target.value);
};
export const renderField = (field: any) => {
  switch (field.type) {
    case fieldType.FLOATING_INPUT:
      return (
        <FloatingLabelInput
          label={'test'}
          onChange={handleInput}
          type="number"
          name="number"
          value={'value'}
        />
      );
    case fieldType.CHECKBOX:
      return null;
    default:
      return null;
  }
};
