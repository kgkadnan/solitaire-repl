import { AccordionComponent } from '@/components/v2/common/accordion';
import React from 'react';
import { IFormState } from '../interface/interface';

export const Parameters = ({ state, setState }: IFormState) => {
  return (
    <div id="Parameters">
      <AccordionComponent
        value="Parameters"
        isDisable={false}
        accordionContent={<>Hello</>}
        accordionTrigger={'Parameters'}
        hasError={false}
      />
    </div>
  );
};
