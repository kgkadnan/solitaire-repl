import { AccordionComponent } from '@/components/v2/common/accordion';
import React from 'react';
import { IFormState } from '../interface/interface';

export const PolishSymmetry = () => {
  return (
    <div id="Make Cut Polish Symmetry">
      <AccordionComponent
        value="Make Cut Polish Symmetry"
        isDisable={true}
        accordionContent={<>Hello</>}
        accordionTrigger={'Make Cut Polish Symmetry'}
        hasError={false}
      />
    </div>
  );
};
