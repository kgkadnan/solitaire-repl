import { AccordionComponent } from '@/components/v2/common/accordion';
import React from 'react';
import { IFormState } from '../interface/interface';

export const Carat = ({ state, setState }: IFormState) => {
  return (
    <div id="Carat">
      <AccordionComponent
        value="Carat"
        isDisable={true}
        accordionContent={<div>hello</div>}
        accordionTrigger={'Carat'}
        hasError={false}
      />
    </div>
  );
};
