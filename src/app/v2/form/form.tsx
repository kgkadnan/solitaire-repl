'use client';
import { AccordionComp } from '@/components/v2/common/accordion';
import React from 'react';

const Form = () => {
  return (
    <AccordionComp
      value="parameter"
      isDisable={false}
      accordionContent={<>Hello</>}
      accordionTrigger={'parameter'}
    />
  );
};

export default Form;
