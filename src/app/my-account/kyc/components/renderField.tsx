'use client';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { fieldType } from '@/constants/kyc';

export const renderField = ({
  name,
  type,
  handleChange,
  state,
  inputType
}: any) => {
  switch (type) {
    case fieldType.FLOATING_INPUT:
      return (
        <FloatingLabelInput
          label={name}
          onChange={handleChange}
          type={inputType}
          name={name}
          value={state}
        />
      );
    case fieldType.CHECKBOX:
      return null;
    default:
      return null;
  }
};
