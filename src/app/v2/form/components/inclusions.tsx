import { AccordionComponent } from '@/components/v2/common/accordion';
import React from 'react';
import { IFormState } from '../interface/interface';

export const Inclusions = ({ setState, state }: IFormState) => {
  return (
    <div id="Inclusions">
      <AccordionComponent
        value="Inclusions"
        isDisable={false}
        accordionContent={<>Hello</>}
        accordionTrigger={'Inclusions'}
        hasError={false}
      />
    </div>
  );
};
