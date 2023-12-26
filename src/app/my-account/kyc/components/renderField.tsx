// renderField.js
import React, { useContext } from 'react';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { fieldType } from '@/constants/kyc';
import { FormContext } from '../hooks/form-context';

export const renderField = (field:any) => {
  const { formState, updateFormState, formErrors } = useContext(FormContext);

  switch (field.type) {
    case fieldType.FLOATING_INPUT:
      return (
        <FloatingLabelInput
          label={field.name}
          onChange={(e) => updateFormState(field.key, e.target.value)}
          type={field.inputType}
          name={field.name}
          value={formState[field.name]!}
          errorText={formErrors[field.key]!}
        />
      );
    case fieldType.CHECKBOX:
      // Handle checkbox rendering
      return null;
    default:
      return null;
  }
};
